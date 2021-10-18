<template>
  <form action="">
    <div class="flex-column">
      <ul>
        <li class="flex-column">
          <div class="flex-row input-row">
            <label for="phMin">pH minimum <span class="required-field">*</span></label>
            <input id="phMin" type="number" step="0.1" min="0" max="14" v-model="species.water_constraints.ph_min">
          </div>
        </li>
        <li class="flex-column">
          <div class="flex-row input-row">
            <label for="phMax">pH maximum <span class="required-field">*</span></label>
            <input id="phMax" type="number" step="0.1" min="0" max="14" v-model="species.water_constraints.ph_max">
          </div>
        </li>
        <li class="flex-column">
          <div class="flex-row input-row">
            <label for="ghMin">GH minimum <span class="required-field">*</span></label>
            <input id="ghMin" type="number" min="0" max="50" v-model="species.water_constraints.gh_min">
          </div>
        </li>
        <li class="flex-column">
          <div class="flex-row input-row">
            <label for="ghMax">GH maximum <span class="required-field">*</span></label>
            <input id="ghMax" type="number" min="0" max="50" v-model="species.water_constraints.gh_max">
          </div>
        </li>
        <li class="flex-column">
          <div class="flex-row input-row">
            <label for="tempMin">Température minimum <span class="required-field">*</span></label>
            <input id="tempMin" type="number" min="0" max="40" v-model="species.water_constraints.temp_min">
          </div>
        </li>
        <li class="flex-column">
          <div class="flex-row input-row">
            <label for="tempMax">Température maximum <span class="required-field">*</span></label>
            <input id="tempMax" type="number" min="0" max="40" v-model="species.water_constraints.temp_max">
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
  name: "WaterConstraintsFormVue",
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
    if(this.species.water_constraints.uuid !== ''){
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
