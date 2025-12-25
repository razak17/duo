import type { Challenge, ChallengeOption } from '@/lib/db/schema/challenges'
import type { UserSubscription } from '@/lib/db/schema/users'

type QuizProps = {
  initialPercentage: number
  initialHearts: number
  initialLessonId: number
  initialLessonChallenges: Array<Challenge & {
    completed: boolean
    challengeOptions: ChallengeOption[]
  }>
  userSubscription: (UserSubscription & { isActive: boolean }) | null
}

export function Quiz({
  initialPercentage,
  // initialHearts,
  // initialLessonId,
  // initialLessonChallenges,
  // userSubscription,
}: QuizProps) {
  return (
    <div>
      <h1>Quiz Component</h1>
      <p>{initialPercentage}</p>
    </div>
  )
}
