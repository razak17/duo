import { auth } from '@clerk/tanstack-react-start/server'
import { redirect } from '@tanstack/react-router'
import { createMiddleware } from '@tanstack/react-start'

export const authed = createMiddleware().server(async ({ next }) => {
  const session = await auth()

  if (!session || !session.userId) {
    throw redirect({ to: '/' })
  }

  return await next()
})

export const authedFn = createMiddleware({ type: 'function' }).server(
  async ({ next }) => {
    const session = await auth()

    if (!session || !session.userId) {
      throw new Error('Unauthorized')
    }

    return await next({ context: { userId: session.userId } })
  },
)
