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
        <th scope="col">Type</th>
        <th scope="col">Etat</th>
        <th scope="col">Créé le</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(species, index) in listOfSpecies" v-bind:key="index">
        <th scope="row">{{index + 1}}</th>
        <td>
          <a :href="species.computeLinkToSpecies()">{{species.computeName()}}</a>
        </td>
        <td>{{species.category}}</td>
        <td>{{species.publication_state}}</td>
        <td>{{species.created_at }}</td>
      </tr>
      </tbody>
    </table>

    <div class="flex-row flex-around">
      <a href="/species/fish/add">
        <BaseButton :base-button-model="addFishButton" />
      </a>
      <a href="/species/plant/add">
        <BaseButton :base-button-model="addPlantButton" />
      </a>
      <a href="/species/invertebrate/add">
        <BaseButton :base-button-model="addInvertebrateButton" />
      </a>
    </div>

  </div>
</main>
</template>

<script lang="ts">
import Vue from 'vue'
import BaseButtonModel from "~/components/atoms/button/BaseButtonModel";
import BaseButton from "~/components/atoms/button/BaseButton.vue";
import BaseHeaderModel from "~/components/atoms/typography/header/BaseHeaderModel";
import BaseHeader from "~/components/atoms/typography/header/BaseHeader.vue";
import SpeciesUseCase from "~/app/species/global/useCases/UseCase";
import Result from "~/app/utils/useCasesResult/Result";
import Species from "~/app/species/global/entities/Species";

export default Vue.extend({
  middleware: 'authenticated',
  components: {
    BaseHeader,
    BaseButton
  },
  data(){
    const header: BaseHeaderModel = new BaseHeaderModel('Dashboard espèces', 1)
    const addFishButton: BaseButtonModel = new BaseButtonModel('Ajouter un poisson', 'info', 'button')
    const addPlantButton: BaseButtonModel = new BaseButtonModel('Ajouter une plante', 'success', 'button')
    const addInvertebrateButton: BaseButtonModel = new BaseButtonModel('Ajouter un invertébré', 'warning', 'button')

    const listOfSpecies: Array<Species> = []
    return {
      header: header,
      addFishButton: addFishButton,
      addPlantButton: addPlantButton,
      addInvertebrateButton: addInvertebrateButton,
      listOfSpecies: listOfSpecies
    }
  },
  async fetch(){
    const jwt: string = this.$cookies.get('appquarium-jwt')
    const speciesUseCase: SpeciesUseCase = new SpeciesUseCase()

    const listOfSpecies: Result = await speciesUseCase.getListOfSpecies(jwt)

    if(listOfSpecies.isSuccessful()){
      listOfSpecies.content.forEach((item: Species) => this.listOfSpecies.push(item))
    }

  },
  methods: {

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
