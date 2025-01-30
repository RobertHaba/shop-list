import { and, eq } from 'drizzle-orm'
import { shoppingListItems, shoppingListItemsUpdateSchema } from '~~/server/database/schema'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)

  const { listId, itemId } = getRouterParams(event)

  const numericListId = Number(listId)
  const numericItemId = Number(itemId)

  const body = await readBody(event)

  validator.validateSchema(shoppingListItemsUpdateSchema, body)

  const [updated] = await useDrizzle()
    .update(shoppingListItems)
    .set(body)
    .where(
      and(
        eq(shoppingListItems.id, numericItemId),
        eq(shoppingListItems.shoppingListId, numericListId),
        eq(shoppingListItems.userId, user.id),
      ),
    )
    .returning()

  if (!updated) {
    throw createError({
      status: 404,
      message: 'error.server.itemNotFound',
    })
  }

  return updated
})
