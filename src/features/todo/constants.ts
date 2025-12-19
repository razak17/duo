export const TODOS_QUERY_KEYS = {
  all: ['todos'],
  byId: (id: number) => [TODOS_QUERY_KEYS.all, id],
} as const
