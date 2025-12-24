export const GET_UNITS_KEYS = {
  all: ['units'],
  byId: (unitId: number) => [...GET_UNITS_KEYS.all, unitId],
  byUserId: (userId: string) => [...GET_UNITS_KEYS.all, userId],
} as const

export const GET_LESSONS_KEYS = {
  all: ['lessons'],
  byId: (lessonId: number) => [...GET_LESSONS_KEYS.all, lessonId],
  byUserId: (userId: string) => [...GET_LESSONS_KEYS.all, userId],
} as const

export const GET_LESSON_PERCENTAGE_KEYS = {
  all: ['lessonPercentage'],
  byUserId: (userId: string) => [...GET_LESSON_PERCENTAGE_KEYS.all, userId],
} as const
