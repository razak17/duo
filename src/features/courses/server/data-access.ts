import { eq } from 'drizzle-orm'

import { db } from '@/lib/db'
import { courses } from '@/lib/db/schema/courses'

export async function getCourses() {
  const data = await db.query.courses.findMany()
  return data ?? null
}

export async function getCourseById({ courseId }: { courseId: number }) {
  const data = await db.query.courses.findFirst({
    where: eq(courses.id, courseId),
    with: {
      units: {
        orderBy: (units, { asc }) => [asc(units.order)],
        with: {
          lessons: {
            orderBy: (lessons, { asc }) => [asc(lessons.order)],
          },
        },
      },
    },
  })

  return data ?? null
}
