<template>
  <div class="container">
    <div class="vertical-menu">
      <div class="flex-column flex-left">
        <a href="/">Accueil</a>
        <a href="/species">Espèces</a>
        <a href="/users">Utilisateurs</a>
        <a href="/aquariums">Aquariums</a>
      </div>
      <a @click="logout">Déconnexion</a>
    </div>
    <div class="content">
      <Nuxt />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  methods: {
    async logout(){
      this.$cookies.remove('appquarium-jwt')
      await this.$router.push('/login')
    }
  }

})
</script>

<style scoped>
 div.container > div.vertical-menu {
   height: 100%;
   width: 300px;
   position: fixed;
   z-index: 1;
   top: 0;
   left: 0;
   background-color: white;
   overflow-x: hidden;
   box-shadow: 10px 0 5px grey;
 }

 div.container > div.vertical-menu > div.flex-column > a{
   color: black;
   font-size: 28px;
   padding: 36px 0 36px 68px;
   text-decoration: none;
 }

 div.container > div.vertical-menu > a{
   color: black;
   font-size: 28px;
   padding: 0 0 36px 68px;
   text-decoration: none;
   position: absolute;
   bottom: 0;
   cursor: pointer;
 }

 div.container > div.vertical-menu > div.flex-column > a:hover,
 div.container > div.vertical-menu > a:hover {
   color: gray;
 }

 div.container > div.content {
   margin-left: 300px;
 }
</style>
