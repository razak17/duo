import type { QuizStatuses } from './constants'

export type QuizStatus = (typeof QuizStatuses)[keyof typeof QuizStatuses]
