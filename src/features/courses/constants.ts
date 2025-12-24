export const GET_COURSES_KEYS = {
  all: ['courses'],
  byId: (courseId: number) => [...GET_COURSES_KEYS.all, courseId],
} as const

export const GET_USER_PROGRESS_KEYS = {
  all: ['userProgress'],
  byId: (userId: string) => [...GET_USER_PROGRESS_KEYS.all, userId],
} as const
