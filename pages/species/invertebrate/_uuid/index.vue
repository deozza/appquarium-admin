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
        <BaseHeader :base-header-model="header" />
        <BaseParagraph :base-paragraph-model="statusParagraph" />
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
      </section>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import BaseHeaderModel from "../../../../components/atoms/typography/header/BaseHeaderModel";
import Species from "../../../../app/species/global/entities/Species";
import SpeciesUseCase from "../../../../app/species/global/useCases/UseCase";
import Result from "../../../../app/utils/useCasesResult/Result";
import BaseCard from "~/components/molecules/card/BaseCard.vue";
import BaseButton from "~/components/atoms/button/BaseButton.vue";
import BaseHeader from "~/components/atoms/typography/header/BaseHeader.vue";
import BaseParagraphModel from "~/components/atoms/typography/paragraph/BaseParagraphModel";
import BaseParagraph from "~/components/atoms/typography/paragraph/BaseParagraph.vue";
import GeneralInfoForm from "~/components/molecules/speciesForm/GeneralInfoForm.vue";
import NamingForm from "~/components/molecules/speciesForm/NamingForm.vue";
import WaterConstraintsForm from "~/components/molecules/speciesForm/WaterConstraintsForm.vue";

export default Vue.extend({
  middleware: 'authenticated',
  components: {
    BaseHeader,
    BaseParagraph,
    BaseButton,
    BaseCard,
    GeneralInfoForm,
    NamingForm,
    WaterConstraintsForm
  },
  data(){
    const header: BaseHeaderModel = new BaseHeaderModel("", 1)
    const generalCardHeader: BaseHeaderModel = new BaseHeaderModel("Infos générales", 2)
    const namingCardHeader: BaseHeaderModel = new BaseHeaderModel("Noms", 2)
    const waterConstraintsCardHeader: BaseHeaderModel = new BaseHeaderModel("Contraintes d'eau", 2)
    const statusParagraph: BaseParagraphModel = new BaseParagraphModel("")
    const invertebrate: Species = new Species([])
    const jwt: string = this.$cookies.get('appquarium-jwt')

    return {
      header: header,
      generalCardHeader: generalCardHeader,
      namingCardHeader: namingCardHeader,
      waterConstraintsCardHeader: waterConstraintsCardHeader,
      statusParagraph: statusParagraph,
      invertebrate: invertebrate,
      jwt: jwt
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
    this.statusParagraph.content = this.invertebrate.publication_state
    switch (this.invertebrate.publication_state) {
      case 'DRAFT': this.statusParagraph.style = 'info';break;
      case 'PRE_PUBLISHED': this.statusParagraph.style = 'info';break;
      case 'PUBLISHED': this.statusParagraph.style = 'success';break;
      case 'MODERATED': this.statusParagraph.style = 'warning';break;
    }
  },
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
