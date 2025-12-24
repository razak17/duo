import { createServerFn } from '@tanstack/react-start'

import { authedFn } from '@/lib/middleware/auth'

import { getCourses } from './data-access'

export const getCoursesFn = createServerFn({ method: 'GET' })
  .middleware([authedFn])
  .handler(async () => {
    return await getCourses()
  })
