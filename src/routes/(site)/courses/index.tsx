import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Loader } from 'lucide-react'

import { CourseList } from '@/features/courses/components/course-list'
import { getCoursesQueryOptions } from '@/features/courses/server/queries'
import { getUserProgressQueryOptions } from '@/features/shared/server/queries'

export const Route = createFileRoute('/(site)/courses/')({
  component: RouteComponent,
  pendingComponent: PendingComponent,
  loader: async ({ context: { queryClient, userId } }) => {
    const [courses, userProgress] = await Promise.all([
      queryClient.ensureQueryData(getCoursesQueryOptions()),
      queryClient.ensureQueryData(getUserProgressQueryOptions(userId)),
    ])
    return { courses, userProgress }
  },
})

function RouteComponent() {
  const { userId } = Route.useRouteContext()
  const { data: courses } = useSuspenseQuery(getCoursesQueryOptions())
  const { data: userProgress } = useSuspenseQuery(
    getUserProgressQueryOptions(userId),
  )

  return (
    <div className="mx-auto h-full max-w-[912px] px-3">
      <h1 className="font-bold text-2xl text-neutral-700">Language Courses</h1>
      <CourseList
        courses={courses}
        activeCourseId={userProgress?.activeCourseId}
      />
    </div>
  )
}

function PendingComponent() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Loader className="h-6 w-6 animate-spin text-muted-foreground" />
    </div>
  )
}
