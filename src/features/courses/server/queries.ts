import { queryOptions } from '@tanstack/react-query'

import { getCoursesFn } from './fn'
import { GET_COURSES_KEYS } from '../constants'

export function getCoursesQueryOptions() {
  return queryOptions({
    queryKey: GET_COURSES_KEYS.all,
    queryFn: getCoursesFn,
  })
}
