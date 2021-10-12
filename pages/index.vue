<template>
<main>
  <BaseHeader :base-header-model="header"/>

  <div id="loading" v-if="$fetchState.pending">
    <p >Récupération des infos️</p>
  </div>
  <div id="error" v-else-if="$fetchState.error">
    <p >Une erreur est survenue :(</p>
  </div>
  <div id="content" v-else>
    <section id="users">
      <BaseHeader :base-header-model="userStatsHeader" />
    </section>

    <section id="species">
      <BaseHeader :base-header-model="speciesStatsHeader" />
    </section>

    <section id="aquariums">
      <BaseHeader :base-header-model="aquariumsStatsHeader" />
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
    const header: BaseHeaderModel = new BaseHeaderModel('Accueil')
    const userStatsHeader: BaseHeaderModel = new BaseHeaderModel('Stats utilisateurs', 2)
    const speciesStatsHeader: BaseHeaderModel = new BaseHeaderModel('Stats espèces', 2)
    const aquariumsStatsHeader: BaseHeaderModel = new BaseHeaderModel('Stats aquariums', 2)

    return {
      header: header,
      userStatsHeader: userStatsHeader,
      speciesStatsHeader: speciesStatsHeader,
      aquariumsStatsHeader: aquariumsStatsHeader

    }
  }
})
</script>
