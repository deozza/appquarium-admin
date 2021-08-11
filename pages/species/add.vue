<template>
<main>
  <div class="flex-column">
    <p v-if="$fetchState.pending">Récupération des infos️</p>
    <p v-else-if="$fetchState.error">Une erreur est survenue :(</p>
    <section v-else id="add">
      <BaseHeader :base-header-model="header"/>
      <div class="flex-row flex-around">
        <a v-for="(category, index) in speciesCategories" :href="'/species/'+category.name+'/add'">{{category.name}}</a>
      </div>
    </section>
  </div>
</main>
</template>

<script lang="ts">
import Vue from 'vue'
import BaseButtonModel from "~/components/atoms/button/BaseButtonModel";
import BaseButton from "~/components/atoms/button/BaseButton";
import BaseHeader from "~/components/atoms/typography/header/BaseHeader.vue";
import BaseHeaderModel from "~/components/atoms/typography/header/BaseHeaderModel";
import BaseInput from "~/components/atoms/input/BaseInput";
import SpeciesUseCase from "~/app/species/global/useCases/UseCase";
import Result from "~/app/utils/useCasesResult/Result";
import Error from "~/app/utils/useCasesResult/types/Error";


export default Vue.extend({
  middleware: 'authenticated',
  components: {
    BaseButton,
    BaseHeader,
    BaseInput
  },
  data(){
    const header: BaseHeaderModel = new BaseHeaderModel('Ajouter une espèce', 1)
    const speciesCategories: Array<any> = []

    return {
      header: header,
      speciesCategories: speciesCategories
    }
  },
  async fetch(){
    const speciesUseCase: SpeciesUseCase = new SpeciesUseCase()
    const jwt: string = this.$cookies.get('appquarium-jwt')

    const speciesCategories: Result = await speciesUseCase.getSpeciesCategories(jwt)

    if(speciesCategories.isSuccessful()){
      this.speciesCategories = speciesCategories.content
      return
    }

    for(const error: Error of speciesCategories.errors){
      if(error.code === 401){
        this.$cookies.remove('appquarium-jwt')
        await this.$router.push('/login')
      }
    }

  }
})
</script>

<style scoped>

</style>
