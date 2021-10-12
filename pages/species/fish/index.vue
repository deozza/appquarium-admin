<template>
<main>
  <BaseHeader :base-header-model="header" />

  <div id="loading" v-if="$fetchState.pending">
    <p >Récupération des infos️</p>
  </div>
  <div id="error" v-else-if="$fetchState.error">
    <p >Une erreur est survenue :(</p>
  </div>
  <div class="flex-column" id="content" v-else>
    <table class="table">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Nom scientifique</th>
        <th scope="col">Etat</th>
        <th scope="col">Créé le</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(fish, index) in listOfFishes" v-bind:key="index">
        <th scope="row">{{index + 1}}</th>
        <td>
          <a :href="computeLinkToFish(fish)">{{computeScientificName(fish.species_naming)}}</a>
        </td>
        <td>{{fish.publication_state}}</td>
        <td>{{fish.created_at | date }}</td>
      </tr>
      </tbody>
    </table>

    <div class="flex-row flex-around">
      <a href="/species/fish/add">
        <BaseButton :base-button-model="addFishButton" />
      </a>
    </div>

  </div>
</main>
</template>

<script lang="ts">
import Vue from 'vue'
import BaseStats from "~/components/molecules/pages/index/stats/BaseStats.vue";
import BaseHeaderModel from "~/components/atoms/typography/header/BaseHeaderModel";
import BaseHeader from "~/components/atoms/typography/header/BaseHeader.vue";
import Result from "~/app/utils/useCasesResult/Result";
import FishUseCase from "~/app/species/fish/useCases/UseCase";
import BaseButtonModel from "~/components/atoms/button/BaseButtonModel";
import BaseButton from "~/components/atoms/button/BaseButton.vue";

export default Vue.extend({
  middleware: 'authenticated',
  components: {
    BaseHeader,
    BaseButton
  },
  data(){
    const header: BaseHeaderModel = new BaseHeaderModel('Dashboard poissons', 1)
    const listOfFishes: Array<string> = []
    const addFishButton: BaseButtonModel = new BaseButtonModel('Ajouter un poisson', 'info', 'button')

    return {
      header: header,
      addFishButton: addFishButton,
      listOfFishes: listOfFishes
    }
  },
  async fetch(){
    const jwt: string = this.$cookies.get('appquarium-jwt')
    const fishUseCase: FishUseCase = new FishUseCase()

    const listOfFishes: Result = await fishUseCase.getListOfFishes(jwt)
    if(listOfFishes.isSuccessful()){
      this.listOfFishes = listOfFishes.content
    }

  },
  methods: {
    computeScientificName(speciesNaming: Array<string>): string {
      return speciesNaming.species_family.name + ' ' + speciesNaming.name
    },
    computeLinkToFish(fish: Array<string>): string {
      return '/species/fish/'+fish.uuid
    }
  }
})
</script>

<style scoped>
div#content {
  width: 100%;
}

div#content > table {
  width: 90%;
  margin-bottom: 64px;
}

div#content > div.flex-row {
  width: 70%;
}
</style>
