import { and, eq } from 'drizzle-orm'
import { shoppingListItemInsertSchema } from '~~/server/database/schema'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)

  const { listId } = event.context.params!

  const numericListId = Number(listId)

  const body = await readBody(event)

  validator.validateSchema(shoppingListItemInsertSchema, body)

  const { shoppingListItems, shoppingLists } = tables

  const existingList = await useDrizzle().select().from(shoppingLists).where(
    and(
      eq(shoppingLists.id, numericListId),
      eq(shoppingLists.userId, user.id),
    ),
  )

  if (existingList.length === 0) {
    throw createError({
      message: 'error.server.listNotFound',
      status: 404,
    })
  }

  const [insertedItem] = await useDrizzle().insert(shoppingListItems).values({
    listId: numericListId,
    name: body.name,
    quantity: body.quantity,
    userId: user.id,
  }).returning({
    id: shoppingListItems.id,
    listId: shoppingListItems.listId,
    name: shoppingListItems.name,
    quantity: shoppingListItems.quantity,
    createdAt: shoppingListItems.createdAt,
  })

  return {
    success: true,
    data: insertedItem,
  }
})
