export const GET_COURSES_KEYS = {
  all: ['courses'],
  byId: (courseId: string) => [GET_COURSES_KEYS.all, courseId],
} as const
