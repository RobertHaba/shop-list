export default defineNuxtRouteMiddleware((to) => {
  const { loggedIn } = useUserSession()

  const disabledRoutes = ['/login', '/register']

  if (disabledRoutes.includes(to.path)) {
    return
  }

  if (!loggedIn.value) {
    return navigateTo('/login')
  }
})
