<template>
  <main>
    <BaseHeader :base-header-model="header"/>

    <div id="content">
      <section id="users">
        <BaseHeader :base-header-model="userStatsHeader"/>
      </section>

      <section id="species">
        <BaseHeader :base-header-model="speciesStatsHeader"/>
      </section>

      <section id="aquariums">
        <BaseHeader :base-header-model="aquariumsStatsHeader"/>
      </section>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import BaseHeaderModel from "~/components/atoms/typography/header/BaseHeaderModel";
import BaseHeader from "~/components/atoms/typography/header/BaseHeader.vue";

export default Vue.extend({
  middleware: 'authenticated',
  components: {
    BaseHeader
  },
  data() {
    const header: BaseHeaderModel = new BaseHeaderModel('Accueil')
    const userStatsHeader: BaseHeaderModel = new BaseHeaderModel('Stats utilisateurs')
    userStatsHeader.setSizeOrThrowError(2)

    const speciesStatsHeader: BaseHeaderModel = new BaseHeaderModel('Stats espèces')
    speciesStatsHeader.setSizeOrThrowError(2)

    const aquariumsStatsHeader: BaseHeaderModel = new BaseHeaderModel('Stats aquariums')
    aquariumsStatsHeader.setSizeOrThrowError(2)

    return {
      header: header,
      userStatsHeader: userStatsHeader,
      speciesStatsHeader: speciesStatsHeader,
      aquariumsStatsHeader: aquariumsStatsHeader

    }
  }
})
</script>
