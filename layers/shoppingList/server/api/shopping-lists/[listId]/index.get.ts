import { and, eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)

  const listId = Number(getRouterParam(event, 'listId'))

  const { shoppingLists } = tables

  const list = await useDrizzle().query.shoppingLists.findFirst({
    columns: {
      id: true,
      name: true,
    },
    where: and(eq(shoppingLists.id, listId), eq(shoppingLists.userId, user.id)),
    with: {
      items: {
        with: {
          product: true,
        },
      },
    },
  })

  if (!list) {
    throw createError({
      status: 404,
      message: 'error.server.listNotFound',
    })
  }

  return list
})
