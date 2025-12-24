export const GET_USER_SUBSCRIPTION_KEYS = {
  all: ['user-subscripiton'],
  byId: (userId: string) => [...GET_USER_SUBSCRIPTION_KEYS.all, userId],
} as const
