'use client'

import { useNavigate } from '@tanstack/react-router'
import { useTransition } from 'react'

import type { Course } from '@/lib/db/schema/courses'
import type { ActiveCourseId } from '@/lib/db/schema/users'

import { CourseCard } from './course-card'

type CourseListProps = {
  courses: Course[]
  activeCourseId?: ActiveCourseId
}

export const CourseList = ({ courses, activeCourseId }: CourseListProps) => {
  const navigate = useNavigate()
  const [pending, startTransition] = useTransition()

  const onClick = (id: number) => {
    if (pending) return

    if (id === activeCourseId) {
      return navigate({
        to: '/learn',
      })
    }

    startTransition(() => {})
  }

  return (
    <div className="grid grid-cols-2 gap-4 pt-6 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))]">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          id={course.id}
          title={course.title}
          imageUrl={course.imageSrc}
          onClick={onClick}
          disabled={pending}
          active={course.id === activeCourseId}
        />
      ))}
    </div>
  )
}
