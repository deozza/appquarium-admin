<template>
<main>
  <div class="flex-column" id="add">
    <BaseCard>
      <template slot="header">
        <BaseHeader :base-header-model="header" />
      </template>
      <template slot="body">
        <NamingForm :jwt="jwt" :species="newFish" />
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
import Species from "~/app/species/global/entities/Species";
import NamingForm from "~/components/molecules/speciesForm/NamingForm.vue";
import FishUseCase from "~/app/species/fish/useCases/UseCase";

export default Vue.extend({
  middleware: 'authenticated',
  components: {
    BaseHeader,
    BaseButton,
    BaseCard,
    NamingForm
  },
  data(){
    const header: BaseHeaderModel = new BaseHeaderModel("Ajouter une espèce de poisson", 1)

    const jwt: string = this.$cookies.get('appquarium-jwt')
    const user: User = new User(jwt)
    const fishUseCase: FishUseCase = new FishUseCase()
    const newFish: Species = fishUseCase.initNewFish(user)

    return {
      header: header,
      newFish: newFish,
      jwt: jwt
    }
  },
})
</script>

<style scoped>

</style>
