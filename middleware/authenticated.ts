import type { Context, Middleware } from '@nuxt/types'

declare module '@nuxt/types' {
  interface Context {
    authenticated?: string
  }
}

const authenticatedMiddleware: Middleware = (context: Context) => {
  if(context.app.$cookies.get('appquarium-jwt') === undefined){
    return context.redirect('/login')
  }
}

export default authenticatedMiddleware
