import { relations } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { products, shoppingListItems, users } from '.'

export const productCategories = sqliteTable('product_categories', {
  id: integer().primaryKey({ autoIncrement: true }),
  userId: integer('user_id').references(() => users.id),
  isGlobal: integer('is_global', { mode: 'boolean' }).notNull().default(false),
  name: text().notNull(),
  icon: text('icon'),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
})

export const productCategoriesRelations = relations(productCategories, ({ one, many }) => ({
  user: one(users, {
    fields: [productCategories.userId],
    references: [users.id],
  }),

  products: many(products),

  listItems: many(shoppingListItems),
}))
