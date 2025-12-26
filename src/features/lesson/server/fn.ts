import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

import { authedFn } from '@/lib/middleware/auth'

import { reduceHearts, upsertChallengeProgress } from './mutations'

export const upsertChallengeProgressFn = createServerFn({ method: 'POST' })
  .inputValidator(
    z.object({
      challengeId: z.number(),
    }),
  )
  .middleware([authedFn])
  .handler(async ({ context: { userId }, data: { challengeId } }) => {
    return await upsertChallengeProgress({
      challengeId,
      userId,
    })
  })

export const reduceHeartsFn = createServerFn({ method: 'POST' })
  .inputValidator(
    z.object({
      challengeId: z.number(),
    }),
  )
  .middleware([authedFn])
  .handler(async ({ context: { userId }, data: { challengeId } }) => {
    return await reduceHearts({
      challengeId,
      userId,
    })
  })
