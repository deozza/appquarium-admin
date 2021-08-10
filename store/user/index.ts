import { GetterTree, MutationTree, ActionTree } from 'vuex'

export type State = {
  jwt: string
}

export const state = (): State => ({
  jwt: '',
})

export type RootState = ReturnType<typeof state>

export const actions: ActionTree<RootState, RootState> = {
  async nuxtServerInit({ dispatch }, ctx) {
    // INFO -> Nuxt-fire Objects can be accessed in nuxtServerInit action via this.$fire___, ctx.$fire___ and ctx.app.$fire___'

    /** Get the VERIFIED authUser on the server */
    if (ctx.res && ctx.res.locals && ctx.res.locals.user) {
      const { allClaims: claims, ...authUser } = ctx.res.locals.user

      console.info(
        'Auth User verified on server-side. User: ',
        authUser,
        'Claims:',
        claims
      )

      await dispatch('onAuthStateChangedAction', {
        authUser,
        claims,
      })
    }
  },

  onAuthStateChangedAction({ commit }, { authUser }) {
    if (authUser === null) {
      authUser = {}
    }
    commit('SET_AUTH_USER', { authUser })
  },
}

export const getters: GetterTree<RootState, RootState> = {
  isLoggedIn: (state) => {
    try {
      return state.jwt !== ''
    } catch {
      return false
    }
  }
}

export const mutations: MutationTree<RootState> = {
  SET_AUTH_USER: async (state, { authUser }) => {
    let jwt: string = ''
    if(authUser.uid !== ''){
      jwt = await authUser.getIdToken()
    }

    state.jwt = jwt
  },
}
