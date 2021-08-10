<template>
  <main>
    <div class="flex-column">
      <BaseHeader :base-header-model="header"/>
      <form >
        <div class="flex-column">
          <ul>
            <BaseInput v-for="(input, index) in formInputs" :base-input-model="input" v-bind:key="index"/>
          </ul>
          <BaseButton
            v-on:buttonClicked="login()"
            :base-button-model="submitFormButton"
          />
        </div>
      </form>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'

import BaseHeader from "~/components/atoms/typography/header/BaseHeader.vue";
import BaseHeaderModel from "~/components/atoms/typography/header/BaseHeaderModel";
import BaseInputModele from "~/components/atoms/input/BaseInputModel";
import BaseButtonModel from "~/components/atoms/button/BaseButtonModel";
import BaseInput from "~/components/atoms/input/BaseInput.vue";
import BaseButton from "~/components/atoms/button/BaseButton.vue";
import Result from "~/app/utils/useCasesResult/Result";
import Credentials from "~/app/user/entities/Credentials";
import {UseCase} from "~/app/user/useCases/UseCase";
import User from "~/app/user/entities/User";

export default Vue.extend({
  components: {
    BaseHeader,
    BaseInput,
    BaseButton
  },
  data(){
    const header: BaseHeaderModel = new BaseHeaderModel('Connexion')

    const loginInput: BaseInputModele = new BaseInputModele('email', 'login', 'login', 'Email', true, )
    const passwordInput: BaseInputModele = new BaseInputModele('password', 'password', 'password', 'Mot de passe', true, )
    const formInputs = {
      email: loginInput,
      password: passwordInput
    }

    const submitFormButton: BaseButtonModel = new BaseButtonModel('Se connecter', 'success', 'button')

    return {
      header: header,
      formInputs: formInputs,
      submitFormButton: submitFormButton
    }
  },
  methods: {
    async login(){
      const credentials: Credentials = new Credentials(this.formInputs.email, this.formInputs.password)
      const userUseCase: UseCase = new UseCase(this.$fire.auth)

      const result: Result = await userUseCase.login(credentials)

      this.$cookies.set('appquarium-jwt', result.content.jwt)

      await this.$router.push('/')
    }
  }

})
</script>

<style scoped>
form{
  background-color: white;
  border: 1px solid black;
  border-radius: 10px;
  padding: 24px;
}

form > div.flex-column > ul {
  width: 90%;
}

@media only screen and (min-width: 1024px) {
  form {
    width: 50vw;
    min-height: 33vh;
  }
}
@media only screen and (max-width: 1024px) {
  form {
    width: 80vw;
    height: 80vh;
  }
}
</style>
