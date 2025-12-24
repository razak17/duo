import type { Lesson } from '@/lib/db/schema/lessons'
import type { Unit } from '@/lib/db/schema/units'

import { LessonButton } from './lesson-button'
import { UnitBanner } from './unit-banner'

type LessonUnitProps = {
  id: number
  order: number
  title: string
  description: string
  lessons: (Lesson & {
    completed: boolean
  })[]
  activeLesson:
    | (Lesson & {
        unit: Unit
      })
    | undefined
  activeLessonPercentage: number
}

export function LessonUnit({
  title,
  description,
  lessons,
  activeLesson,
  activeLessonPercentage,
}: LessonUnitProps) {
  return (
    <>
      <UnitBanner title={title} description={description} />
      <div className="relative flex flex-col items-center">
        {lessons.map((lesson, index) => {
          const isCurrent = lesson.id === activeLesson?.id
          const isLocked = !lesson.completed && !isCurrent

          return (
            <LessonButton
              key={lesson.id}
              id={lesson.id}
              index={index}
              totalCount={lessons.length - 1}
              current={isCurrent}
              locked={isLocked}
              percentage={activeLessonPercentage}
            />
          )
        })}
      </div>
    </>
  )
}
