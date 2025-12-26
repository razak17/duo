import { queryOptions } from '@tanstack/react-query'

import {
  getCourseProgressFn,
  getUserFn,
  getUserProgressFn,
  getUserSubscriptionFn,
} from './fn'
import {
  GET_COURSE_PROGRESS_KEYS,
  GET_USER_KEYS,
  GET_USER_PROGRESS_KEYS,
  GET_USER_SUBSCRIPTION_KEYS,
} from '../constants'

const FIVE_MINUTES = 1000 * 60 * 5
const ONE_MINUTE = 1000 * 60
const THIRTY_SECONDS = 1000 * 30

export function userQueryOptions() {
  return queryOptions({
    queryKey: GET_USER_KEYS.current,
    queryFn: () => getUserFn(),
    staleTime: FIVE_MINUTES,
  })
}

export function getUserProgressQueryOptions(userId?: string | null) {
  return queryOptions({
    queryKey: GET_USER_PROGRESS_KEYS.byId(userId || 'user-id'),
    queryFn: getUserProgressFn,
    staleTime: THIRTY_SECONDS,
  })
}

export function getCourseProgressQueryOptions(userId?: string | null) {
  return queryOptions({
    queryKey: GET_COURSE_PROGRESS_KEYS.byUserId(userId || 'user-id'),
    queryFn: getCourseProgressFn,
    staleTime: THIRTY_SECONDS,
  })
}

export function getUserSubscriptionQueryOptions(userId?: string | null) {
  return queryOptions({
    queryKey: GET_USER_SUBSCRIPTION_KEYS.byId(userId || 'user-id'),
    queryFn: getUserSubscriptionFn,
    staleTime: ONE_MINUTE,
  })
}
