<template>
<main>
  <div class="flex-column">
    <p v-if="$fetchState.pending">Récupération des infos️</p>
    <p v-else-if="$fetchState.error">Une erreur est survenue :(</p>
    <section v-else id="stats">
      <BaseHeader :base-header-model="header"/>
      <div class="flex-row flex-around">
        <BaseStats v-for="(stat, index) in stats" :base-stats-modele="stat" v-bind:key="index"/>
      </div>
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

export default Vue.extend({
  middleware: 'authenticated',
  components: {
    BaseHeader,
    BaseStats
  },
  data(){
    const header: BaseHeaderModel = new BaseHeaderModel('Stats', 2)
    const userStats: BaseStatsModel = new BaseStatsModel('Utilisateurs',['fa fa-users fa-3x'],  0, '/users')
    const speciesStats: BaseStatsModel = new BaseStatsModel('Espèces',['fa fa-fish fa-3x'],  0, '/species')
    const aquariumStats: BaseStatsModel = new BaseStatsModel('Aquariums',['fas fa-fish fa-stack-1x', 'far fa-square fa-stack-2x'],  0, '/aquariums')

    const stats = {
      userStats: userStats,
      speciesStats: speciesStats,
      aquariumStats: aquariumStats
    }

    return {
      header: header,
      stats: stats
    }
  },
  async fetch(){
    const userUseCase: UserUseCase = new UserUseCase(null)
    const jwt: string = this.$cookies.get('appquarium-jwt')

    const totalUsers: Result = await userUseCase.getTotalUsers(jwt)
    if(totalUsers.isSuccessful()){
      this.stats.userStats.stat = totalUsers.content
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
