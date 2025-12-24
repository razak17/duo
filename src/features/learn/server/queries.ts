import { queryOptions } from '@tanstack/react-query'

import { getLessonFn, getLessonPercentageFn, getUnitsFn } from './fn'
import {
  GET_LESSON_PERCENTAGE_KEYS,
  GET_LESSONS_KEYS,
  GET_UNITS_KEYS,
} from '../constants'

export function getUnitsQueryOptions() {
  return queryOptions({
    queryKey: GET_UNITS_KEYS.all,
    queryFn: () => getUnitsFn(),
  })
}

export function getLessonQueryOptions(lessonId: number) {
  return queryOptions({
    queryKey: GET_LESSONS_KEYS.byId(lessonId),
    queryFn: () => getLessonFn({ data: { lessonId } }),
  })
}

export function getLessonPercentageQueryOptions(userId: string | null) {
  return queryOptions({
    queryKey: GET_LESSON_PERCENTAGE_KEYS.byUserId(userId || 'user-id'),
    queryFn: () => getLessonPercentageFn(),
  })
}
