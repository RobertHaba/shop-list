import { relations } from 'drizzle-orm'
import { integer, sqliteTable } from 'drizzle-orm/sqlite-core'
import { createInsertSchema, createUpdateSchema } from 'drizzle-zod'
import { products, shoppingLists } from '.'

export const shoppingListItems = sqliteTable('shopping_list_items', {
  id: integer().primaryKey({ autoIncrement: true }),
  shoppingListId: integer('shopping_list_id').notNull().references(() => shoppingLists.id, { onDelete: 'cascade' }),
  productId: integer('product_id').notNull().references(() => products.id),
  quantity: integer().notNull().default(1),
  isPurchased: integer('is_purchased', { mode: 'boolean' }).notNull().default(false),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
})

export const shoppingListItemsRelations = relations(shoppingListItems, ({ one }) => ({
  shoppingList: one(shoppingLists, {
    fields: [shoppingListItems.shoppingListId],
    references: [shoppingLists.id],
  }),

  product: one(products, {
    fields: [shoppingListItems.productId],
    references: [products.id],
  }),
}))

export const shoppingListItemInsertSchema = createInsertSchema(
  shoppingListItems,
  {
    productId: schema => schema.min(1),
    quantity: schema => schema.min(1),
  },
).omit({
  id: true,
  shoppingListId: true,
  createdAt: true,
  updatedAt: true,
})

export const shoppingListItemsUpdateSchema = createUpdateSchema(shoppingListItems, { isPurchased: schema => schema }).pick({ isPurchased: true })
