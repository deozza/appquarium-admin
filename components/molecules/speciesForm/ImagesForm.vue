<template>
    <div class="flex-row flex-between">
      <div v-for="(image, index) in species.images" class="flex-column">
        <img :src="image.url" :alt="image.alt" v-bind:key="index">
        <div class="flex-row">
          <input type="text" v-model="image.alt">
          <button @click="updateAlt(image)">Modifier</button>
        </div>
        <button @click="deleteImage(image, index)">Supprimer</button>

      </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

import Species from "~/app/species/global/entities/Species";
import BaseButtonModel from "~/components/atoms/button/BaseButtonModel";
import BaseButton from "~/components/atoms/button/BaseButton.vue";
import Image from "~/app/species/global/entities/Image";

export default Vue.extend({
  name: "GeneralInfoFormVue",
  components: {
    BaseButton
  },
  props: {
    species: {
      type: Species,
      required: true
    }
  },
  data() {
    const submitButton: BaseButtonModel = new BaseButtonModel('Ajouter')
    submitButton.setStyleOrThrowError('success')

    if (this.species.uuid !== '') {
      submitButton.content = 'Modifier'
      submitButton.style = 'warning'
    }

    return {
      submitButton: submitButton,
    }
  },
  async fetch() {
    //const jwt: string = this.$cookies.get('appquarium-jwt')
  },
  methods: {
    async updateAlt(image: Image) {
      await this.$fire.storage.refFromURL(image.url).updateMetadata({customMetadata: {alt: image.alt, origin: image.origin}})
    },
    async deleteImage(image: Image, index: number) {
      await this.$fire.storage.refFromURL(image.url).delete().then(()=>this.species.images.splice(index, 1))
    }

  }
})

</script>

<style scoped>

img {
  max-height: 200px;
  max-width: 100%;
}

form > div.flex-column > ul {
  width: 90%;
}

li {
  margin: 12px 0;
}

li > div.input-row {
  padding: 0.5em;
  align-items: normal;
  width: 98%;
}

li > div.input-row > label {
  flex: 1;
  padding: 0.5em 1em 0.5em 0;
}

@media only screen and (min-width: 1024px) {
  form {
    width: 98%;
    min-height: 33vh;
  }
}

@media only screen and (max-width: 1024px) {
  form {
    width: 80vw;
    height: 80vh;
  }
}
</style>
