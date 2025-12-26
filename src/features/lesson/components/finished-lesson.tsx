import { useNavigate } from '@tanstack/react-router'
import Confetti from 'react-confetti'
import { useAudio, useWindowSize } from 'react-use'

import type { Challenge, ChallengeOption } from '@/lib/db/schema/challenges'

import { LessonFooter } from './lesson-footer'
import { LessonResultCard } from './lesson-result-card'

type FinishedLessonProps = {
  lessonId: number
  challenges: Array<
    Challenge & {
      completed: boolean
      challengeOptions: ChallengeOption[]
    }
  >
  hearts: number
}

export function FinishedLesson({
  lessonId,
  challenges,
  hearts,
}: FinishedLessonProps) {
  const { width, height } = useWindowSize()

  const navigate = useNavigate()

  const [finishAudio] = useAudio({ src: '/finish.mp3', autoPlay: true })
  return (
    <>
      {finishAudio}
      <Confetti
        width={width}
        height={height}
        recycle={false}
        numberOfPieces={500}
        tweenDuration={10000}
      />
      <div className="mx-auto flex h-full max-w-lg flex-col items-center justify-center gap-y-4 text-center lg:gap-y-8">
        <img
          src="/finish.svg"
          alt="Finish"
          className="hidden lg:block"
          height={100}
          width={100}
        />
        <img
          src="/finish.svg"
          alt="Finish"
          className="block lg:hidden"
          height={50}
          width={50}
        />
        <h1 className="font-bold text-neutral-700 text-xl lg:text-3xl">
          Great job! <br /> You&apos;ve completed the lesson.
        </h1>
        <div className="flex w-full items-center gap-x-4">
          <LessonResultCard variant="points" value={challenges.length * 10} />
          <LessonResultCard variant="hearts" value={hearts} />
        </div>
      </div>
      <LessonFooter
        lessonId={lessonId}
        status="completed"
        onCheck={() => navigate({ to: '/learn' })}
      />
    </>
  )
}
