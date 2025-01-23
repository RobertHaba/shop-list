import { drizzle } from 'drizzle-orm/better-sqlite3'

import * as schema from '~~/server/database/schema'

export const tables = schema

export function useDrizzle() {
  return drizzle({ connection: useRuntimeConfig().databaseUrl, schema, casing: 'snake_case' })
}

export type User = typeof schema.users.$inferSelect

export type ShoppingLists = typeof schema.shoppingLists.$inferSelect

export type ShoppingListItems = typeof schema.shoppingListItems.$inferSelect
