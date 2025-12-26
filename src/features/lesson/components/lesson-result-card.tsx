import { cn } from '@/lib/utils'

type LessonResultProps = {
  value: number
  variant: 'points' | 'hearts'
}

export function LessonResultCard({ value, variant }: LessonResultProps) {
  const imageSrc = variant === 'hearts' ? '/heart.svg' : '/points.svg'

  return (
    <div
      className={cn(
        'w-full rounded-2xl border-2',
        variant === 'points' && 'border-orange-400 bg-orange-400',
        variant === 'hearts' && 'border-rose-500 bg-rose-500',
      )}
    >
      <div
        className={cn(
          'rounded-t-xl p-1.5 text-center font-bold text-white text-xs uppercase',
          variant === 'hearts' && 'bg-rose-500',
          variant === 'points' && 'bg-orange-400',
        )}
      >
        {variant === 'hearts' ? 'Hearts Left' : 'Total XP'}
      </div>
      <div
        className={cn(
          'flex items-center justify-center rounded-2xl bg-white p-6 font-bold text-lg',
          variant === 'hearts' && 'text-rose-500',
          variant === 'points' && 'text-orange-400',
        )}
      >
        <img
          alt="Icon"
          src={imageSrc}
          height={30}
          width={30}
          className="mr-1.5"
        />
        {value}
      </div>
    </div>
  )
}
