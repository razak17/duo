export const GET_COURSES_KEYS = {
  all: ['courses'],
  byId: (courseId: number) => [...GET_COURSES_KEYS.all, courseId],
} as const
