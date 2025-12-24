import { auth } from '@clerk/tanstack-react-start/server'
import { createServerFn } from '@tanstack/react-start'

export const getUserFn = createServerFn({ method: 'GET' }).handler(async () => {
  const session = await auth()
  return session?.userId ?? null
})
