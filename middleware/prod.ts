export default defineNuxtRouteMiddleware((to, _from) => {
  if (process.env.NODE_ENV === 'production') {
    /*
    const user = useStrapiUser()
    if (!user.value) {
      return navigateTo('/login')
    }
    */
  }
})
