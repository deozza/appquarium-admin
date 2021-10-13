<template>
<main>

</main>
</template>

<script lang="ts">
import Vue from 'vue'
import BaseHeader from "~/components/atoms/typography/header/BaseHeader.vue";

export default Vue.extend({
  middleware: 'authenticated',
  components: {
    BaseHeader,
  },
  data(){

    return {
    }
  },
})
</script>

<style scoped>

</style>
