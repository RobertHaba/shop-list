export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)

  const listId = getRouterParam(event, 'listId')

  const numericListId = Number(listId)

  const body = await readBody(event)

  validator.validateSchema(tables.shoppingListItemInsertSchema, body)

  const [inserted] = await useDrizzle().insert(tables.shoppingListItems).values({
    ...body,
    shoppingListId: numericListId,
    userId: user.id,
  }).returning()

  if (inserted) {
    return await useDrizzle().query.shoppingListItems.findFirst({
      where: (items, { eq }) => eq(items.id, inserted.id),
      with: {
        product: {
          with: {
            category: true,
          },
        },
      },
    })
  }

  return inserted
})
