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
            <tr v-for="(invertebrate, index) in listOfInvertebrates" v-bind:key="index">
              <td>{{ index + 1 }}</td>
              <td>
                <a :href="invertebrate | speciesComputedLink">{{
                    invertebrate.species_naming | speciesComputedName
                  }}</a>
              </td>
              <td>{{ invertebrate.publication_state }}</td>
              <td>{{ invertebrate.created_at | date }}</td>
              <td>{{ invertebrate.updated_at | date }}</td>
            </tr>
            </tbody>
          </table>
        </template>
      </BaseCard>

      <div class="flex-row flex-around">
        <a href="/species/invertebrate/add">
          <BaseButton :base-button-model="addInvertebrateButton"/>
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
import InvertebrateUseCase from "~/app/species/invertebrate/useCases/UseCase";
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
    const header: BaseHeaderModel = new BaseHeaderModel('Dashboard invertébrés')
    const listOfInvertebrates: Array<Species> = []
    const addInvertebrateButton: BaseButtonModel = new BaseButtonModel('Ajouter un invertébré')
    addInvertebrateButton.setStyleOrThrowError('success')
    addInvertebrateButton.setTypeOrThrowError('button')

    return {
      header: header,
      addInvertebrateButton: addInvertebrateButton,
      listOfInvertebrates: listOfInvertebrates
    }
  },
  async fetch() {
    const jwt: string = this.$cookies.get('appquarium-jwt')
    const invertebrateUseCase: InvertebrateUseCase = new InvertebrateUseCase()

    const listOfInvertebrates: Result = await invertebrateUseCase.getListOfInvertebrates(jwt)
    if (listOfInvertebrates.isSuccessful()) {
      listOfInvertebrates.content.forEach((item: Species) => this.listOfInvertebrates.push(item))
    }

  },
  methods: {
    computeLinkToSpecies(species: Species): string {
      return '/species/' + species.category + '/' + species.uuid
    },
    computeName(species: Species): string {
      if (species.species_naming !== null && species.species_naming.species_genre !== null) {
        return species.species_naming.species_genre?.name + " " + species.species_naming.name
      }
      return 'NA'
    }
  }
})
</script>

<style scoped>

</style>
