import { queryOptions } from '@tanstack/react-query'

import { getUserFn } from './fn'
import { GET_USER_KEYS } from '../constants'

export function userQueryOptions() {
  return queryOptions({
    queryKey: GET_USER_KEYS.current,
    queryFn: () => getUserFn(),
    staleTime: 5000,
  })
}
