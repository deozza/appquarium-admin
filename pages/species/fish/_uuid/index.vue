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
            <GeneralInfoForm :species="fish"/>
          </template>
        </BaseCard>

        <BaseCard>
          <template slot="header">
            <BaseHeader :base-header-model="namingCardHeader"/>
          </template>
          <template slot="body">
            <NamingForm :jwt="jwt" :species="fish"/>
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
          <template slot="header">
            <BaseHeader :base-header-model="imageCardHeader" />
          </template>
          <template slot="body">
            <ImagesForm :species="fish" />
          </template>
        </BaseCard>

        <BaseCard>
          <template slot="footer">
            <PublicationActions v-if="isUpdatingPublicationState === false"
                                :publication-state="fish.publication_state"/>
            <div v-else class="flex-row flex-around">
              <i class="fas fa-spinner fa-spin fa-5x"></i>
            </div>
          </template>
        </BaseCard>
      </section>
    </div>

    <BaseModal :is-opened="deleteFishModalIsOpen">
      <template slot="header">
        <BaseHeader :base-header-model="deleteModalHeader"/>
      </template>
      <template slot="footer">
        <div class="flex-row flex-around">
          <BaseButton :base-button-model="cancelDeleteSpeciesButton"/>
          <BaseButton :base-button-model="confirmDeleteSpeciesButton"/>
        </div>
      </template>
    </BaseModal>
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
import BaseModal from "~/components/molecules/modal/BaseModal.vue";
import BaseButtonModel from "~/components/atoms/button/BaseButtonModel";
import ImagesForm from "~/components/molecules/speciesForm/ImagesForm.vue";
import Image from "~/app/file/entities/Image";
import firebase from "firebase";

export default Vue.extend({
  middleware: 'authenticated',
  components: {
    BaseHeader,
    BaseBadge,
    BaseButton,
    BaseCard,
    BaseModal,
    GeneralInfoForm,
    NamingForm,
    WaterConstraintsForm,
    AnimalSpecsForm,
    PublicationActions,
    ImagesForm
  },
  created() {
    this.$nuxt.$on('prePublishClicked', () => this.prePublishFish())
    this.$nuxt.$on('publishClicked', () => this.publishFish())
    this.$nuxt.$on('moderateClicked', () => this.moderateFish())
    this.$nuxt.$on('archiveClicked', () => this.archiveFish())
    this.$nuxt.$on('deleteClicked', () => this.deleteFishModalIsOpen = true)
    this.$nuxt.$on('closeDeleteSpeciesModal', () => this.deleteFishModalIsOpen = false)
    this.$nuxt.$on('confirmDeleteSpecies', () => this.deleteFish())
  },
  beforeDestroy() {
    this.$nuxt.$off('prePublishClicked')
    this.$nuxt.$off('publishClicked')
    this.$nuxt.$off('moderateClicked')
    this.$nuxt.$off('archiveClicked')
    this.$nuxt.$off('deleteClicked')
    this.$nuxt.$off('closeDeleteSpeciesModal')
    this.$nuxt.$off('confirmDeleteSpecies')
  },
  data() {
    const header: BaseHeaderModel = new BaseHeaderModel("")

    const generalCardHeader: BaseHeaderModel = new BaseHeaderModel("Infos générales")
    generalCardHeader.setSizeOrThrowError(2)

    const namingCardHeader: BaseHeaderModel = new BaseHeaderModel("Noms")
    namingCardHeader.setSizeOrThrowError(2)

    const waterConstraintsCardHeader: BaseHeaderModel = new BaseHeaderModel("Contraintes d'eau")
    waterConstraintsCardHeader.setSizeOrThrowError(2)

    const animalSpecsCardHeader: BaseHeaderModel = new BaseHeaderModel("Caractéristiques animales")
    animalSpecsCardHeader.setSizeOrThrowError(2)

    const deleteModalHeader: BaseHeaderModel = new BaseHeaderModel("Supprimer une espèce")
    deleteModalHeader.setSizeOrThrowError(3)

    const imageCardHeader: BaseHeaderModel = new BaseHeaderModel("Photos")
    imageCardHeader.setSizeOrThrowError(2)

    const cancelDeleteSpeciesButton: BaseButtonModel = new BaseButtonModel('Non')
    cancelDeleteSpeciesButton.setStyleOrThrowError('secondary')
    cancelDeleteSpeciesButton.setTypeOrThrowError('button')
    cancelDeleteSpeciesButton.event = 'closeDeleteSpeciesModal'

    const confirmDeleteSpeciesButton: BaseButtonModel = new BaseButtonModel('Oui')
    confirmDeleteSpeciesButton.setStyleOrThrowError('danger')
    confirmDeleteSpeciesButton.setTypeOrThrowError('button')
    confirmDeleteSpeciesButton.event = 'confirmDeleteSpecies'

    const fish: Species = new Species([])
    const jwt: string = this.$cookies.get('appquarium-jwt')

    return {
      header: header,
      generalCardHeader: generalCardHeader,
      namingCardHeader: namingCardHeader,
      waterConstraintsCardHeader: waterConstraintsCardHeader,
      animalSpecsCardHeader: animalSpecsCardHeader,
      imageCardHeader: imageCardHeader,
      deleteModalHeader: deleteModalHeader,
      cancelDeleteSpeciesButton: cancelDeleteSpeciesButton,
      confirmDeleteSpeciesButton: confirmDeleteSpeciesButton,
      fish: fish,
      jwt: jwt,
      isUpdatingPublicationState: false,
      deleteFishModalIsOpen: false
    }
  },
  async fetch() {
    const speciesUseCase: SpeciesUseCase = new SpeciesUseCase()
    const params = this.$route.params

    const fish: Result = await speciesUseCase.getSpecies(this.jwt, params.uuid)
    if (fish.isFailed()) {
      for (const error of fish.errors) {
        if (error.code === 401) {
          this.$cookies.remove('appquarium-jwt')
          await this.$router.push('/login')
        }

        if (error.code === 404) {
          await this.$router.push('/species/fish')
        }
      }
      console.log(fish.errors)
      return
    }

    this.fish = fish.content
    this.header.content = this.fish.computeName()
    const listOfFiles = await this.$fire.storage.ref('species/'+this.fish.uuid).listAll()

    listOfFiles.items.forEach((file: firebase.storage.Reference) => {
      const image: Image = new Image()
      image.setFromFirebase(file)
      this.fish.images.push(image)
    })
  },
  computed: {
    statusBadge(): BaseBadgeModel {
      const statusBadge: BaseBadgeModel = new BaseBadgeModel("")

      if (this.fish === undefined || this.fish === null || this.fish.publication_state === '') {
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
    async prePublishFish() {
      this.isUpdatingPublicationState = true
      const speciesUseCase: SpeciesUseCase = new SpeciesUseCase()

      const fish: Result = await speciesUseCase.updatePublicationState(this.jwt, this.fish, 'PRE_PUBLISHED')

      if (fish.isFailed()) {
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
    async publishFish() {
      this.isUpdatingPublicationState = true
      const speciesUseCase: SpeciesUseCase = new SpeciesUseCase()

      const fish: Result = await speciesUseCase.updatePublicationState(this.jwt, this.fish, 'PUBLISHED')

      if (fish.isFailed()) {
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
    async moderateFish() {
      this.isUpdatingPublicationState = true
      const speciesUseCase: SpeciesUseCase = new SpeciesUseCase()

      const fish: Result = await speciesUseCase.updatePublicationState(this.jwt, this.fish, 'MODERATED')

      if (fish.isFailed()) {
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
    async archiveFish() {
      this.isUpdatingPublicationState = true
      const speciesUseCase: SpeciesUseCase = new SpeciesUseCase()

      const fish: Result = await speciesUseCase.updatePublicationState(this.jwt, this.fish, 'ARCHIVED')

      if (fish.isFailed()) {
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
    async deleteFish() {
      this.confirmDeleteSpeciesButton.isLoading = true

      const speciesUseCase: SpeciesUseCase = new SpeciesUseCase()

      const fish: Result = await speciesUseCase.deleteSpecies(this.jwt, this.fish)

      if (fish.isFailed()) {
        for (const error of fish.errors) {

          if (error.code === 401) {
            this.$cookies.remove('appquarium-jwt')
            await this.$router.push('/login')
          }
        }

        console.log(fish.errors)
        this.confirmDeleteSpeciesButton.isLoading = false;
        this.deleteFishModalIsOpen = false;
        return
      }

      await this.$router.push('/species/fish')
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
