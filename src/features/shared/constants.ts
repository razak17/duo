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
  all: ['user-subscripiton'],
  byId: (userId: string) => [...GET_USER_SUBSCRIPTION_KEYS.all, userId],
} as const
