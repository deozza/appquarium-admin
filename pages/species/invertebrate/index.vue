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
      <tr v-for="(invertebrate, index) in listOfInvertebrates" v-bind:key="index">
        <th scope="row">{{index + 1}}</th>
        <td>
          <a :href="'pouet'">pouet</a>
        </td>
        <td>{{invertebrate.publication_state}}</td>
        <td>{{invertebrate.created_at | date }}</td>
      </tr>
      </tbody>
    </table>

    <div class="flex-row flex-around">
      <a href="/species/invertebrate/add">
        <BaseButton :base-button-model="addInvertebrateButton" />
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

export default Vue.extend({
  middleware: 'authenticated',
  components: {
    BaseHeader,
    BaseButton
  },
  data(){
    const header: BaseHeaderModel = new BaseHeaderModel('Dashboard invertébrés', 1)
    const listOfInvertebrates: Array<Species> = []
    const addInvertebrateButton: BaseButtonModel = new BaseButtonModel('Ajouter un invertébré', 'success', 'button')

    return {
      header: header,
      addInvertebrateButton: addInvertebrateButton,
      listOfInvertebrates: listOfInvertebrates
    }
  },
  async fetch(){
    const jwt: string = this.$cookies.get('appquarium-jwt')
    const invertebrateUseCase: InvertebrateUseCase = new InvertebrateUseCase()

    const listOfInvertebrates: Result = await invertebrateUseCase.getListOfInvertebrates(jwt)
    if(listOfInvertebrates.isSuccessful()){
      this.listOfInvertebrates = listOfInvertebrates.content
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
