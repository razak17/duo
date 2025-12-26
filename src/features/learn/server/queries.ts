import { queryOptions } from '@tanstack/react-query'

import {
  getLearnPageDataFn,
  getLessonFn,
  getLessonPercentageFn,
  getUnitsFn,
} from './fn'
import {
  GET_LESSON_PERCENTAGE_KEYS,
  GET_LESSONS_KEYS,
  GET_UNITS_KEYS,
} from '../constants'

const FIVE_MINUTES = 1000 * 60 * 5
const THIRTY_SECONDS = 1000 * 30

/**
 * Consolidated query for learn page - single query replaces 3 separate queries
 */
export function getLearnPageDataQueryOptions(userId?: string | null) {
  return queryOptions({
    queryKey: ['learnPageData', userId || 'user-id'],
    queryFn: () => getLearnPageDataFn(),
    staleTime: THIRTY_SECONDS,
  })
}

export function getUnitsQueryOptions() {
  return queryOptions({
    queryKey: GET_UNITS_KEYS.all,
    queryFn: () => getUnitsFn(),
    staleTime: FIVE_MINUTES,
  })
}

export function getLessonQueryOptions(
  userId?: string | null,
  lessonId?: number,
) {
  return queryOptions({
    queryKey: GET_LESSONS_KEYS.byUserId(userId || 'user-id'),
    queryFn: () => getLessonFn({ data: { lessonId } }),
    staleTime: THIRTY_SECONDS,
  })
}

export function getLessonPercentageQueryOptions(userId?: string | null) {
  return queryOptions({
    queryKey: GET_LESSON_PERCENTAGE_KEYS.byUserId(userId || 'user-id'),
    queryFn: () => getLessonPercentageFn(),
    staleTime: THIRTY_SECONDS,
  })
}
