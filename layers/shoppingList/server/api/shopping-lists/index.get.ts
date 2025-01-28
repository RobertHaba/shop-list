import { desc, eq, getTableColumns, sql } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)

  const { shoppingLists } = tables

  const lists = await useDrizzle()
    .select(
      {
        ...getTableColumns(shoppingLists),
        itemCount: sql<number>`(SELECT COUNT(*) FROM shopping_list_items WHERE shopping_list_items.shopping_list_id = shopping_lists.id)`,
        completedItemCount: sql<number>`(SELECT COUNT(*) FROM shopping_list_items WHERE shopping_list_items.shopping_list_id = shopping_lists.id AND shopping_list_items.is_purchased = 1)`,
      },
    )
    .from(shoppingLists)
    .where(eq(shoppingLists.userId, user.id))
    .orderBy(desc(shoppingLists.createdAt))

  return {
    success: true,
    data: lists,
  }
})
