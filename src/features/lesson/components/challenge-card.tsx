import { memo, useCallback, useEffect, useRef } from 'react'

import { type Challenge, Challenges } from '@/lib/db/schema/challenges'
import { cn } from '@/lib/utils'

import { Card } from '@/components/ui/card'
import { QuizStatuses } from '../constants'
import type { QuizStatus } from '../types'

type ChallengeCardProps = {
  imageSrc: string | null
  audioSrc: string | null
  text: string
  shortcut: string
  selected?: boolean
  onClick: () => void
  disabled?: boolean
  status?: QuizStatus
  type: Challenge['type']
}

export const ChallengeCard = memo(function ChallengeCard({
  imageSrc,
  audioSrc,
  text,
  shortcut,
  selected,
  onClick,
  status,
  disabled,
  type,
}: ChallengeCardProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (audioSrc) {
      audioRef.current = new Audio(audioSrc)
    }
    return () => {
      audioRef.current?.pause()
      audioRef.current = null
    }
  }, [audioSrc])

  const handleClick = useCallback(() => {
    if (disabled) {
      return
    }
    audioRef.current?.play().catch(() => {})
    onClick()
  }, [disabled, onClick])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === shortcut) {
        handleClick()
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [shortcut, handleClick])

  const isCorrect = selected && status === QuizStatuses.Correct
  const isWrong = selected && status === QuizStatuses.Wrong

  return (
    <Card
      onClick={handleClick}
      className={cn(
        'h-full cursor-pointer gap-0 border-2 border-b-4 p-4 py-4 shadow-none hover:bg-black/5 active:border-b-2 lg:p-6',
        selected && 'border-sky-300 bg-sky-100 hover:bg-sky-100',
        isCorrect && 'border-green-300 bg-green-100 hover:bg-green-100',
        isWrong && 'border-rose-300 bg-rose-100 hover:bg-rose-100',
        disabled && 'pointer-events-none hover:bg-white',
        type === Challenges.Assist && 'w-full lg:p-3',
      )}
    >
      {imageSrc && (
        <div className="relative mb-4 aspect-square max-h-[80px] w-full lg:max-h-[150px]">
          <img
            src={imageSrc}
            alt={text}
            className="h-full w-full object-contain"
          />
        </div>
      )}
      <div
        className={cn(
          'flex items-center justify-between',
          type === Challenges.Assist && 'flex-row-reverse',
        )}
      >
        {type === Challenges.Assist && <div />}
        <p
          className={cn(
            'text-neutral-600 text-sm lg:text-base',
            selected && 'text-sky-500',
            isCorrect && 'text-green-500',
            isWrong && 'text-rose-500',
          )}
        >
          {text}
        </p>
        <div
          className={cn(
            'flex h-[20px] w-[20px] items-center justify-center rounded-lg border-2 font-semibold text-neutral-400 text-xs lg:h-[30px] lg:w-[30px] lg:text-[15px]',
            selected && 'border-sky-300 text-sky-500',
            isCorrect && 'border-green-500 text-green-500',
            isWrong && 'border-rose-500 text-rose-500',
          )}
        >
          {shortcut}
        </div>
      </div>
    </Card>
  )
})
