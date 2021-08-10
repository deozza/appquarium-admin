<template>
<main>
species
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

    return {
    }
  },
})
</script>

<style scoped>

</style>
