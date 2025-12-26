import { useUser } from '@clerk/tanstack-react-start'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { toast } from 'sonner'

import {
  type Challenge,
  type ChallengeOption,
  Challenges,
} from '@/lib/db/schema/challenges'
import type { UserSubscription } from '@/lib/db/schema/users'

import { FinishedLesson } from './finished-lesson'
import { LessonChallenge } from './lesson-challenge'
import { LessonFooter } from './lesson-footer'
import { LessonHeader } from './lesson-header'
import { QuestionBubble } from './question-bubble'
import { getLessonPercentageQueryOptions } from '@/features/learn/server/queries'
import {
  getCourseProgressQueryOptions,
  getUserProgressQueryOptions,
} from '@/features/shared/server/queries'
import { useHeartsModal } from '@/store/use-hearts-modal'
import { usePracticeModal } from '@/store/use-practice-modal'
import { DEFAULT_CHALLENGE_TITLE, MAX_HEARTS, QuizStatuses } from '../constants'
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

  const { open: openHeartsModal } = useHeartsModal()
  const { open: openPracticeModal } = usePracticeModal()

  const correctAudioRef = useRef<HTMLAudioElement | null>(null)
  const incorrectAudioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    correctAudioRef.current = new Audio('/correct.wav')
    incorrectAudioRef.current = new Audio('/incorrect.wav')

    if (initialPercentage === 100) {
      openPracticeModal()
    }

    return () => {
      correctAudioRef.current = null
      incorrectAudioRef.current = null
    }
  }, [initialPercentage, openPracticeModal])

  const [hearts, setHearts] = useState(initialHearts)
  const [percentage, setPercentage] = useState(() => {
    return initialPercentage === 100 ? 0 : initialPercentage
  })
  const [activeIndex, setActiveIndex] = useState(() => {
    const uncompletedIndex = initialLessonChallenges.findIndex(
      (challenge) => !challenge.completed,
    )
    return uncompletedIndex === -1 ? 0 : uncompletedIndex
  })

  const [selectedOption, setSelectedOption] = useState<number>()
  const [status, setStatus] = useState<QuizStatus>(QuizStatuses.None)

  const challenge = initialLessonChallenges[activeIndex]
  const options = challenge?.challengeOptions ?? []

  const onSelect = useCallback(
    (id: number) => {
      if (status !== QuizStatuses.None) {
        return
      }
      setSelectedOption(id)
    },
    [status],
  )

  const invalidateQueries = useCallback(async () => {
    await Promise.all([
      queryClient.invalidateQueries(getLessonPercentageQueryOptions(user?.id)),
      queryClient.invalidateQueries(getUserProgressQueryOptions(user?.id)),
      queryClient.invalidateQueries(getCourseProgressQueryOptions(user?.id)),
    ])
  }, [queryClient, user?.id])

  const {
    mutate: challengeProgressMutation,
    isPending: challengeProgressPending,
  } = useMutation({
    mutationFn: (
      data: Parameters<typeof upsertChallengeProgressFn>[0]['data'],
    ) => upsertChallengeProgressFn({ data }),
    onSuccess: async (data) => {
      if (data?.error === 'hearts') {
        openHeartsModal()
        return
      }

      await invalidateQueries()

      correctAudioRef.current?.play()
      setStatus('correct')
      setPercentage((prev) => prev + 100 / initialLessonChallenges.length)

      // This is a practice
      if (initialPercentage === 100) {
        setHearts((prev) => Math.min(prev + 1, MAX_HEARTS))
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
          openHeartsModal()
          return
        }

        await invalidateQueries()

        incorrectAudioRef.current?.play()
        setStatus('wrong')

        if (!data?.error) {
          setHearts((prev) => Math.max(prev - 1, 0))
        }
      },
      onError: () => {
        toast.error('Failed to reduce hearts')
      },
    })

  const onContinue = useCallback(() => {
    if (!selectedOption) {
      return
    }

    if (status === QuizStatuses.Wrong) {
      setStatus(QuizStatuses.None)
      setSelectedOption(undefined)
      return
    }

    if (status === QuizStatuses.Correct) {
      setActiveIndex((current) => current + 1)
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
  }, [
    selectedOption,
    status,
    options,
    challenge?.id,
    challengeProgressMutation,
    reduceHeartsMutation,
  ])

  const title = useMemo(
    () =>
      challenge?.type === Challenges.Assist
        ? DEFAULT_CHALLENGE_TITLE
        : challenge?.question,
    [challenge?.type, challenge?.question],
  )

  if (!challenge) {
    return (
      <FinishedLesson
        lessonId={initialLessonId}
        challengeCount={initialLessonChallenges.length}
        hearts={hearts}
      />
    )
  }

  return (
    <>
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
