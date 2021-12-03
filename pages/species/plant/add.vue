<template>
  <main>
    <div class="flex-column" id="add">
      <BaseCard>
        <template slot="header">
          <BaseHeader :base-header-model="header"/>
        </template>
        <template slot="body">
          <NamingForm :jwt="jwt" :species="newPlant"/>
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
import User from "~/app/user/entities/User";
import BaseCard from "~/components/molecules/card/BaseCard.vue";
import NamingForm from "~/components/molecules/speciesForm/NamingForm.vue";
import Species from "~/app/species/global/entities/Species";

export default Vue.extend({
  middleware: 'authenticated',
  components: {
    BaseHeader,
    BaseButton,
    BaseCard,
    NamingForm
  },
  data() {
    const header: BaseHeaderModel = new BaseHeaderModel("Ajouter une espèce de plante")

    const jwt: string = this.$cookies.get('appquarium-jwt')
    const user: User = new User(jwt)

    let newPlant = new Species([])
    newPlant.category = 'plant'
    newPlant.user = user.uid
    newPlant.publication_state = 'DRAFT'
    newPlant.species_naming.species_family.category = 'plant'
    newPlant.species_naming.species_family.user = user.uid
    newPlant.species_naming.species_genre.category = 'plant'
    newPlant.species_naming.species_genre.user = user.uid

    return {
      header: header,
      newPlant: newPlant,
      jwt: jwt
    }
  },
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
