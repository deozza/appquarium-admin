<template>
  <main>
    <div id="loading" v-if="$fetchState.pending">
      <p>Récupération des infos️</p>
    </div>
    <div id="error" v-else-if="$fetchState.error">
      <p>Une erreur est survenue :(</p>
    </div>

    <form v-on:submit.prevent="submitNamingForm()" v-else>
      <div class="flex-column">
        <ul>
          <li class="flex-column">
            <div class="flex-row input-row">
              <label for="speciesFamily">Famille <span class="required-field">*</span></label>
              <input type="text" id="speciesFamily" name="speciesFamily" list="speciesFamily-list"
                     v-model="species.species_naming.species_family.name"
                     v-on:change="linkUuidWithSpeciesFamily(species.species_naming.species_family.name)">
              <datalist id="speciesFamily-list">
                <option v-for="(family, index) in speciesFamilies" :value="family.name" v-bind:key="index">
                  {{ family.name }}
                </option>
              </datalist>
            </div>
          </li>
          <li class="flex-column">
            <div class="flex-row input-row">
              <label for="speciesGenre">Genre <span class="required-field">*</span></label>
              <input type="text" id="speciesGenre" name="speciesGenre" list="speciesGenre-list"
                     v-model="species.species_naming.species_genre.name"
                     v-on:change="linkUuidWithSpeciesGenre(species.species_naming.species_genre.name)">
              <datalist id="speciesGenre-list">
                <option v-for="(genre, index) in speciesGenres" :value="genre.name" v-bind:key="index">
                  {{ genre.name }}
                </option>
              </datalist>
            </div>
          </li>
          <li class="flex-column">
            <div class="flex-row input-row">
              <label for="speciesName">Nom de l'espèce <span class="required-field">*</span></label>
              <input type="text" id="speciesName" v-model="species.species_naming.name">
            </div>
          </li>
          <li class="flex-column">
            <div class="flex-row input-row">
              <label>Noms communs</label>
              <div class="flex-column flex-left">
                <ul>
                  <li v-for="(name, index) in commonNames">
                    <input  type="text" v-model="name.value" v-bind:key="index">
                    <i class="fas fa-trash-alt" style="color: red" v-on:click="removeCommonName(index)"></i>
                  </li>
                  <li>
                    <input id="commonName" type="text" v-model="commonName" v-on:focusout="addCommonName()">
                  </li>
                </ul>
              </div>
            </div>
          </li>

          <li class="flex-column">
            <div class="flex-row input-row">
              <label>Anciens noms</label>
              <div class="flex-column flex-left">
                <ul>
                  <li v-for="(name, index) in oldNames">
                    <input  type="text" v-model="name.value" v-bind:key="index">
                    <i class="fas fa-trash-alt" style="color: red" v-on:click="removeOldName(index)"></i>
                  </li>
                  <li>
                    <input id="oldName" type="text" v-model="oldName" v-on:focusout="addOldName()">
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
        <BaseButton :base-button-model="submitButton"/>
        <BaseParagraph :base-paragraph-model="paragraphSuccess" v-if="queryState === 'success'" />
        <BaseParagraph :base-paragraph-model="paragraphError" v-if="queryState === 'error'" />
      </div>
    </form>
  </main>

</template>

<script lang="ts">
import Vue from 'vue'

import Species from "~/app/species/global/entities/Species";
import BaseButtonModel from "~/components/atoms/button/BaseButtonModel";
import BaseButton from "~/components/atoms/button/BaseButton.vue";
import SpeciesGenre from "~/app/species/global/entities/SpeciesGenre";
import SpeciesFamily from "~/app/species/global/entities/SpeciesFamily";
import FishUseCase from "~/app/species/fish/useCases/UseCase";
import Result from "~/app/utils/useCasesResult/Result";
import SpeciesUseCase from "~/app/species/global/useCases/UseCase";
import User from "~/app/user/entities/User";
import BaseParagraphModel from "~/components/atoms/typography/paragraph/BaseParagraphModel";
import BaseParagraph from "~/components/atoms/typography/paragraph/BaseParagraph.vue";

export default Vue.extend({
  name: "NamingFormVue",
  components: {
    BaseButton,
    BaseParagraph
  },
  props: {
    species: {
      type: Species,
      required: true
    },
    jwt: {
      type: String,
      required: true
    }
  },
  computed: {
    commonNames(): Array<object>{
      let names: Array<object> = []
      for(let commonName in this.species.species_naming.common_names){
        names.push({value: this.species.species_naming.common_names[commonName]})
      }
      return names
    },
    oldNames(): Array<object>{
      let names: Array<object> = []
      for(let oldName in this.species.species_naming.old_names){
        names.push({value: this.species.species_naming.old_names[oldName]})
      }
      return names
    },
  },
  data() {
    const submitButton: BaseButtonModel = new BaseButtonModel('Ajouter')
    submitButton.setStyleOrThrowError('success')

    if (this.species.species_naming.uuid !== '') {
      submitButton.content = 'Modifier'
      submitButton.style = 'warning'
    }

    const paragraphSuccess: BaseParagraphModel = new BaseParagraphModel('Modification réussie <i class="fa fa-check"></i>')
    const paragraphError: BaseParagraphModel = new BaseParagraphModel('Une erreur est survenue, veuillez réessayer plus tard')
    paragraphError.setStyleOrThrowError('danger')


    const speciesGenres: Array<SpeciesGenre> = []
    const speciesFamilies: Array<SpeciesFamily> = []


    return {
      submitButton: submitButton,
      paragraphSuccess: paragraphSuccess,
      paragraphError: paragraphError,
      speciesFamilies: speciesFamilies,
      speciesGenres: speciesGenres,
      commonName: '',
      oldName: '',
      queryState: ''
    }
  },
  async fetch() {

    const fishUseCase: FishUseCase = new FishUseCase()

    const speciesGenres: Result = await fishUseCase.getFishGenres(this.jwt)
    if (speciesGenres.isFailed()) {
      for (const error of speciesGenres.errors) {
        if (error.code === 401) {
          this.$cookies.remove('appquarium-jwt')
          await this.$router.push('/login')
        }
      }
      return
    }
    this.speciesGenres = speciesGenres.content

    const speciesFamilies: Result = await fishUseCase.getFishFamilies(this.jwt)
    if (speciesFamilies.isFailed()) {
      for (const error of speciesFamilies.errors) {
        if (error.code === 401) {
          this.$cookies.remove('appquarium-jwt')
          await this.$router.push('/login')
        }
      }
      return
    }
    this.speciesFamilies = speciesFamilies.content
  },
  methods: {
    addCommonName(): void{
      if(this.commonName === ''){
        return
      }
      this.species.species_naming.common_names.push(this.commonName)
      this.commonName = ''
    },
    removeCommonName(index: number): void {
      this.species.species_naming.common_names.splice(index, 1)
    },
    addOldName(): void{
      if(this.oldName === ''){
        return
      }
      this.species.species_naming.old_names.push(this.oldName)
      this.oldName = ''
    },
    removeOldName(index: number): void {
      this.species.species_naming.old_names.splice(index, 1)
    },
    async submitNamingForm() {
      this.submitButton.isLoading = true
      this.queryState = ''

      const speciesUseCase: SpeciesUseCase = new SpeciesUseCase()

      let result: Result
      if (this.species.uuid !== '') {
        result = await speciesUseCase.updateSpeciesNaming(this.jwt, this.species)
      } else {
        const user: User = new User(this.jwt)
        this.species.user = user.uid

        result = await speciesUseCase.createSpecies(this.jwt, this.species)
      }

      if (result.isFailed()) {
        console.log(result.errors)
        this.queryState = 'error'

      }

      if (result.success?.code === 201) {
        this.species.uuid = result.content
        await this.$router.push(this.species.computeLinkToSpecies())
      }

      if (result.success?.code === 200) {
        this.submitButton.style = 'warning'
        this.submitButton.content = 'Modifier'
        this.queryState = 'success'
      }

      this.submitButton.isLoading = false
    },
    linkUuidWithSpeciesFamily(speciesFamilyName: string) {
      const speciesFamily = this.speciesFamilies.find((family: SpeciesFamily) => family.name === speciesFamilyName)
      if (speciesFamily !== undefined) {
        this.species.species_naming.species_family = speciesFamily
        return
      }
    },
    linkUuidWithSpeciesGenre(speciesGenreName: string) {
      const speciesGenre = this.speciesGenres.find((genre: SpeciesGenre) => genre.name === speciesGenreName)
      if (speciesGenre !== undefined) {
        this.species.species_naming.species_genre = speciesGenre
        return
      }
    }
  }
})

</script>

<style scoped>
form > div.flex-column > ul {
  width: 90%;
}

li {
  margin: 12px 0;
}

li > div.input-row {
  padding: 0.5em;
  align-items: normal;
  width: 98%;
}

li > div.input-row > label {
  flex: 1;
  padding: 0.5em 1em 0.5em 0;
}

@media only screen and (min-width: 1024px) {
  form {
    width: 98%;
    min-height: 33vh;
  }
}

@media only screen and (max-width: 1024px) {
  form {
    width: 80vw;
    height: 80vh;
  }
}
</style>
