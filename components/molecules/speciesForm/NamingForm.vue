<template>
  <form action="">
    <div class="flex-column">
      <ul>
        <li class="flex-column">
          <div class="flex-row input-row">
            <label for="speciesFamily">Famille <span class="required-field">*</span></label>
            <input id="speciesFamily" type="text" v-model="species.species_naming.species_family.name">
          </div>
        </li>
        <li class="flex-column">
          <div class="flex-row input-row">
            <label for="speciesGenre">Genre <span class="required-field">*</span></label>
            <input id="speciesGenre" type="text" v-model="species.species_naming.species_genre.name">
          </div>
        </li>
        <li class="flex-column">
          <div class="flex-row input-row">
            <label for="speciesName">Nom de l'espèce <span class="required-field">*</span></label>
            <input type="text" id="speciesName" v-model="species.species_naming.name">
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

export default {
  name: "NamingFormVue",
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
    if(this.species.species_naming.uuid !== ''){
      submitButton.content = 'Modifier'
      submitButton.style = 'warning'
    }

    return {
      submitButton: submitButton
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
