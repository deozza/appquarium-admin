import type { Context, Middleware } from '@nuxt/types'
import UserUseCase from "~/app/user/useCases/UseCase";
import Result from "~/app/utils/useCasesResult/Result";

declare module '@nuxt/types' {
  interface Context {
    authenticated?: string
  }
}

const authenticatedMiddleware: Middleware = async (context: Context) => {
  const token = context.app.$cookies.get('appquarium-jwt')
  if(token === undefined){
    return context.redirect('/login')
  }

  const userUseCase: UserUseCase = new UserUseCase(context.app.$fire.auth)
  const result : Result = await userUseCase.checkTokenIsValidOrRefresh(token)

  if(result.isFailed()){
    context.app.$cookies.remove('appquarium-jwt')
    return context.redirect('/login')
  }
}

export default authenticatedMiddleware
