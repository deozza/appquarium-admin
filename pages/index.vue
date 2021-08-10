<template>
  <div>
    <p>coucou</p>
  </div>

</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'

export default Vue.extend({
  middleware: 'authenticated',
  components: {
  },
  data(){
    return {}
  },
  computed: {
    jwt(): string{
      return this.$cookies.get('appquarium-jwt')
    }
  }

})
</script>

<style scoped>

</style>
