import { auth } from '@clerk/tanstack-react-start/server'
import { createServerFn } from '@tanstack/react-start'

import { authedFn } from '@/lib/middleware/auth'

import {
  getCourseProgress,
  getUserProgress,
  getUserSubscription,
} from './data-access'

export const getUserFn = createServerFn({ method: 'GET' }).handler(async () => {
  const session = await auth()
  return session?.userId ?? null
})

export const getUserProgressFn = createServerFn({ method: 'GET' })
  .middleware([authedFn])
  .handler(async ({ context: { userId } }) => {
    return await getUserProgress({ userId })
  })

export const getCourseProgressFn = createServerFn({ method: 'GET' })
  .middleware([authedFn])
  .handler(async ({ context: { userId } }) => {
    return await getCourseProgress({ userId })
  })

export const getUserSubscriptionFn = createServerFn({ method: 'GET' })
  .middleware([authedFn])
  .handler(async ({ context: { userId } }) => {
    return await getUserSubscription({ userId })
  })
