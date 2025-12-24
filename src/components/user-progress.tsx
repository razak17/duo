import { Link } from '@tanstack/react-router'
import { InfinityIcon } from 'lucide-react'

import type { Course } from '@/lib/db/schema/courses'

import { Button } from '@/components/ui/button'

type UserProgressProps = {
  activeCourse: Course
  hearts?: number
  points?: number
  hasActiveSubscription?: boolean
}

export function UserProgress({
  activeCourse,
  points = 0,
  hearts = 0,
  hasActiveSubscription = false,
}: UserProgressProps) {
  return (
    <div className="flex w-full items-center justify-between gap-x-2">
      <Link to="/courses">
        <Button variant="ghost">
          <img
            src={activeCourse.imageSrc}
            alt={activeCourse.title}
            className="rounded-md border"
            width={32}
            height={32}
          />
        </Button>
      </Link>
      <Link to="/shop">
        <Button variant="ghost" className="text-orange-500">
          <img
            src="/points.svg"
            height={28}
            width={28}
            alt="Points"
            className="mr-2"
          />
          {points}
        </Button>
      </Link>
      <Link to="/shop">
        <Button variant="ghost" className="text-rose-500">
          <img
            src="/heart.svg"
            height={22}
            width={22}
            alt="Hearts"
            className="mr-2"
          />
          {hasActiveSubscription ? (
            <InfinityIcon className="h-4 w-4 stroke-[3]" />
          ) : (
            hearts
          )}
        </Button>
      </Link>
    </div>
  )
}
