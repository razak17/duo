import { queryOptions } from '@tanstack/react-query'

import { TODOS_QUERY_KEYS } from '../constants'
import { getTodosFn } from '../server/fn'

export function getTodosQueryOptions() {
  return queryOptions({
    queryKey: TODOS_QUERY_KEYS.all,
    queryFn: getTodosFn,
  })
}
