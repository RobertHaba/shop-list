import type { SQL } from 'drizzle-orm'
import type { AnySQLiteColumn } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'

function lower(email: AnySQLiteColumn): SQL {
  return sql`lower(${email})`
}

export default {
  lower,
}
