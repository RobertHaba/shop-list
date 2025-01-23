import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { createInsertSchema, createUpdateSchema } from 'drizzle-zod'
import { shoppingLists, users } from '.'

export const shoppingListItems = sqliteTable('shopping_list_items', {
  id: integer().primaryKey({ autoIncrement: true }),
  listId: integer('list_id').notNull().references(() => shoppingLists.id, { onDelete: 'cascade' }),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  name: text().notNull(),
  quantity: integer().notNull().default(1),
  isCompleted: integer('is_completed', { mode: 'boolean' }).notNull().default(false),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
})

export const shoppingListItemInsertSchema = createInsertSchema(
  shoppingListItems,
  {
    name: schema => schema.min(1),
    quantity: schema => schema.min(1),
  },
).omit({
  id: true,
  listId: true,
  userId: true,
  createdAt: true,
  isCompleted: true,
})

export const shoppingListItemsUpdateSchema = createUpdateSchema(shoppingListItems, { isCompleted: schema => schema }).pick({ isCompleted: true })
