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
        <BaseHeader :base-header-model="header" > <BaseBadge :base-badge-model="statusBadge" /></BaseHeader>
      </section>

      <section id="cards" class="flex-row flex-around">
        <BaseCard>
          <template slot="header">
            <BaseHeader :base-header-model="generalCardHeader"/>
          </template>
          <template slot="body">
            <GeneralInfoForm :species="fish" />
          </template>
        </BaseCard>

        <BaseCard>
          <template slot="header">
            <BaseHeader :base-header-model="namingCardHeader"/>
          </template>
          <template slot="body">
            <NamingForm :jwt="jwt"  :species="fish" />
          </template>
        </BaseCard>

        <BaseCard>
          <template slot="header">
            <BaseHeader :base-header-model="waterConstraintsCardHeader"/>
          </template>
          <template slot="body">
            <WaterConstraintsForm :species="fish" :jwt="jwt"/>
          </template>
        </BaseCard>

        <BaseCard>
          <template slot="header">
            <BaseHeader :base-header-model="animalSpecsCardHeader"/>
          </template>
          <template slot="body">
            <AnimalSpecsForm :species="fish" :jwt="jwt"/>
          </template>
        </BaseCard>

        <BaseCard>
          <template slot="footer">
            <PublicationActions  v-if="isUpdatingPublicationState === false" :publication-state="fish.publication_state"/>
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
import GeneralInfoForm from "~/components/molecules/speciesForm/GeneralInfoForm.vue";
import NamingForm from "~/components/molecules/speciesForm/NamingForm.vue";
import WaterConstraintsForm from "~/components/molecules/speciesForm/WaterConstraintsForm.vue";
import AnimalSpecsForm from "~/components/molecules/speciesForm/AnimalSpecsForm.vue";
import PublicationActions from "~/components/molecules/speciesForm/PublicationActions.vue";
import BaseBadge from "~/components/atoms/badge/BaseBadge.vue";
import BaseBadgeModel from "~/components/atoms/badge/BaseBadgeModel";

export default Vue.extend({
  middleware: 'authenticated',
  components: {
    BaseHeader,
    BaseBadge,
    BaseButton,
    BaseCard,
    GeneralInfoForm,
    NamingForm,
    WaterConstraintsForm,
    AnimalSpecsForm,
    PublicationActions
  },
  created() {
    this.$nuxt.$on('prePublishClicked', () => this.prePublishFish())
    this.$nuxt.$on('publishClicked', () => this.publishFish())
    this.$nuxt.$on('moderateClicked', () => this.moderateFish())
    this.$nuxt.$on('archiveClicked', () => this.archiveFish())
    this.$nuxt.$on('deleteClicked', () => this.deleteFish())
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
    const fish: Species = new Species([])
    const jwt: string = this.$cookies.get('appquarium-jwt')

    return {
      header: header,
      generalCardHeader: generalCardHeader,
      namingCardHeader: namingCardHeader,
      waterConstraintsCardHeader: waterConstraintsCardHeader,
      animalSpecsCardHeader: animalSpecsCardHeader,
      fish: fish,
      jwt: jwt,
      isUpdatingPublicationState: false
    }
  },
  async fetch(){
    const speciesUseCase: SpeciesUseCase = new SpeciesUseCase()
    const params = this.$route.params

    const fish: Result = await speciesUseCase.getSpecies(this.jwt, params.uuid)
    if(fish.isFailed()){
      for(const error of fish.errors) {
        if (error.code === 401) {
          this.$cookies.remove('appquarium-jwt')
          await this.$router.push('/login')
        }

        if(error.code === 404){
          await this.$router.push('/species/fish')
        }
      }
      console.log(fish.errors)
      return
    }

    this.fish = fish.content
    this.header.content = this.fish.computeName()
  },
  computed: {
    statusBadge(): BaseBadgeModel{
      const statusBadge: BaseBadgeModel = new BaseBadgeModel("")

      if(this.fish === undefined || this.fish === null || this.fish.publication_state === ''){
        return statusBadge
      }

      statusBadge.content = this.getPublicationStateContent(this.fish)
      statusBadge.style = this.getPublicationStateStyle(this.fish)

      return statusBadge
    }
  },
  methods: {
    getPublicationStateStyle(fish: Species): string {
      const publicationStateStyle: object = {
        'DRAFT': 'secondary',
        'PRE_PUBLISHED': 'info',
        'MODERATED': 'warning',
        'PUBLISHED': 'success',
        'ARCHIVED': 'secondary',
      }

      return publicationStateStyle[fish.publication_state]
    },
     getPublicationStateContent(fish: Species): string {
      const publicationStateContent: object = {
        'DRAFT': 'brouillon',
        'PRE_PUBLISHED': 'pré-publié',
        'MODERATED': 'modéré',
        'PUBLISHED': 'publié',
        'ARCHIVED': 'archivé',
      }

      return publicationStateContent[fish.publication_state]
    },
    async prePublishFish(){
      this.isUpdatingPublicationState = true
      const speciesUseCase: SpeciesUseCase = new SpeciesUseCase()

      const fish: Result = await speciesUseCase.updatePublicationState(this.jwt, this.fish, 'PRE_PUBLISHED')

      if(fish.isFailed()) {
        for (const error of fish.errors) {

          if (error.code === 401) {
            this.$cookies.remove('appquarium-jwt')
            await this.$router.push('/login')
          }
        }

        console.log(fish.errors)
        return
      }

      this.fish.publication_state = fish.content
      this.isUpdatingPublicationState = false
    },
    async publishFish(){
      this.isUpdatingPublicationState = true
      const speciesUseCase: SpeciesUseCase = new SpeciesUseCase()

      const fish: Result = await speciesUseCase.updatePublicationState(this.jwt, this.fish, 'PUBLISHED')

      if(fish.isFailed()) {
        for (const error of fish.errors) {

          if (error.code === 401) {
            this.$cookies.remove('appquarium-jwt')
            await this.$router.push('/login')
          }
        }

        console.log(fish.errors)
        return
      }

      this.fish.publication_state = fish.content
      this.isUpdatingPublicationState = false
    },
    async moderateFish(){
      this.isUpdatingPublicationState = true
      const speciesUseCase: SpeciesUseCase = new SpeciesUseCase()

      const fish: Result = await speciesUseCase.updatePublicationState(this.jwt, this.fish, 'MODERATED')

      if(fish.isFailed()) {
        for (const error of fish.errors) {

          if (error.code === 401) {
            this.$cookies.remove('appquarium-jwt')
            await this.$router.push('/login')
          }
        }

        console.log(fish.errors)
        this.isUpdatingPublicationState = false
        return
      }

      this.fish.publication_state = fish.content
      this.isUpdatingPublicationState = false
    },
    async archiveFish(){
      this.isUpdatingPublicationState = true
      const speciesUseCase: SpeciesUseCase = new SpeciesUseCase()

      const fish: Result = await speciesUseCase.updatePublicationState(this.jwt, this.fish, 'ARCHIVED')

      if(fish.isFailed()) {
        for (const error of fish.errors) {

          if (error.code === 401) {
            this.$cookies.remove('appquarium-jwt')
            await this.$router.push('/login')
          }
        }

        console.log(fish.errors)
        return
      }

      this.fish.publication_state = fish.content
      this.isUpdatingPublicationState = false
    },
    async deleteFish(){
      /*

      const speciesUseCase: SpeciesUseCase = new SpeciesUseCase()

      const fish: Result = await speciesUseCase.deleteSpecies(this.jwt, this.fish)

      if(fish.isFailed()) {
        for (const error of fish.errors) {

          if (error.code === 401) {
            this.$cookies.remove('appquarium-jwt')
            await this.$router.push('/login')
          }
        }

        console.log(fish.errors)
        return
      }

      await this.$router.push('/species/fish')
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
