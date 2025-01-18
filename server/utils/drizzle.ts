import { drizzle } from 'drizzle-orm/better-sqlite3'

import * as schema from '~~/server/database/schema'

export const tables = schema

export function useDrizzle() {
  return drizzle({ connection: useRuntimeConfig().databaseUrl, schema })
}

export type User = typeof schema.users.$inferSelect
