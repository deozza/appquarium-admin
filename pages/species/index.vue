<template>
<main>
  <div class="flex-column">
    <BaseHeader :base-header-model="header" />
    <a href="/species/add">
      <BaseButton :base-button-model="addButton"/>
    </a>
  </div>
</main>
</template>

<script lang="ts">
import Vue from 'vue'
import BaseButtonModel from "~/components/atoms/button/BaseButtonModel";
import BaseButton from "~/components/atoms/button/BaseButton.vue";
import BaseHeaderModel from "~/components/atoms/typography/header/BaseHeaderModel";
import BaseHeader from "~/components/atoms/typography/header/BaseHeader.vue";

export default Vue.extend({
  middleware: 'authenticated',
  components: {
    BaseHeader,
    BaseButton
  },
  data(){
    const header: BaseHeaderModel = new BaseHeaderModel('Dashboard espèces', 1)
    const addButton: BaseButtonModel = new BaseButtonModel('Ajouter', 'success', 'button')
    return {
      header: header,
      addButton: addButton
    }
  },
})
</script>

<style scoped>

</style>
