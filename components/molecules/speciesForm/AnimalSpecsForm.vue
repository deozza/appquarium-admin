<template>
  <form v-on:submit.prevent="submitAnimalSpecsForm()">
    <div class="flex-column">
      <ul>
        <li class="flex-column">
          <div class="flex-row input-row">
            <label for="maleSize">Taille du male <span class="required-field">*</span></label>
            <input type="number" id="maleSize" name="maleSize"  v-model.number="species.animal_specs.male_size">
          </div>
          <div class="flex-row input-row">
            <label for="femaleSize">Taille de la femelle <span class="required-field">*</span></label>
            <input type="number" id="femaleSize" name="femaleSize"  v-model.number="species.animal_specs.female_size">
          </div>
          <div class="flex-row input-row">
            <label for="longevityInYears">Longévité </label>
            <input type="number" id="longevityInYears" name="longevityInYears"  v-model="species.animal_specs.longevity_in_years">
          </div>
        </li>
      </ul>
      <BaseButton :base-button-model="submitButton" />
    </div>
  </form>
</template>

<script lang="ts">
import Vue from 'vue'

import Species from "~/app/species/global/entities/Species";
import BaseButtonModel from "~/components/atoms/button/BaseButtonModel";
import BaseButton from "~/components/atoms/button/BaseButton.vue";
import SpeciesUseCase from "~/app/species/global/useCases/UseCase";
import Result from "~/app/utils/useCasesResult/Result";
import User from "~/app/user/entities/User";

export default Vue.extend({
  name: "AnimalSpecsFormVue",
  components: {
    BaseButton
  },
  props: {
    species: {
      type: Species,
      required: true
    },
    jwt: {
      type: String,
      required: true
    }
  },
  data() {
    const submitButton : BaseButtonModel = new BaseButtonModel('Ajouter', 'success', 'submit')
    if(this.species.animal_specs.uuid !== ''){
      submitButton.content = 'Modifier'
      submitButton.style = 'warning'
    }

    const speciesOrigins: Array<string> = []

    return {
      submitButton: submitButton,
      speciesOrigins: speciesOrigins
    }
  },
  methods: {
    async submitAnimalSpecsForm() {
      this.submitButton.isLoading = true

      const speciesUseCase: SpeciesUseCase = new SpeciesUseCase()

      let result: Result

      if(this.species.animal_specs.uuid === ''){
        const user: User = new User(this.jwt)

        this.species.animal_specs.user = user.uid

        result = await speciesUseCase.addAnimalSpecs(this.jwt, this.species)
      }else{
        result = await speciesUseCase.updateAnimalSpecs(this.jwt, this.species)
      }

      if(result.isFailed()){
        console.log(result.errors)
      }

      if(result.isSuccessful() && result.success?.code === 201){
        this.submitButton.style = 'warning'
        this.submitButton.content = 'Modifier'
      }

      this.submitButton.isLoading = false
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
