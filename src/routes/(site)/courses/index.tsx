import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Loader } from 'lucide-react'

import { authed } from '@/lib/middleware/auth'

import { CourseList } from '@/features/courses/components/course-list'
import { getCoursesQueryOptions } from '@/features/courses/server/queries'

export const Route = createFileRoute('/(site)/courses/')({
  component: RouteComponent,
  pendingComponent: PendingComponent,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(getCoursesQueryOptions())
  },
  server: {
    middleware: [authed],
  },
})

function RouteComponent() {
  const { data: courses } = useSuspenseQuery(getCoursesQueryOptions())

  return (
    <div className="mx-auto h-full max-w-[912px] px-3">
      <h1 className="font-bold text-2xl text-neutral-700">Language Courses</h1>
      <CourseList courses={courses} />
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
