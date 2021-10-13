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
    <BaseCard>
      <template slot="body">
        <table>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nom scientifique</th>
              <th scope="col">Etat</th>
              <th scope="col">Créé le</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(plant, index) in listOfPlants" v-bind:key="index">
              <td>{{index + 1}}</td>
              <td>
                <a :href="computeLinkToSpecies(plant)">{{computeName(plant)}}</a>
              </td>
              <td>{{plant.publication_state}}</td>
              <td>{{plant.created_at }}</td>
            </tr>
          </tbody>
        </table>
      </template>
    </BaseCard>
    <div class="flex-row flex-around">
      <a href="/species/plant/add">
        <BaseButton :base-button-model="addPlantButton" />
      </a>
    </div>

  </div>
</main>
</template>

<script lang="ts">
import Vue from 'vue'
import BaseHeaderModel from "~/components/atoms/typography/header/BaseHeaderModel";
import BaseHeader from "~/components/atoms/typography/header/BaseHeader.vue";
import Result from "~/app/utils/useCasesResult/Result";
import BaseButtonModel from "~/components/atoms/button/BaseButtonModel";
import BaseButton from "~/components/atoms/button/BaseButton.vue";
import PlantUseCase from "~/app/species/plant/useCases/UseCase";
import Species from "~/app/species/global/entities/Species";
import BaseCard from "~/components/molecules/card/BaseCard.vue";

export default Vue.extend({
  middleware: 'authenticated',
  components: {
    BaseHeader,
    BaseButton,
    BaseCard
  },
  data(){
    const header: BaseHeaderModel = new BaseHeaderModel('Dashboard plantes', 1)
    const listOfPlants: Array<Species> = []
    const addPlantButton: BaseButtonModel = new BaseButtonModel('Ajouter une plante', 'success', 'button')

    return {
      header: header,
      addPlantButton: addPlantButton,
      listOfPlants: listOfPlants
    }
  },
  async fetch(){
    const jwt: string = this.$cookies.get('appquarium-jwt')
    const plantUseCase: PlantUseCase = new PlantUseCase()

    const listOfPlants: Result = await plantUseCase.getListOfPlants(jwt)
    if(listOfPlants.isSuccessful()){
      listOfPlants.content.forEach((item: Species) => this.listOfPlants.push(item))
    }

  },
  methods : {
    computeLinkToSpecies(species: Species): string {
      return '/species/'+species.category+'/'+species.uuid
    },
    computeName(species: Species): string{
      if(species.species_naming !== null && species.species_naming.species_genre !== null){
        return species.species_naming.species_genre?.name + " " + species.species_naming.name
      }
      return 'NA'
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
