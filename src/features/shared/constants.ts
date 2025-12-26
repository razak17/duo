export const DAY_IN_MS = 86_400_000
export const FIVE_MINUTES = 1000 * 60 * 5
export const ONE_MINUTE = 1000 * 60
export const THIRTY_SECONDS = 1000 * 30

export const GET_USER_KEYS = {
  current: ['auth', 'user'],
} as const

export const GET_COURSE_PROGRESS_KEYS = {
  all: ['courseProgress'],
  byUserId: (userId: string) => [...GET_COURSE_PROGRESS_KEYS.all, userId],
} as const

export const GET_USER_PROGRESS_KEYS = {
  all: ['userProgress'],
  byId: (userId: string) => [...GET_USER_PROGRESS_KEYS.all, userId],
} as const

export const GET_USER_SUBSCRIPTION_KEYS = {
  all: ['user-subscription'],
  byId: (userId: string) => [...GET_USER_SUBSCRIPTION_KEYS.all, userId],
} as const
