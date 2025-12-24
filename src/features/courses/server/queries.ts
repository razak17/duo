import { queryOptions } from '@tanstack/react-query'

import { getCourseByIdFn, getCoursesFn } from './fn'
import { GET_COURSES_KEYS } from '../constants'

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
