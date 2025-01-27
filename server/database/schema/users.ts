import { relations } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { createInsertSchema } from 'drizzle-zod'
import { productCategories, products, shoppingLists } from '.'

export const users = sqliteTable('users', {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  email: text().notNull().unique(),
  password: text().notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
})

export const usersRelations = relations(users, ({ many }) => ({
  shoppingLists: many(shoppingLists),
  categories: many(productCategories),
  products: many(products),
}))

export const userInsertSchema = createInsertSchema(
  users,
  {
    name: schema => schema.min(3),
    email: schema => schema.email(),
    password: schema => schema.min(8),
  },
).omit({
  id: true,
  createdAt: true,
})

export const userLoginSchema = createInsertSchema(
  users,
  {
    email: schema => schema.email(),
    password: schema => schema.min(8),
  },
).pick({
  email: true,
  password: true,
})
