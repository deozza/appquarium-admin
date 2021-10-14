<template>
<main>
  <BaseHeader :base-header-model="header" />

  <div id="loading" v-if="$fetchState.pending">
    <p >Récupération des infos️</p>
  </div>
  <div id="error" v-else-if="$fetchState.error">
    <p >Une erreur est survenue :(</p>
  </div>
  <div class="flex-column" id="add" v-else>
    <BaseCard>
      <template slot="header">
        <BaseHeader :base-header-model="stepHeaders[currentStep]" />
      </template>
      <template slot="body">
        <form v-on:submit.prevent="createNewFish()">
          <div class="flex-column">

            <ul>
              <li class="flex-column">
                <div class="flex-row input-row">
                  <label for="speciesFamily">Famille <span class="required-field">*</span></label>
                  <select name="speciesFamily" id="speciesFamily" v-model="newFish.family">
                    <option value=""></option>
                    <option v-for="(family, index) in fishFamilies" :value="family.uuid" v-bind:key="index">{{family.name}}</option>
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
                    <option v-for="(genre, index) in fishGenres" :value="genre.uuid" v-bind:key="index">{{genre.name}}</option>
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
      </template>
    </BaseCard>

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
import BaseCard from "~/components/molecules/card/BaseCard.vue";

export default Vue.extend({
  middleware: 'authenticated',
  components: {
    BaseHeader,
    BaseButton,
    BaseCard
  },
  data(){
    const header: BaseHeaderModel = new BaseHeaderModel("Ajouter une espèce de poisson", 1)

    enum STEPS {
      DESCRIPTION,
      WATER_CONSTRAINTS
    }

    const firstStepHeader: BaseHeaderModel = new BaseHeaderModel("Etape 1 - description", 2, 'dark')
    const secondStepHeader: BaseHeaderModel = new BaseHeaderModel("Etape 2 - contraintes d'eau", 2)
    const stepHeaders = [
      firstStepHeader,
      secondStepHeader
    ]

    const currentStep = STEPS.DESCRIPTION

    const fishGenres: Array<any> = []
    const fishFamilies: Array<any> = []
    const speciesOrigins: Array<any> = []

    const nextButton: BaseButtonModel = new BaseButtonModel('Suivant', 'success', 'submit')

    const jwt: string = this.$cookies.get('appquarium-jwt')
    const user: User = new User('', '', jwt, '')
    const newFish = new FishInit(user)

    return {
      header: header,
      currentStep: currentStep,
      stepHeaders: stepHeaders,
      fishGenres: fishGenres,
      fishFamilies: fishFamilies,
      speciesOrigins: speciesOrigins,
      nextButton: nextButton,
      newFish: newFish,
      STEPS: STEPS
    }
  },
  async fetch(){
    const fishUseCase: FishUseCase = new FishUseCase()
    const jwt: string = this.$cookies.get('appquarium-jwt')

    const fishGenres: Result = await fishUseCase.getFishGenres(jwt)
    if(fishGenres.isFailed()){
      for(const error of fishGenres.errors) {
        if (error.code === 401) {
          this.$cookies.remove('appquarium-jwt')
          await this.$router.push('/login')
        }
      }
      return
    }
    this.fishGenres = fishGenres.content

    const fishFamilies: Result = await fishUseCase.getFishFamilies(jwt)
    if(fishFamilies.isFailed() ){
      for(const error of fishFamilies.errors) {
        if (error.code === 401) {
          this.$cookies.remove('appquarium-jwt')
          await this.$router.push('/login')
        }
      }
      return
    }
    this.fishFamilies = fishFamilies.content

    const speciesUseCase: SpeciesUseCase = new SpeciesUseCase()

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
    width: 98%;
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
