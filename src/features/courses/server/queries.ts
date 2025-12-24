import { queryOptions } from '@tanstack/react-query'

import { getCourseByIdFn, getCoursesFn, getUserProgressFn } from './fn'
import { GET_COURSES_KEYS, GET_USER_PROGRESS_KEYS } from '../constants'

export function getCoursesQueryOptions() {
  return queryOptions({
    queryKey: GET_COURSES_KEYS.all,
    queryFn: getCoursesFn,
  })
}

export function getCourseByIdQueryOptions(courseId: number) {
  return queryOptions({
    queryKey: GET_COURSES_KEYS.byId(courseId),
    queryFn: () => getCourseByIdFn({ data: { courseId } }),
  })
}

export function getUserProgressQueryOptions(userId: string | null) {
  return queryOptions({
    queryKey: GET_USER_PROGRESS_KEYS.byId(userId || 'user-id'),
    queryFn: getUserProgressFn,
  })
}
