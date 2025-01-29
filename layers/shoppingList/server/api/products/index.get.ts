import { eq, or } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)

  const { products } = tables

  const productList = await useDrizzle()
    .select()
    .from(products)
    .where(
      or(
        eq(products.userId, user.id),
        eq(products.isGlobal, true),
      ),
    )

  return productList
})
