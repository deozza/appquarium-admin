<template>
  <form v-on:submit.prevent="submitWaterConstraints()">
    <div class="flex-column">
      <ul>
        <li class="flex-column">
          <div class="flex-row input-row">
            <label for="phMin">pH minimum <span class="required-field">*</span></label>
            <input id="phMin" type="number" step="0.1" min="0" max="14" v-model.number="species.water_constraint.ph_min">
          </div>
        </li>
        <li class="flex-column">
          <div class="flex-row input-row">
            <label for="phMax">pH maximum <span class="required-field">*</span></label>
            <input id="phMax" type="number" step="0.1" min="0" max="14" v-model.number="species.water_constraint.ph_max">
          </div>
        </li>
        <li class="flex-column">
          <div class="flex-row input-row">
            <label for="ghMin">GH minimum <span class="required-field">*</span></label>
            <input id="ghMin" type="number" min="0" max="50" v-model.number="species.water_constraint.gh_min">
          </div>
        </li>
        <li class="flex-column">
          <div class="flex-row input-row">
            <label for="ghMax">GH maximum <span class="required-field">*</span></label>
            <input id="ghMax" type="number" min="0" max="50" v-model.number="species.water_constraint.gh_max">
          </div>
        </li>
        <li class="flex-column">
          <div class="flex-row input-row">
            <label for="tempMin">Température minimum <span class="required-field">*</span></label>
            <input id="tempMin" type="number" min="0" max="40" v-model.number="species.water_constraint.temp_min">
          </div>
        </li>
        <li class="flex-column">
          <div class="flex-row input-row">
            <label for="tempMax">Température maximum <span class="required-field">*</span></label>
            <input id="tempMax" type="number" min="0" max="40" v-model.number="species.water_constraint.temp_max">
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
  name: "WaterConstraintsFormVue",
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
    if(this.species.water_constraint.uuid !== ''){
      submitButton.content = 'Modifier'
      submitButton.style = 'warning'
    }

    return {
      submitButton: submitButton
    }
  },
  methods: {
    async submitWaterConstraints() {
      this.submitButton.isLoading = true

      const speciesUseCase: SpeciesUseCase = new SpeciesUseCase()

      let result: Result

      if(this.species.water_constraint.uuid === ''){
        const user: User = new User(this.jwt)

        this.species.water_constraint.user = user.uid

        result = await speciesUseCase.addWaterConstraints(this.jwt, this.species)
      }else{
        result = await speciesUseCase.updateSpeciesNaming(this.jwt, this.species)
      }

      if(result.isFailed()){
        console.log(result.content)
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
