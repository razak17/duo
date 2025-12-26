import {
  type Challenge,
  type ChallengeOption,
  Challenges,
} from '@/lib/db/schema/challenges'
import { cn } from '@/lib/utils'

import { ChallengeCard } from './challenge-card'
import type { QuizStatus } from '../types'

type LessonChallengeProps = {
  options: ChallengeOption[]
  onSelect: (id: number) => void
  status: QuizStatus
  selectedOption?: number
  disabled?: boolean
  type: Challenge['type']
}

export function LessonChallenge({
  options,
  onSelect,
  status,
  selectedOption,
  disabled,
  type,
}: LessonChallengeProps) {
  return (
    <div
      className={cn(
        'grid gap-2',
        type === Challenges.Assist && 'grid-cols-1',
        type === Challenges.Select &&
          'grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]',
      )}
    >
      {options.map((option, i) => (
        <ChallengeCard
          key={option.id}
          text={option.text}
          imageSrc={option.imageSrc}
          shortcut={`${i + 1}`}
          selected={selectedOption === option.id}
          onClick={() => onSelect(option.id)}
          status={status}
          audioSrc={option.audioSrc}
          disabled={disabled}
          type={type}
        />
      ))}
    </div>
  )
}
