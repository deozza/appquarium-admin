<template>
  <main>
    <div id="loading" v-if="$fetchState.pending">
      <p >Récupération des infos️</p>
    </div>
    <div id="error" v-else-if="$fetchState.error">
      <p >Une erreur est survenue :(</p>
    </div>
    <div class="flex-column" id="content" v-else>
      <section id="title" class="flex-row">
        <BaseHeader :base-header-model="header"> <BaseBadge :base-badge-model="statusBadge" /></BaseHeader>
      </section>
      <section id="cards" class="flex-row flex-around">

        <BaseCard>
          <template slot="header">
            <BaseHeader :base-header-model="generalCardHeader"/>
          </template>
          <template slot="body">
            <GeneralInfoForm :jwt="jwt" :species="invertebrate" />
          </template>
        </BaseCard>

        <BaseCard>
          <template slot="header">
            <BaseHeader :base-header-model="namingCardHeader"/>
          </template>
          <template slot="body">
            <NamingForm :jwt="jwt" :species="invertebrate" />
          </template>
        </BaseCard>

        <BaseCard>
          <template slot="header">
            <BaseHeader :base-header-model="waterConstraintsCardHeader"/>
          </template>
          <template slot="body">
            <WaterConstraintsForm :jwt="jwt" :species="invertebrate" />
          </template>
        </BaseCard>

        <BaseCard>
          <template slot="header">
            <BaseHeader :base-header-model="animalSpecsCardHeader"/>
          </template>
          <template slot="body">
            <AnimalSpecsForm :species="invertebrate" :jwt="jwt"/>
          </template>
        </BaseCard>

        <BaseCard>
          <template slot="footer">
            <PublicationActions  v-if="isUpdatingPublicationState === false" :publication-state="invertebrate.publication_state"/>
            <div v-else class="flex-row flex-around" >
              <i class="fas fa-spinner fa-spin fa-5x"></i>
            </div>
          </template>
        </BaseCard>
      </section>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import BaseHeaderModel from "~/components/atoms/typography/header/BaseHeaderModel";
import Species from "~/app/species/global/entities/Species";
import SpeciesUseCase from "~/app/species/global/useCases/UseCase";
import Result from "~/app/utils/useCasesResult/Result";
import BaseCard from "~/components/molecules/card/BaseCard.vue";
import BaseButton from "~/components/atoms/button/BaseButton.vue";
import BaseHeader from "~/components/atoms/typography/header/BaseHeader.vue";
import BaseParagraph from "~/components/atoms/typography/paragraph/BaseParagraph.vue";
import GeneralInfoForm from "~/components/molecules/speciesForm/GeneralInfoForm.vue";
import NamingForm from "~/components/molecules/speciesForm/NamingForm.vue";
import WaterConstraintsForm from "~/components/molecules/speciesForm/WaterConstraintsForm.vue";
import AnimalSpecsForm from "~/components/molecules/speciesForm/AnimalSpecsForm.vue";
import PublicationActions from "~/components/molecules/speciesForm/PublicationActions.vue";
import BaseBadgeModel from "~/components/atoms/badge/BaseBadgeModel";
import BaseBadge from "~/components/atoms/badge/BaseBadge.vue";

export default Vue.extend({
  middleware: 'authenticated',
  components: {
    BaseHeader,
    BaseParagraph,
    BaseButton,
    BaseCard,
    BaseBadge,
    GeneralInfoForm,
    NamingForm,
    WaterConstraintsForm,
    AnimalSpecsForm,
    PublicationActions
  },
  created() {
    this.$nuxt.$on('prePublishClicked', () => this.prePublishInvertebrate())
    this.$nuxt.$on('publishClicked', () => this.publishInvertebrate())
    this.$nuxt.$on('moderateClicked', () => this.moderateInvertebrate())
    this.$nuxt.$on('archiveClicked', () => this.archiveInvertebrate())
    this.$nuxt.$on('deleteClicked', () => this.deleteInvertebrate())
  },
  beforeDestroy() {
    this.$nuxt.$off('prePublishClicked')
    this.$nuxt.$off('publishClicked')
    this.$nuxt.$off('moderateClicked')
    this.$nuxt.$off('archiveClicked')
    this.$nuxt.$off('deleteClicked')
  },
  data(){
    const header: BaseHeaderModel = new BaseHeaderModel("", 1)
    const generalCardHeader: BaseHeaderModel = new BaseHeaderModel("Infos générales", 2)
    const namingCardHeader: BaseHeaderModel = new BaseHeaderModel("Noms", 2)
    const waterConstraintsCardHeader: BaseHeaderModel = new BaseHeaderModel("Contraintes d'eau", 2)
    const animalSpecsCardHeader: BaseHeaderModel = new BaseHeaderModel("Caractéristiques animales", 2)
    const invertebrate: Species = new Species([])
    const jwt: string = this.$cookies.get('appquarium-jwt')

    return {
      header: header,
      generalCardHeader: generalCardHeader,
      namingCardHeader: namingCardHeader,
      waterConstraintsCardHeader: waterConstraintsCardHeader,
      animalSpecsCardHeader: animalSpecsCardHeader,
      invertebrate: invertebrate,
      jwt: jwt,
      isUpdatingPublicationState: false
    }
  },
  computed: {
    statusBadge(): BaseBadgeModel{
      const statusBadge: BaseBadgeModel = new BaseBadgeModel("")

      if(this.invertebrate === undefined || this.invertebrate === null || this.invertebrate.publication_state === ''){
        return statusBadge
      }

      statusBadge.content = this.getPublicationStateContent(this.invertebrate)
      statusBadge.style = this.getPublicationStateStyle(this.invertebrate)

      return statusBadge
    }
  },
  async fetch(){
    const speciesUseCase: SpeciesUseCase = new SpeciesUseCase()
    const params = this.$route.params

    const invertebrate: Result = await speciesUseCase.getSpecies(this.jwt, params.uuid)
    if(invertebrate.isFailed()){
      for(const error of invertebrate.errors) {
        if (error.code === 401) {
          this.$cookies.remove('appquarium-jwt')
          await this.$router.push('/login')
        }

        if(error.code === 404){
          await this.$router.push('/species/invertebrate')
        }
      }
      return
    }

    this.invertebrate = invertebrate.content
    this.header.content = this.invertebrate.computeName()
  },
  methods: {
    getPublicationStateStyle(invertebrate: Species): string {
      const publicationStateStyle: object = {
        'DRAFT': 'secondary',
        'PRE_PUBLISHED': 'info',
        'MODERATED': 'warning',
        'PUBLISHED': 'success',
        'ARCHIVED': 'secondary',
      }

      return publicationStateStyle[invertebrate.publication_state]
    },
    getPublicationStateContent(invertebrate: Species): string {
      const publicationStateContent: object = {
        'DRAFT': 'brouillon',
        'PRE_PUBLISHED': 'pré-publié',
        'MODERATED': 'modéré',
        'PUBLISHED': 'publié',
        'ARCHIVED': 'archivé',
      }

      return publicationStateContent[invertebrate.publication_state]
    },
    async prePublishInvertebrate(){
      this.isUpdatingPublicationState = true
      const speciesUseCase: SpeciesUseCase = new SpeciesUseCase()

      const invertebrate: Result = await speciesUseCase.updatePublicationState(this.jwt, this.invertebrate, 'PRE_PUBLISHED')

      if(invertebrate.isFailed()) {
        for (const error of invertebrate.errors) {

          if (error.code === 401) {
            this.$cookies.remove('appquarium-jwt')
            await this.$router.push('/login')
          }
        }

        console.log(invertebrate.errors)
        return
      }

      this.invertebrate.publication_state = invertebrate.content
      this.isUpdatingPublicationState = false
    },
    async publishInvertebrate(){
      this.isUpdatingPublicationState = true
      const speciesUseCase: SpeciesUseCase = new SpeciesUseCase()

      const invertebrate: Result = await speciesUseCase.updatePublicationState(this.jwt, this.invertebrate, 'PUBLISHED')

      if(invertebrate.isFailed()) {
        for (const error of invertebrate.errors) {

          if (error.code === 401) {
            this.$cookies.remove('appquarium-jwt')
            await this.$router.push('/login')
          }
        }

        console.log(invertebrate.errors)
        return
      }

      this.invertebrate.publication_state = invertebrate.content
      this.isUpdatingPublicationState = false
    },
    async moderateInvertebrate(){
      this.isUpdatingPublicationState = true
      const speciesUseCase: SpeciesUseCase = new SpeciesUseCase()

      const invertebrate: Result = await speciesUseCase.updatePublicationState(this.jwt, this.invertebrate, 'MODERATED')

      if(invertebrate.isFailed()) {
        for (const error of invertebrate.errors) {

          if (error.code === 401) {
            this.$cookies.remove('appquarium-jwt')
            await this.$router.push('/login')
          }
        }

        console.log(invertebrate.errors)
        this.isUpdatingPublicationState = false
        return
      }

      this.invertebrate.publication_state = invertebrate.content
      this.isUpdatingPublicationState = false
    },
    async archiveInvertebrate(){
      this.isUpdatingPublicationState = true
      const speciesUseCase: SpeciesUseCase = new SpeciesUseCase()

      const invertebrate: Result = await speciesUseCase.updatePublicationState(this.jwt, this.invertebrate, 'ARCHIVED')

      if(invertebrate.isFailed()) {
        for (const error of invertebrate.errors) {

          if (error.code === 401) {
            this.$cookies.remove('appquarium-jwt')
            await this.$router.push('/login')
          }
        }

        console.log(invertebrate.errors)
        return
      }

      this.invertebrate.publication_state = invertebrate.content
      this.isUpdatingPublicationState = false
    },
    async deleteInvertebrate(){
      /*

      const speciesUseCase: SpeciesUseCase = new SpeciesUseCase()

      const invertebrate: Result = await speciesUseCase.deleteSpecies(this.jwt, this.invertebrate)

      if(invertebrate.isFailed()) {
        for (const error of invertebrate.errors) {

          if (error.code === 401) {
            this.$cookies.remove('appquarium-jwt')
            await this.$router.push('/login')
          }
        }

        console.log(invertebrate.errors)
        return
      }

      await this.$router.push('/species/invertebrate')
      */

    }
  }
})
</script>

<style scoped>
div#content {
  width: 100%;
}

section#title {
  margin-bottom: 48px;
}

section#cards {
  width: 100%;
}

</style>
