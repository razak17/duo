'use client'

import { useUser } from '@clerk/tanstack-react-start'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'

import type { Course } from '@/lib/db/schema/courses'
import type { ActiveCourseId } from '@/lib/db/schema/users'

import { CourseCard } from './course-card'
import { getUserSubscriptionQueryOptions } from '@/features/learn/server/queries'
import { upsertUserProgressFn } from '../server/fn'
import {
  getCoursesQueryOptions,
  getUserProgressQueryOptions,
} from '../server/queries'

type CourseListProps = {
  courses: Course[]
  activeCourseId?: ActiveCourseId
}

export const CourseList = ({ courses, activeCourseId }: CourseListProps) => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { isLoaded, user } = useUser()

  const { mutate, isPending } = useMutation({
    mutationFn: (data: Parameters<typeof upsertUserProgressFn>[0]['data']) =>
      upsertUserProgressFn({ data }),
    onSuccess: async () => {
      queryClient.invalidateQueries(getCoursesQueryOptions())
      queryClient.invalidateQueries(
        getUserProgressQueryOptions(user?.id || null),
      )
      queryClient.invalidateQueries(
        getUserSubscriptionQueryOptions(user?.id || null),
      )
      navigate({ to: '/learn' })
    },
    onError: () => {
      toast.error('Failed to enroll course')
    },
  })

  const onClick = (courseId: number) => {
    if (isPending) return

    if (courseId === activeCourseId) {
      return navigate({ to: '/learn' })
    }

    mutate({
      courseId,
      user: {
        firstName: user?.firstName,
        imageUrl: user?.imageUrl,
      },
    })
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
          disabled={isPending || !isLoaded}
          active={course.id === activeCourseId}
        />
      ))}
    </div>
  )
}
