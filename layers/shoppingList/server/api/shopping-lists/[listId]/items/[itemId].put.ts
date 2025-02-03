import { and, eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)

  const { listId, itemId } = getRouterParams(event)

  const numericListId = Number(listId)
  const numericItemId = Number(itemId)

  const body = await readBody(event)

  validator.validateSchema(tables.shoppingListItemsUpdateSchema, body)

  const setData: Record<string, any> = {}

  if ('isPurchased' in body) {
    setData.isPurchased = body.isPurchased
  }

  if (body.quantity >= 0) {
    setData.quantity = body.quantity
  }

  if (body.name) {
    setData.name = body.name
  }

  if (body.categoryId) {
    setData.categoryId = body.categoryId
  }

  const [updated] = await useDrizzle()
    .update(tables.shoppingListItems)
    .set(setData)
    .where(
      and(
        eq(tables.shoppingListItems.id, numericItemId),
        eq(tables.shoppingListItems.shoppingListId, numericListId),
        eq(tables.shoppingListItems.userId, user.id),
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
