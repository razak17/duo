import { useState } from 'react'

import type { Challenge, ChallengeOption } from '@/lib/db/schema/challenges'
import type { UserSubscription } from '@/lib/db/schema/users'

import { LessonHeader } from './lesson-header'

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
  const [hearts, setHearts] = useState(initialHearts)
  const [percentage, setPercentage] = useState(() => {
    return initialPercentage === 100 ? 0 : initialPercentage
  })

  return (
    <>
      <LessonHeader
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscription={!!userSubscription?.isActive}
      />
    </>
  )
}
