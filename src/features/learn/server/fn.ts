import { createServerFn } from '@tanstack/react-start'

import { authedFn } from '@/lib/middleware/auth'

import { getUserSubscription } from './data-access'

export const getUserSubscriptionFn = createServerFn({ method: 'GET' })
  .middleware([authedFn])
  .handler(async ({ context: { userId } }) => {
    return await getUserSubscription({ userId })
  })
