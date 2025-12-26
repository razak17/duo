import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import {
  type Challenge,
  type ChallengeOption,
  Challenges,
} from '@/lib/db/schema/challenges'
import type { UserSubscription } from '@/lib/db/schema/users'

import { LessonChallenge } from './lesson-challenge'
import { LessonHeader } from './lesson-header'
import { QuestionBubble } from './question-bubble'
import { DEFAULT_CHALLENGE_TITLE, QuizStatuses } from '../constants'
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
  const queryClient = useQueryClient()

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

  const title =
    challenge.type === Challenges.Assist
      ? DEFAULT_CHALLENGE_TITLE
      : challenge.question

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
                disabled={false}
                type={challenge.type}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
