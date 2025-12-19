import { relations } from 'drizzle-orm'
import { pgTable, serial, text } from 'drizzle-orm/pg-core'

import { units } from './units'
import { userProgress } from './users'

export const courses = pgTable('courses', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  imageSrc: text('image_src').notNull(),
})

export const coursesRelations = relations(courses, ({ many }) => ({
  userProgress: many(userProgress),
  units: many(units),
}))
