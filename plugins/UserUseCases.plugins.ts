import { Plugin } from '@nuxt/types'
import {UseCase} from "~/app/user/useCases/UseCase";

declare module '@nuxt/types' {
  interface Context {
    $userUseCase: UseCase
  }
}

const userUseCasePlugin: Plugin = (context) => {
  context.$userUseCase = new UseCase(context.$fire.auth)
}

export default userUseCasePlugin
