import bcrypt from 'bcrypt'

import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  await useDrizzle().insert(tables.users).values({
    name: body.name,
    email: body.email,
    password: bcrypt.hashSync(body.password, 12),
  })

  const user = (await useDrizzle().select().from(tables.users).where(eq(tables.users.email, body.email)).limit(1))[0]

  return auth.login(event, user)
})
