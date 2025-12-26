import { useNavigate } from '@tanstack/react-router'
import { useCallback, useEffect, useRef } from 'react'
import Confetti from 'react-confetti'

import { LessonFooter } from './lesson-footer'
import { LessonResultCard } from './lesson-result-card'
import { POINTS_PER_CHALLENGE } from '../constants'

type FinishedLessonProps = {
  lessonId: number
  challengeCount: number
  hearts: number
}

export function FinishedLesson({
  lessonId,
  challengeCount,
  hearts,
}: FinishedLessonProps) {
  const navigate = useNavigate()

  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    audioRef.current = new Audio('/finish.mp3')
    audioRef.current.play().catch(() => {})

    return () => {
      audioRef.current?.pause()
      audioRef.current = null
    }
  }, [])

  const onCheck = useCallback(() => {
    navigate({ to: '/learn' })
  }, [navigate])

  const points = challengeCount * POINTS_PER_CHALLENGE

  return (
    <>
      <Confetti recycle={false} numberOfPieces={500} tweenDuration={10000} />
      <div className="mx-auto flex h-full max-w-lg flex-col items-center justify-center gap-y-4 text-center lg:gap-y-8">
        <img
          src="/finish.svg"
          alt="Finish"
          className="h-[50px] w-[50px] lg:h-[100px] lg:w-[100px]"
        />
        <h1 className="font-bold text-neutral-700 text-xl lg:text-3xl">
          Great job! <br /> You&apos;ve completed the lesson.
        </h1>
        <div className="flex w-full items-center gap-x-4">
          <LessonResultCard variant="points" value={points} />
          <LessonResultCard variant="hearts" value={hearts} />
        </div>
      </div>
      <LessonFooter lessonId={lessonId} status="completed" onCheck={onCheck} />
    </>
  )
}
