<template>
  <form v-on:submit.prevent="submitGeneralInfoForm()">
    <div class="flex-column">
      <ul>
        <li class="flex-column">
          <div class="flex-row input-row">
            <label for="speciesOrigin">Origine <span class="required-field">*</span></label>
            <input type="text" id="speciesOrigin" name="speciesOrigin" list="speciesOrigin-list" v-model="species.origin">
            <datalist id="speciesOrigin-list">
              <option v-for="(origin, index) in speciesOrigins" :value="origin.name" v-bind:key="index">{{origin.name}}</option>
            </datalist>
          </div>
        </li>
      </ul>
      <BaseButton :base-button-model="submitButton" />
    </div>
  </form>
</template>

<script lang="ts">

import Species from "~/app/species/global/entities/Species";
import BaseButtonModel from "~/components/atoms/button/BaseButtonModel";
import BaseButton from "~/components/atoms/button/BaseButton.vue";
import SpeciesUseCase from "~/app/species/global/useCases/UseCase";
import Result from "~/app/utils/useCasesResult/Result";

export default {
  name: "GeneralInfoFormVue",
  components: {
    BaseButton
  },
  props: {
    species: {
      type: Species,
      required: true
    }
  },
  data() {
    const submitButton : BaseButtonModel = new BaseButtonModel('Ajouter', 'success', 'submit')
    if(this.species.uuid !== ''){
      submitButton.content = 'Modifier'
      submitButton.style = 'warning'
    }

    const speciesOrigins: Array<string> = []

    return {
      submitButton: submitButton,
      speciesOrigins: speciesOrigins
    }
  },
  async fetch() {
    const jwt: string = this.$cookies.get('appquarium-jwt')
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
    async submitGeneralInfoForm() {
      this.submitButton.isLoading = true
      const speciesUseCase: SpeciesUseCase = new SpeciesUseCase()

      //const updatedSpecies = await speciesUseCase.addOrUpdateOrigin(this.species.uuid, this.species.origin)
    }
  }
}

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
