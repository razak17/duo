import { useUser } from '@clerk/tanstack-react-start'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useAudio } from 'react-use'
import { toast } from 'sonner'

import {
  type Challenge,
  type ChallengeOption,
  Challenges,
} from '@/lib/db/schema/challenges'
import type { UserSubscription } from '@/lib/db/schema/users'

import { LessonChallenge } from './lesson-challenge'
import { LessonFooter } from './lesson-footer'
import { LessonHeader } from './lesson-header'
import { QuestionBubble } from './question-bubble'
import { getLessonPercentageQueryOptions } from '@/features/learn/server/queries'
import {
  getCourseProgressQueryOptions,
  getUserProgressQueryOptions,
} from '@/features/shared/server/queries'
import { DEFAULT_CHALLENGE_TITLE, QuizStatuses } from '../constants'
import { reduceHeartsFn, upsertChallengeProgressFn } from '../server/fn'
import type { QuizStatus } from '../types'

type QuizProps = {
  initialPercentage: number
  initialHearts: number
  initialLessonId: number
  initialLessonChallenges: Array<
    Challenge & {
      completed: boolean
      challengeOptions: ChallengeOption[]
    }
  >
  userSubscription: (UserSubscription & { isActive: boolean }) | null
}

export function Quiz({
  initialPercentage,
  initialHearts,
  initialLessonId,
  initialLessonChallenges,
  userSubscription,
}: QuizProps) {
  const { isLoaded, user } = useUser()
  const queryClient = useQueryClient()

  const [finishAudio] = useAudio({ src: '/finish.mp3', autoPlay: true })
  const [correctAudio, _c, correctControls] = useAudio({ src: '/correct.wav' })
  const [incorrectAudio, _i, incorrectControls] = useAudio({
    src: '/incorrect.wav',
  })

  const [lessonId] = useState(initialLessonId)
  const [hearts, setHearts] = useState(initialHearts)
  const [percentage, setPercentage] = useState(() => {
    return initialPercentage === 100 ? 0 : initialPercentage
  })
  const [challenges] = useState(initialLessonChallenges)
  const [activeIndex, setActiveIndex] = useState(() => {
    const uncompletedIndex = challenges.findIndex(
      (challenge) => !challenge.completed,
    )
    return uncompletedIndex === -1 ? 0 : uncompletedIndex
  })

  const [selectedOption, setSelectedOption] = useState<number>()
  const [status, setStatus] = useState<QuizStatus>(QuizStatuses.None)

  const challenge = challenges[activeIndex]
  const options = challenge?.challengeOptions ?? []

  const onNext = () => {
    setActiveIndex((current) => current + 1)
  }

  const onSelect = (id: number) => {
    if (status !== QuizStatuses.None) {
      return
    }
    setSelectedOption(id)
  }

  const {
    mutate: challengeProgressMutation,
    isPending: challengeProgressPending,
  } = useMutation({
    mutationFn: (
      data: Parameters<typeof upsertChallengeProgressFn>[0]['data'],
    ) => upsertChallengeProgressFn({ data }),
    onSuccess: async (data) => {
      if (data?.error === 'hearts') {
        // TODO: Handle no hearts case (Open modal to buy hearts)
        return
      }

      // TODO: Maybe invalidate quests, lesson id and leaderboard stuff
      await Promise.all([
        queryClient.invalidateQueries(
          getLessonPercentageQueryOptions(user?.id),
        ),
        queryClient.invalidateQueries(getUserProgressQueryOptions(user?.id)),
        queryClient.invalidateQueries(getCourseProgressQueryOptions(user?.id)),
      ])

      correctControls.play()
      setStatus('correct')
      setPercentage((prev) => prev + 100 / challenges.length)

      // This is a practice
      if (initialPercentage === 100) {
        setHearts((prev) => Math.min(prev + 1, 5))
      }
    },
    onError: () => {
      toast.error('Failed to process your answer')
    },
  })

  const { mutate: reduceHeartsMutation, isPending: reduceHeartsPending } =
    useMutation({
      mutationFn: (data: Parameters<typeof reduceHeartsFn>[0]['data']) =>
        reduceHeartsFn({ data }),
      onSuccess: async (data) => {
        if (data?.error === 'hearts') {
          // TODO: Handle no hearts case (Open modal to buy hearts)
          return
        }

        // TODO: Maybe invalidate quests, shop, lesson id and leaderboard stuff
        await Promise.all([
          queryClient.invalidateQueries(
            getLessonPercentageQueryOptions(user?.id),
          ),
          queryClient.invalidateQueries(getUserProgressQueryOptions(user?.id)),
          queryClient.invalidateQueries(
            getCourseProgressQueryOptions(user?.id),
          ),
        ])

        incorrectControls.play()
        setStatus('wrong')

        if (!data?.error) {
          setHearts((prev) => Math.max(prev - 1, 0))
        }
      },
      onError: () => {
        toast.error('Failed to reduce hearts')
      },
    })

  const onContinue = () => {
    if (!selectedOption) return

    if (status === QuizStatuses.Wrong) {
      setStatus(QuizStatuses.None)
      setSelectedOption(undefined)
      return
    }

    if (status === QuizStatuses.Correct) {
      onNext()
      setStatus(QuizStatuses.None)
      setSelectedOption(undefined)
      return
    }

    const correctOption = options.find((option) => option.correct)

    if (!correctOption) {
      return
    }

    if (correctOption.id === selectedOption) {
      challengeProgressMutation({ challengeId: challenge.id })
    } else {
      reduceHeartsMutation({ challengeId: challenge.id })
    }
  }

  const title =
    challenge.type === Challenges.Assist
      ? DEFAULT_CHALLENGE_TITLE
      : challenge.question

  return (
    <>
      {incorrectAudio}
      {correctAudio}
      <LessonHeader
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscription={!!userSubscription?.isActive}
      />
      <div className="flex-1">
        <div className="flex h-full items-center justify-center">
          <div className="flex w-full flex-col gap-y-12 px-6 lg:min-h-[350px] lg:w-[600px] lg:px-0">
            <h1 className="text-center font-bold text-lg text-neutral-700 lg:text-start lg:text-3xl">
              {title}
            </h1>
            <div>
              {challenge.type === Challenges.Assist && (
                <QuestionBubble question={challenge.question} />
              )}
              <LessonChallenge
                options={options}
                onSelect={onSelect}
                status={status}
                selectedOption={selectedOption}
                disabled={challengeProgressPending || reduceHeartsPending}
                type={challenge.type}
              />
            </div>
          </div>
        </div>
      </div>
      <LessonFooter
        disabled={
          challengeProgressPending ||
          reduceHeartsPending ||
          !isLoaded ||
          !selectedOption
        }
        status={status}
        onCheck={onContinue}
      />
    </>
  )
}
