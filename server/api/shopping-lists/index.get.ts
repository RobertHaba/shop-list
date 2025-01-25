import { eq, getTableColumns, sql } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)

  const { shoppingLists } = tables

  const lists = await useDrizzle()
    .select(
      {
        ...getTableColumns(shoppingLists),
        productCount: sql<number>`(SELECT COUNT(*) FROM shopping_list_items WHERE shopping_list_items.list_id = shopping_lists.id)`,
        completedProductCount: sql<number>`(SELECT COUNT(*) FROM shopping_list_items WHERE shopping_list_items.list_id = shopping_lists.id AND shopping_list_items.is_completed = 1)`,
      },
    )
    .from(shoppingLists)
    .where(eq(shoppingLists.userId, user.id))

  return {
    success: true,
    data: lists,
  }
})
