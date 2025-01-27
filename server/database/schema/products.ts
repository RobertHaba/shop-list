import { relations } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { productCategories, shoppingListItems, users } from '.'

export const products = sqliteTable('products', {
  id: integer().primaryKey({ autoIncrement: true }),
  userId: integer('user_id').references(() => users.id),
  isGlobal: integer('is_global', { mode: 'boolean' }).notNull().default(false),
  categoryId: integer('category_id').notNull().references(() => productCategories.id),
  name: text().notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
})

export const productsRelations = relations(products, ({ one, many }) => ({
  user: one(users, {
    fields: [products.userId],
    references: [users.id],
  }),

  category: one(productCategories, {
    fields: [products.categoryId],
    references: [productCategories.id],
  }),

  listItems: many(shoppingListItems),
}))
