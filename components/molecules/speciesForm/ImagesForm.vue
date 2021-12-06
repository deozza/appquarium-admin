<template>
  <form>

    <img v-for="(image, index) in species.images" :src="image.url" alt="" v-bind:key="index">
  </form>
</template>

<script lang="ts">
import Vue from 'vue'

import Species from "~/app/species/global/entities/Species";
import BaseButtonModel from "~/components/atoms/button/BaseButtonModel";
import BaseButton from "~/components/atoms/button/BaseButton.vue";

export default Vue.extend({
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
    const submitButton: BaseButtonModel = new BaseButtonModel('Ajouter')
    submitButton.setStyleOrThrowError('success')

    if (this.species.uuid !== '') {
      submitButton.content = 'Modifier'
      submitButton.style = 'warning'
    }

    return {
      submitButton: submitButton,
    }
  },
  async fetch() {
    //const jwt: string = this.$cookies.get('appquarium-jwt')
    //const speciesUseCase: SpeciesUseCase = new SpeciesUseCase()
  },
  methods: {
    async submitGeneralInfoForm() {
      this.submitButton.isLoading = true


      //const updatedSpecies = await speciesUseCase.addOrUpdateOrigin(this.species.uuid, this.species.origin)
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
