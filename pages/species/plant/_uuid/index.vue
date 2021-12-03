<template>
  <main>
    <div id="loading" v-if="$fetchState.pending">
      <p>Récupération des infos️</p>
    </div>
    <div id="error" v-else-if="$fetchState.error">
      <p>Une erreur est survenue :(</p>
    </div>
    <div class="flex-column" id="content" v-else>
      <section id="title" class="flex-row">
        <BaseHeader :base-header-model="header">
          <BaseBadge :base-badge-model="statusBadge"/>
        </BaseHeader>
      </section>
      <section id="cards" class="flex-row flex-around">

        <BaseCard>
          <template slot="header">
            <BaseHeader :base-header-model="generalCardHeader"/>
          </template>
          <template slot="body">
            <GeneralInfoForm :species="plant"/>
          </template>
        </BaseCard>

        <BaseCard>
          <template slot="header">
            <BaseHeader :base-header-model="namingCardHeader"/>
          </template>
          <template slot="body">
            <NamingForm :jwt="jwt" :species="plant"/>
          </template>
        </BaseCard>


        <BaseCard>
          <template slot="header">
            <BaseHeader :base-header-model="waterConstraintsCardHeader"/>
          </template>
          <template slot="body">
            <WaterConstraintsForm :jwt="jwt" :species="plant"/>
          </template>
        </BaseCard>
      </section>

      <BaseCard>
        <template slot="footer">
          <PublicationActions v-if="isUpdatingPublicationState === false" :publication-state="plant.publication_state"/>
          <div v-else class="flex-row flex-around">
            <i class="fas fa-spinner fa-spin fa-5x"></i>
          </div>
        </template>
      </BaseCard>

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
import BaseParagraphModel from "~/components/atoms/typography/paragraph/BaseParagraphModel";
import BaseParagraph from "~/components/atoms/typography/paragraph/BaseParagraph.vue";
import GeneralInfoForm from "~/components/molecules/speciesForm/GeneralInfoForm.vue";
import NamingForm from "~/components/molecules/speciesForm/NamingForm.vue";
import WaterConstraintsForm from "~/components/molecules/speciesForm/WaterConstraintsForm.vue";
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
    PublicationActions
  },
  created() {
    this.$nuxt.$on('prePublishClicked', () => this.prePublishPlant())
    this.$nuxt.$on('publishClicked', () => this.publishPlant())
    this.$nuxt.$on('moderateClicked', () => this.moderatePlant())
    this.$nuxt.$on('archiveClicked', () => this.archivePlant())
    this.$nuxt.$on('deleteClicked', () => this.deletePlant())
  },
  beforeDestroy() {
    this.$nuxt.$off('prePublishClicked')
    this.$nuxt.$off('publishClicked')
    this.$nuxt.$off('moderateClicked')
    this.$nuxt.$off('archiveClicked')
    this.$nuxt.$off('deleteClicked')
  },
  data() {
    const header: BaseHeaderModel = new BaseHeaderModel("")
    const generalCardHeader: BaseHeaderModel = new BaseHeaderModel("Infos générales")
    generalCardHeader.setSizeOrThrowError(2)

    const namingCardHeader: BaseHeaderModel = new BaseHeaderModel("Noms")
    namingCardHeader.setSizeOrThrowError(2)

    const waterConstraintsCardHeader: BaseHeaderModel = new BaseHeaderModel("Contraintes d'eau")
    waterConstraintsCardHeader.setSizeOrThrowError(2)

    const statusParagraph: BaseParagraphModel = new BaseParagraphModel("")
    const plant: Species = new Species([])
    const jwt: string = this.$cookies.get('appquarium-jwt')

    return {
      header: header,
      generalCardHeader: generalCardHeader,
      namingCardHeader: namingCardHeader,
      waterConstraintsCardHeader: waterConstraintsCardHeader,
      statusParagraph: statusParagraph,
      plant: plant,
      jwt: jwt,
      isUpdatingPublicationState: false
    }
  },
  async fetch() {
    const speciesUseCase: SpeciesUseCase = new SpeciesUseCase()
    const params = this.$route.params

    const plant: Result = await speciesUseCase.getSpecies(this.jwt, params.uuid)
    if (plant.isFailed()) {
      for (const error of plant.errors) {
        if (error.code === 401) {
          this.$cookies.remove('appquarium-jwt')
          await this.$router.push('/login')
        }

        if (error.code === 404) {
          await this.$router.push('/species/plant')
        }
      }
      return
    }

    this.plant = plant.content
    this.header.content = this.plant.computeName()
  },
  computed: {
    statusBadge(): BaseBadgeModel {
      const statusBadge: BaseBadgeModel = new BaseBadgeModel("")

      if (this.plant === undefined || this.plant === null || this.plant.publication_state === '') {
        return statusBadge
      }

      statusBadge.content = this.getPublicationStateContent(this.plant)
      statusBadge.style = this.getPublicationStateStyle(this.plant)

      return statusBadge
    }
  },
  methods: {
    getPublicationStateStyle(plant: Species): string {
      const publicationStateStyle: object = {
        'DRAFT': 'secondary',
        'PRE_PUBLISHED': 'info',
        'MODERATED': 'warning',
        'PUBLISHED': 'success',
        'ARCHIVED': 'secondary',
      }

      return publicationStateStyle[plant.publication_state]
    },
    getPublicationStateContent(plant: Species): string {
      const publicationStateContent: object = {
        'DRAFT': 'brouillon',
        'PRE_PUBLISHED': 'pré-publié',
        'MODERATED': 'modéré',
        'PUBLISHED': 'publié',
        'ARCHIVED': 'archivé',
      }

      return publicationStateContent[plant.publication_state]
    },
    async prePublishPlant() {
      this.isUpdatingPublicationState = true
      const speciesUseCase: SpeciesUseCase = new SpeciesUseCase()

      const plant: Result = await speciesUseCase.updatePublicationState(this.jwt, this.plant, 'PRE_PUBLISHED')

      if (plant.isFailed()) {
        for (const error of plant.errors) {

          if (error.code === 401) {
            this.$cookies.remove('appquarium-jwt')
            await this.$router.push('/login')
          }
        }

        console.log(plant.errors)
        return
      }

      this.plant.publication_state = plant.content
      this.isUpdatingPublicationState = false
    },
    async publishPlant() {
      this.isUpdatingPublicationState = true
      const speciesUseCase: SpeciesUseCase = new SpeciesUseCase()

      const plant: Result = await speciesUseCase.updatePublicationState(this.jwt, this.plant, 'PUBLISHED')

      if (plant.isFailed()) {
        for (const error of plant.errors) {

          if (error.code === 401) {
            this.$cookies.remove('appquarium-jwt')
            await this.$router.push('/login')
          }
        }

        console.log(plant.errors)
        return
      }

      this.plant.publication_state = plant.content
      this.isUpdatingPublicationState = false
    },
    async moderatePlant() {
      this.isUpdatingPublicationState = true
      const speciesUseCase: SpeciesUseCase = new SpeciesUseCase()

      const plant: Result = await speciesUseCase.updatePublicationState(this.jwt, this.plant, 'MODERATED')

      if (plant.isFailed()) {
        for (const error of plant.errors) {

          if (error.code === 401) {
            this.$cookies.remove('appquarium-jwt')
            await this.$router.push('/login')
          }
        }

        console.log(plant.errors)
        this.isUpdatingPublicationState = false
        return
      }

      this.plant.publication_state = plant.content
      this.isUpdatingPublicationState = false
    },
    async archivePlant() {
      this.isUpdatingPublicationState = true
      const speciesUseCase: SpeciesUseCase = new SpeciesUseCase()

      const plant: Result = await speciesUseCase.updatePublicationState(this.jwt, this.plant, 'ARCHIVED')

      if (plant.isFailed()) {
        for (const error of plant.errors) {

          if (error.code === 401) {
            this.$cookies.remove('appquarium-jwt')
            await this.$router.push('/login')
          }
        }

        console.log(plant.errors)
        return
      }

      this.plant.publication_state = plant.content
      this.isUpdatingPublicationState = false
    },
    async deletePlant() {
      /*

      const speciesUseCase: SpeciesUseCase = new SpeciesUseCase()

      const plant: Result = await speciesUseCase.deleteSpecies(this.jwt, this.plant)

      if(plant.isFailed()) {
        for (const error of plant.errors) {

          if (error.code === 401) {
            this.$cookies.remove('appquarium-jwt')
            await this.$router.push('/login')
          }
        }

        console.log(plant.errors)
        return
      }

      await this.$router.push('/species/plant')
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
