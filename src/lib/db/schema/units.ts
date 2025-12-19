import { relations } from 'drizzle-orm'
import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core'

import { courses } from './courses'
import { lessons } from './lessons'

export const units = pgTable('units', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(), // Unit 1
  description: text('description').notNull(), // Learn the basics of spanish
  courseId: integer('course_id')
    .references(() => courses.id, { onDelete: 'cascade' })
    .notNull(),
  order: integer('order').notNull(),
})

export const unitsRelations = relations(units, ({ many, one }) => ({
  course: one(courses, {
    fields: [units.courseId],
    references: [courses.id],
  }),
  lessons: many(lessons),
}))
