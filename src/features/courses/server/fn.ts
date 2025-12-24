import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

import { authedFn } from '@/lib/middleware/auth'

import { getCourseById, getCourses } from './data-access'
import { upsertUserProgress } from './mutations'

export const getCoursesFn = createServerFn({ method: 'GET' })
  .middleware([authedFn])
  .handler(async () => {
    return await getCourses()
  })

export const getCourseByIdFn = createServerFn({ method: 'GET' })
  .inputValidator(
    z.object({
      courseId: z.number(),
    }),
  )
  .middleware([authedFn])
  .handler(async ({ data: { courseId } }) => {
    return await getCourseById({ courseId })
  })

export const upsertUserProgressFn = createServerFn({ method: 'GET' })
  .inputValidator(
    z.object({
      courseId: z.number(),
      user: z.object({
        firstName: z.string().optional().nullable(),
        imageUrl: z.string().optional(),
      }),
    }),
  )
  .middleware([authedFn])
  .handler(async ({ context: { userId }, data: { courseId, user } }) => {
    return await upsertUserProgress({
      courseId,
      userId,
      user,
    })
  })
