<template>
<main>
  <div class="flex-column">
    <p v-if="$fetchState.pending">Récupération des infos️</p>
    <p v-else-if="$fetchState.error">Une erreur est survenue :(</p>
    <section v-else id="stats">
      <BaseHeader :base-header-model="header"/>

    </section>
  </div>
</main>
</template>

<script lang="ts">
import Vue from 'vue'
import BaseStatsModel from "~/components/molecules/pages/index/stats/BaseStatsModel";
import BaseStats from "~/components/molecules/pages/index/stats/BaseStats.vue";
import BaseHeaderModel from "~/components/atoms/typography/header/BaseHeaderModel";
import BaseHeader from "~/components/atoms/typography/header/BaseHeader.vue";
import Result from "~/app/utils/useCasesResult/Result";
import SpeciesUseCase from "~/app/species/global/useCases/UseCase";
import UserUseCase from "~/app/user/useCases/UseCase";
import FishUseCase from "~/app/species/fish/useCases/UseCase";

export default Vue.extend({
  middleware: 'authenticated',
  components: {
    BaseHeader,
    BaseStats
  },
  data(){
    const header: BaseHeaderModel = new BaseHeaderModel('Dashboard poissons', 1)
    const listOfFishes: Array<string> = []

    return {
      header: header,
      listOfFishes
    }
  },
  async fetch(){
    const jwt: string = this.$cookies.get('appquarium-jwt')
    const fishUseCase: FishUseCase = new FishUseCase()

    const listOfFishes: Result = await fishUseCase.getListOfFishes()
    if(listOfFishes.isSuccessful()){
      this.listOfFishes = listOfFishes.content
    }

    const speciesUseCase: SpeciesUseCase = new SpeciesUseCase()

    const totalSpecies: Result = await speciesUseCase.getTotalSpecies(jwt)
    if(totalSpecies.isSuccessful()){
      this.stats.speciesStats.stat = totalSpecies.content
    }

  }
})
</script>

<style scoped>
main > div.flex-column {
  min-height: 100vh;
}

main > div.flex-column > section#stats,
main > div.flex-column > section#stats > div.flex-row{
  width: 90vw;
}

main > div.flex-column > section#stats > h2{
  margin-left: 12px;
}
</style>
