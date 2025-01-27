import { shoppingListInsertSchema } from '~~/server/database/schema'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)

  const body = await readBody(event)

  validator.validateSchema(shoppingListInsertSchema, body)

  const inserted = await useDrizzle().insert(tables.shoppingLists).values({
    userId: user.id,
    name: body.name,
  }).returning({
    id: tables.shoppingLists.id,
    name: tables.shoppingLists.name,
  })

  return inserted[0]
})
