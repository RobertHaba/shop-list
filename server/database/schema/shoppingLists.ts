import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { createInsertSchema } from 'drizzle-zod'
import { users } from '.'

export const shoppingLists = sqliteTable('shopping_lists', {
  id: integer().primaryKey({ autoIncrement: true }),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  name: text().notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
})

export const shoppingListInsertSchema = createInsertSchema(
  shoppingLists,
  {
    name: schema => schema.min(3),
  },
).omit({
  id: true,
  userId: true,
  createdAt: true,
})
