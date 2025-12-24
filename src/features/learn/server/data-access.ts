import { eq } from 'drizzle-orm'

import { db } from '@/lib/db'
import { userSubscription } from '@/lib/db/schema/users'

const DAY_IN_MS = 86_400_000

export async function getUserSubscription({ userId }: { userId: string }) {
  const data = await db.query.userSubscription.findFirst({
    where: eq(userSubscription.userId, userId),
  })

  if (!data) return null

  const isActive =
    data.stripePriceId &&
    // biome-ignore lint/style/noNonNullAssertion: ignore
    // biome-ignore lint/suspicious/noNonNullAssertedOptionalChain: ignore
    data.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now()

  return {
    ...data,
    isActive: !!isActive,
  }
}
