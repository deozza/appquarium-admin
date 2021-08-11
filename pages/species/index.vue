<template>
<main>
  <a href="/species/add">
    <BaseButton :base-button-model="addButton"/>
  </a>
</main>
</template>

<script lang="ts">
import Vue from 'vue'
import BaseButtonModel from "~/components/atoms/button/BaseButtonModel";
import BaseButton from "~/components/atoms/button/BaseButton";

export default Vue.extend({
  middleware: 'authenticated',
  components: {
    BaseButton
  },
  data(){
    const addButton: BaseButtonModel = new BaseButtonModel('Ajouter', 'success', 'button')
    return {
      addButton: addButton
    }
  },
})
</script>

<style scoped>

</style>
