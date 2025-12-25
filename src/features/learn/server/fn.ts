import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

import { authedFn } from '@/lib/middleware/auth'

import { getLesson, getLessonPercentage, getUnits } from './data-access'

export const getUnitsFn = createServerFn({ method: 'GET' })
  .middleware([authedFn])
  .handler(async ({ context: { userId } }) => {
    return await getUnits({ userId })
  })

export const getLessonFn = createServerFn({ method: 'GET' })
  .inputValidator(
    z.object({
      lessonId: z.number().optional(),
    }),
  )
  .middleware([authedFn])
  .handler(async ({ data: { lessonId }, context: { userId } }) => {
    return await getLesson({ id: lessonId, userId })
  })

export const getLessonPercentageFn = createServerFn({ method: 'GET' })
  .middleware([authedFn])
  .handler(async ({ context: { userId } }) => {
    return await getLessonPercentage({ userId })
  })
