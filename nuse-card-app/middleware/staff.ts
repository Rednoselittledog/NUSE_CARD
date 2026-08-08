export default defineNuxtRouteMiddleware(() => {
  const { loggedIn, user } = useUserSession()
  if (!loggedIn.value) {
    return navigateTo('/login')
  }
  if (user.value?.role !== 'staff') {
    return navigateTo('/')
  }
})
