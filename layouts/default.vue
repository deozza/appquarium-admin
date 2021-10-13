<template>
  <div class="container">
    <div class="vertical-menu">
      <div class="flex-column flex-left">
        <a href="/">Accueil</a>
        <button @click="showDropdown = !showDropdown">Espèces</button>
        <div v-if="showDropdown === true" class="flex-column flex-left dropdown" >
          <a href="/species">Voir toutes</a>
          <a href="/species/fish">Poissons</a>
          <a href="/species/plant">Plantes</a>
          <a href="/species/invertebrate">Invertébrés</a>
        </div>
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
  data() {
    return { showDropdown: false}
  },
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

 div.container > div.vertical-menu > div.flex-column > a,
 div.container > div.vertical-menu > div.flex-column > button{
   color: black;
   font-size: 28px;
   padding: 36px 0 36px 68px;
   text-decoration: none;
 }

 div.container > div.vertical-menu > div.flex-column > button {
   background-color: transparent;
   border: none;
   cursor: pointer;
 }

 div.container > div.vertical-menu > a,
 div.container > div.vertical-menu > button{
   color: black;
   font-size: 28px;
   padding: 0 0 36px 68px;
   text-decoration: none;
   position: absolute;
   bottom: 0;
   cursor: pointer;
 }

 div.container > div.vertical-menu > div.flex-column > div.dropdown > a {
   color: black;
   font-size: 18px;
   padding: 0 0 24px 94px;
   text-decoration: none;
   bottom: 0;
   cursor: pointer;
 }

 div.container > div.vertical-menu > div.flex-column > a:hover,
 div.container > div.vertical-menu > div.flex-column > button:hover,
 div.container > div.vertical-menu > div.flex-column > div.dropdown > a:hover,
 div.container > div.vertical-menu > a:hover {
   color: gray;
 }

 div.container > div.content {
   margin-left: 336px;
 }
</style>
