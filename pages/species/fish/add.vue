<template>
<main>
  <div class="flex-column">
    <p v-if="$fetchState.pending">Récupération des infos️</p>
    <p v-else-if="$fetchState.error">Une erreur est survenue :(</p>
    <section v-else id="add">
      <div class="flex-column">
        <BaseHeader :base-header-model="header" />
        <BaseHeader :base-header-model="stepHeaders[currentStep]" />
        <form v-on:submit.prevent="createNewFish()">
          <div class="flex-column">

            <ul>
              <li class="flex-column">
                <div class="flex-row input-row">
                  <label for="speciesFamily">Famille <span class="required-field">*</span></label>
                  <select name="speciesFamily" id="speciesFamily" v-model="newFish.family">
                    <option value=""></option>
                    <option v-for="(family, index) in speciesFamilies" :value="family.uuid" v-bind:key="index">{{family.name}}</option>
                  </select>
                  <span>OU nouvelle famille</span>
                  <input type="text">
                </div>
              </li>
              <li class="flex-column">
                <div class="flex-row input-row">
                  <label for="speciesGenre">Genre <span class="required-field">*</span></label>
                  <select name="speciesGenre" id="speciesGenre" v-model="newFish.genre">
                    <option value=""></option>
                    <option v-for="(genre, index) in speciesGenres" :value="genre.uuid" v-bind:key="index">{{genre.name}}</option>
                  </select>
                  <span>OU nouveau genre</span>
                  <input type="text">
                </div>
              </li>
              <li class="flex-column">
                <div class="flex-row input-row">
                  <label for="speciesName">Nom de l'espèce <span class="required-field">*</span></label>
                  <input type="text" id="speciesName" v-model="newFish.name">
                </div>
              </li>
              <li class="flex-column">
                <div class="flex-row input-row">
                  <label for="speciesOrigin">Origine <span class="required-field">*</span></label>
                  <select name="speciesOrigin" id="speciesOrigin" v-model="newFish.origin">
                    <option value=""></option>
                    <option v-for="(origin, index) in speciesOrigins" :value="origin.name" v-bind:key="index">{{origin.name}}</option>
                  </select>
                </div>
              </li>
            </ul>
            <BaseButton :base-button-model="nextButton" />
          </div>

        </form>
      </div>
    </section>
  </div>
</main>
</template>

<script lang="ts">
import Vue from 'vue'

import BaseButton from "~/components/atoms/button/BaseButton.vue";
import BaseHeader from "~/components/atoms/typography/header/BaseHeader.vue";
import BaseHeaderModel from "~/components/atoms/typography/header/BaseHeaderModel";
import BaseInput from "~/components/atoms/input/BaseInput.vue";
import SpeciesUseCase from "~/app/species/global/useCases/UseCase";
import Result from "~/app/utils/useCasesResult/Result";
import FishUseCase from "~/app/species/fish/useCases/UseCase";
import BaseButtonModel from "~/components/atoms/button/BaseButtonModel";
import User from "~/app/user/entities/User";
import FishInit from "~/app/species/fish/entities/FishInit";

export default Vue.extend({
  middleware: 'authenticated',
  components: {
    BaseHeader,
    BaseButton
  },
  data(){
    const header: BaseHeaderModel = new BaseHeaderModel("Ajouter une espèce de poisson", 1)

    enum STEPS {
      DESCRIPTION,
      WATER_CONSTRAINTS
    }

    const firstStepHeader: BaseHeaderModel = new BaseHeaderModel("Etape 1 - description", 2)
    const secondStepHeader: BaseHeaderModel = new BaseHeaderModel("Etape 2 - contraintes d'eau", 2)
    const stepHeaders = [
      firstStepHeader,
      secondStepHeader
    ]

    const currentStep = STEPS.DESCRIPTION

    const speciesGenres: Array<any> = []
    const speciesFamilies: Array<any> = []
    const speciesOrigins: Array<any> = []

    const nextButton: BaseButtonModel = new BaseButtonModel('Suivant', 'success', 'submit')

    const jwt: string = this.$cookies.get('appquarium-jwt')
    const user: User = new User('', '', jwt, '')
    const newFish = new FishInit(user)

    return {
      header: header,
      currentStep: currentStep,
      stepHeaders: stepHeaders,
      speciesGenres: speciesGenres,
      speciesFamilies: speciesFamilies,
      speciesOrigins: speciesOrigins,
      nextButton: nextButton,
      newFish: newFish,
      STEPS: STEPS
    }
  },
  async fetch(){
    const speciesUseCase: SpeciesUseCase = new SpeciesUseCase()
    const jwt: string = this.$cookies.get('appquarium-jwt')

    const speciesGenres: Result = await speciesUseCase.getSpeciesGenres(jwt)
    if(speciesGenres.isFailed()){
      for(const error of speciesGenres.errors) {
        if (error.code === 401) {
          this.$cookies.remove('appquarium-jwt')
          await this.$router.push('/login')
        }
      }
      return
    }
    this.speciesGenres = speciesGenres.content

    const speciesFamilies: Result = await speciesUseCase.getSpeciesFamilies(jwt)
    if(speciesFamilies.isFailed() ){
      for(const error of speciesFamilies.errors) {
        if (error.code === 401) {
          this.$cookies.remove('appquarium-jwt')
          await this.$router.push('/login')
        }
      }
      return
    }
    this.speciesFamilies = speciesFamilies.content

    const speciesOrigins: Result = await speciesUseCase.getSpeciesOrigins(jwt)
    if(speciesOrigins.isFailed()){
      for(const error of speciesOrigins.errors) {
        if (error.code === 401) {
          this.$cookies.remove('appquarium-jwt')
          await this.$router.push('/login')
        }
      }
      return
    }
    this.speciesOrigins = speciesOrigins.content
  },
  methods: {
    async createNewFish(){
      this.nextButton.isLoading = true

      const fishUseCase: FishUseCase = new FishUseCase()

      const fishCreation: Result = await fishUseCase.createNewFish(this.newFish)
      if(fishCreation.isFailed()){
        this.nextButton.isLoading = false
        return
      }

      this.currentStep = this.STEPS.WATER_CONSTRAINTS
      this.nextButton.isLoading = false
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

li {
  margin: 12px 0;
}

li > div.input-row {
  padding: 0.5em;
  align-items: normal;
  width: 98%;
}

li > div.input-row > label {
  flex: 1;
  padding: 0.5em 1em 0.5em 0;
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
