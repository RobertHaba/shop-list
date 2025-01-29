import { shoppingListItemInsertSchema } from '~~/server/database/schema'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)

  const listId = getRouterParam(event, 'listId')

  const numericListId = Number(listId)

  const body = await readBody(event)

  validator.validateSchema(shoppingListItemInsertSchema, body)

  const [inserted] = await useDrizzle().insert(tables.shoppingListItems).values({
    ...body,
    shoppingListId: numericListId,
    userId: user.id,
  }).returning()

  return inserted
})
