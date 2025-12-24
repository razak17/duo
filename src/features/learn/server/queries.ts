import { queryOptions } from '@tanstack/react-query'

import { getUserSubscriptionFn } from './fn'
import { GET_USER_SUBSCRIPTION_KEYS } from '../constants'

export function getUserSubscriptionQueryOptions(userId: string | null) {
  return queryOptions({
    queryKey: GET_USER_SUBSCRIPTION_KEYS.byId(userId || 'user-id'),
    queryFn: getUserSubscriptionFn,
  })
}
