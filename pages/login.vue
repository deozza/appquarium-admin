<template>
  <main>
    <div class="flex-column">
      <BaseHeader :base-header-model="header"/>
      <form v-on:submit.prevent="login()">
        <div class="flex-column">
          <BaseParagraph v-if="loginResult.isFailed()" :base-paragraph-model="errorParagraph"/>
          <ul>
            <BaseInput v-for="(input, index) in formInputs" :base-input-model="input" v-bind:key="index"/>
          </ul>
          <BaseButton
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
import UserUseCase from "~/app/user/useCases/UseCase";
import BaseParagraph from "~/components/atoms/typography/paragraph/BaseParagraph.vue";
import BaseParagraphModel from "~/components/atoms/typography/paragraph/BaseParagraphModel";

export default Vue.extend({
  components: {
    BaseHeader,
    BaseInput,
    BaseButton,
    BaseParagraph
  },
  layout: 'login',
  data() {
    const header: BaseHeaderModel = new BaseHeaderModel('Connexion')

    const loginInput: BaseInputModele = new BaseInputModele('email', 'login', 'login', 'Email', true,)
    const passwordInput: BaseInputModele = new BaseInputModele('password', 'password', 'password', 'Mot de passe', true,)
    const formInputs = {
      email: loginInput,
      password: passwordInput
    }

    const submitFormButton: BaseButtonModel = new BaseButtonModel('Se connecter')
    submitFormButton.setStyleOrThrowError('success')

    const errorParagraph: BaseParagraphModel = new BaseParagraphModel('Votre email ou votre mot de passe est incorrect')
    errorParagraph.setStyleOrThrowError('danger')

    const loginResult: Result = new Result()

    return {
      header: header,
      formInputs: formInputs,
      submitFormButton: submitFormButton,
      errorParagraph: errorParagraph,
      loginResult: loginResult
    }
  },
  methods: {
    async login() {
      this.submitFormButton.isLoading = true
      const credentials: Credentials = new Credentials(this.formInputs.email, this.formInputs.password)
      const userUseCase: UserUseCase = new UserUseCase(this.$fire.auth)

      this.loginResult = await userUseCase.login(credentials)

      if (this.loginResult.isFailed()) {
        this.submitFormButton.isLoading = false
        return
      }

      await this.$fire.firestore.collection('user').doc(this.loginResult.content.uid).update({
        lastSignInTime: this.loginResult.content.lastSignInTime
      })

      this.$cookies.set('appquarium-jwt', this.loginResult.content.jwt)
      this.submitFormButton.isLoading = false
      await this.$router.push('/')
    }
  }

})
</script>

<style scoped>
form {
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
