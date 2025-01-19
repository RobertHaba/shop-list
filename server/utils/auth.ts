import type { H3Event } from 'h3'
import type { User } from './drizzle'
import bcrypt from 'bcrypt'
import { eq } from 'drizzle-orm'

// Logs the user in as the given user model
async function login(event: H3Event<Request>, user: Omit<User, 'createdAt'>) {
  await replaceUserSession(event, {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    loggedInAt: new Date(),
  })
}

async function getCurrentUser(event) {
  const session = await getUserSession(event)

  // return null if there's no user
  if (!session.user) {
    return null
  }

  // we're getting the whole user object by default for convenience, but always remove the password
  const result = (await useDrizzle().select().from(tables.users).where(eq(tables.users.id, session.user.id)).limit(1))?.[0]

  delete result.password

  return result
}

async function attempt(event: H3Event<Request>, email: string, password: string) {
  const { users } = tables

  validator.validateSchema(tables.userLoginSchema, { email, password })

  const foundUser = (
    await useDrizzle()
      .select({ id: users.id, name: users.name, email: users.email, password: users.password })
      .from(users)
      .where(eq(sqliteExtender.lower(users.email), email.toLowerCase()))
      .limit(1)
  )?.[0]

  // compare the password hash
  if (!foundUser || !bcrypt.compareSync(password, foundUser.password)) {
    throw createError({
      statusCode: 401,
      statusMessage: 'error.server.invalidCredentials',
    })
  }

  // log in as the selected user
  await login(event, foundUser)

  return true
}

export default {
  login,
  user: getCurrentUser,
  attempt,
}
