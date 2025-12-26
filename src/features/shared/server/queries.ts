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

export function userQueryOptions() {
  return queryOptions({
    queryKey: GET_USER_KEYS.current,
    queryFn: () => getUserFn(),
    staleTime: 5000,
  })
}

export function getUserProgressQueryOptions(userId?: string | null) {
  return queryOptions({
    queryKey: GET_USER_PROGRESS_KEYS.byId(userId || 'user-id'),
    queryFn: getUserProgressFn,
  })
}

export function getCourseProgressQueryOptions(userId?: string | null) {
  return queryOptions({
    queryKey: GET_COURSE_PROGRESS_KEYS.byUserId(userId || 'user-id'),
    queryFn: getCourseProgressFn,
  })
}

export function getUserSubscriptionQueryOptions(userId?: string | null) {
  return queryOptions({
    queryKey: GET_USER_SUBSCRIPTION_KEYS.byId(userId || 'user-id'),
    queryFn: getUserSubscriptionFn,
  })
}
