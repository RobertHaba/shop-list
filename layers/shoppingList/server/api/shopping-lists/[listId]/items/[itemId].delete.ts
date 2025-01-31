import { and, eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)

  const { listId, itemId } = getRouterParams(event)

  const numericListId = Number(listId)
  const numericItemId = Number(itemId)

  await useDrizzle().delete(tables.shoppingListItems).where(and(
    eq(tables.shoppingListItems.shoppingListId, numericListId),
    eq(tables.shoppingListItems.id, numericItemId),
    eq(tables.shoppingListItems.userId, user.id),
  ))

  return true
})
