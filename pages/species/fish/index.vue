<template>
  <main>
    <BaseHeader :base-header-model="header"/>

    <div id="loading" v-if="$fetchState.pending">
      <p>Récupération des infos️</p>
    </div>
    <div id="error" v-else-if="$fetchState.error">
      <p>Une erreur est survenue :(</p>
    </div>
    <div class="flex-column" id="content" v-else>
      <BaseCard>
        <template slot="header">
          <BaseHeader :base-header-model="allFishesCardHeader"/>
        </template>
        <template slot="body">
          <table>
            <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nom scientifique</th>
              <th scope="col">Etat</th>
              <th scope="col">Créé le</th>
              <th scope="col">Modifié le</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(fish, index) in listOfFishes" v-bind:key="index">
              <td>{{ index + 1 }}</td>
              <td>
                <a :href="fish | speciesComputedLink">{{ fish.species_naming | speciesComputedName }}</a>
              </td>
              <td>{{ fish.publication_state }}</td>
              <td>{{ fish.updated_at | date }}</td>
              <td>{{ fish.created_at | date }}</td>
            </tr>
            </tbody>
          </table>
        </template>
      </BaseCard>

      <div class="flex-row flex-around">
        <a href="/species/fish/add">
          <BaseButton :base-button-model="addFishButton"/>
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
import FishUseCase from "~/app/species/fish/useCases/UseCase";
import BaseButtonModel from "~/components/atoms/button/BaseButtonModel";
import BaseButton from "~/components/atoms/button/BaseButton.vue";
import Species from "~/app/species/global/entities/Species";
import BaseCard from "~/components/molecules/card/BaseCard.vue";

export default Vue.extend({
  middleware: 'authenticated',
  components: {
    BaseHeader,
    BaseButton,
    BaseCard
  },
  data() {
    const header: BaseHeaderModel = new BaseHeaderModel('Dashboard poissons')
    const allFishesCardHeader = new BaseHeaderModel('Tous les poissons')
    allFishesCardHeader.setSizeOrThrowError(2)

    const listOfFishes: Array<Species> = []
    const addFishButton: BaseButtonModel = new BaseButtonModel('Ajouter un poisson')
    addFishButton.setStyleOrThrowError('success')
    addFishButton.setTypeOrThrowError('button')

    return {
      header: header,
      allFishesCardHeader: allFishesCardHeader,
      addFishButton: addFishButton,
      listOfFishes: listOfFishes
    }
  },
  async fetch() {
    const jwt: string = this.$cookies.get('appquarium-jwt')
    const fishUseCase: FishUseCase = new FishUseCase()

    const listOfFishes: Result = await fishUseCase.getListOfFishes(jwt)
    if (listOfFishes.isSuccessful()) {
      listOfFishes.content.forEach((item: Species) => this.listOfFishes.push(item))
    }

  }
})
</script>

<style scoped>

</style>
