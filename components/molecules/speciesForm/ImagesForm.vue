<template>
    <div class="flex-row flex-left">
      <div v-for="(image, index) in species.images" class="flex-column">
        <img :src="image.url" :alt="image.alt" v-bind:key="index">
        <div class="flex-row">
          <input type="text" v-model="image.alt">
          <button @click="updateAlt(image, index)" :id="'update-alt-'+index" >Modifier</button>
        </div>
        <button @click="deleteImage(image, index)" :id="'delete-'+index" >Supprimer</button>
      </div>
      <div>

        <form v-on:submit.prevent="uploadFile">

          <div class="flex-column">
            <ul>
              <li class="flex-column">
                <div class="flex-row input-row">
                  <label for="file">Image <span class="required-field">*</span></label>
                  <input id="file" type="file" accept="image/png,image/jpeg,image/jpg" @change="selectFile" required>
                </div>
              </li>

              <li class="flex-column">
                <div class="flex-row input-row">
                  <label for="alt">Titre <span class="required-field">*</span></label>
                  <input id="alt" type="text" required v-model="newFileTitle">
                </div>
              </li>

              <li class="flex-column">
                <div class="flex-row input-row">
                  <label for="source">Source <span class="required-field">*</span></label>
                  <input id="source" type="text" required v-model="newFileSource">
                </div>
              </li>
              <li class="flex-column">
                <BaseButton :base-button-model="submitButton"/>
                <BaseParagraph :base-paragraph-model="successfulUploadParagraph" v-if="uploadState === 'success'" />
                <BaseParagraph :base-paragraph-model="failedUploadParagraph" v-if="uploadState === 'error'"/>
              </li>
            </ul>

          </div>
        </form>
      </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

import Species from "~/app/species/global/entities/Species";
import BaseButtonModel from "~/components/atoms/button/BaseButtonModel";
import BaseButton from "~/components/atoms/button/BaseButton.vue";
import Image from "~/app/file/entities/Image";
import BaseParagraph from "~/components/atoms/typography/paragraph/BaseParagraph.vue";
import BaseParagraphModel from "~/components/atoms/typography/paragraph/BaseParagraphModel";
import UseCase from "~/app/file/useCases/UseCase";
import Result from "~/app/utils/useCasesResult/Result";

export default Vue.extend({
  name: "GeneralInfoFormVue",
  components: {
    BaseButton,
    BaseParagraph
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

    const updateButton: BaseButtonModel = new BaseButtonModel('Modifier')
    updateButton.setStyleOrThrowError('warning')
    updateButton.setTypeOrThrowError('button')
    updateButton.setSizeOrThrowError('small')

    const deleteButton: BaseButtonModel = new BaseButtonModel('Supprimer')
    deleteButton.setStyleOrThrowError('danger')
    deleteButton.setTypeOrThrowError('button')
    deleteButton.setSizeOrThrowError('small')

    const successfulUploadParagraph: BaseParagraphModel = new BaseParagraphModel("Upload réussie <i class='fa fa-check' style='color: green'></i>")
    const failedUploadParagraph: BaseParagraphModel = new BaseParagraphModel("Une erreur est survenue")

    return {
      submitButton: submitButton,
      updateButton: updateButton,
      deleteButton: deleteButton,
      newFileToUpload: null,
      newFileTitle: '',
      newFileSource: '',
      successfulUploadParagraph: successfulUploadParagraph,
      failedUploadParagraph: failedUploadParagraph,
      uploadState: ''
    }
  },
  async fetch() {
    //const jwt: string = this.$cookies.get('appquarium-jwt')
  },
  methods: {
    selectFile(e){
      this.newFileToUpload = e.target.files[0]
    },
    async uploadFile(){

      this.submitButton.isLoading = true
      this.uploadState = ''
      if(this.newFileToUpload === null){
        this.submitButton.isLoading = false
        this.uploadState = 'error'

        return
      }
      const fileUseCase: UseCase = new UseCase(this.$fire.storage)
      let result: Result

      result = await fileUseCase.uploadFile(this.newFileTitle, this.newFileSource, '/species/'+this.species.uuid, this.newFileToUpload)

      if(result.isFailed()){
        this.submitButton.isLoading = false
        this.uploadState = 'error'
        console.log(result.errors)

        return
      }

      this.species.images.push(result.content)

      this.newFileToUpload = null
      this.newFileTitle = ''
      this.newFileSource = ''

      this.submitButton.isLoading = false
      this.uploadState = 'success'

    },
    async updateAlt(image: Image, index: number) {
      const fileUseCase: UseCase = new UseCase(this.$fire.storage)
      let result: Result

      result = await fileUseCase.editFileMetadata(image)

      if(result.isFailed()){
        console.log(result.errors)
        return
      }
    },
    async deleteImage(image: Image, index: number) {
      const fileUseCase: UseCase = new UseCase(this.$fire.storage)
      let result: Result

      result = await fileUseCase.deleteFile(image)

      if(result.isFailed()){
        console.log(result.errors)
        return
      }

      this.species.images.splice(index, 1)
    }

  }
})

</script>

<style scoped>

div.flex-row.flex-left > div.flex-column {
  margin: 24px 24px 0 24px
}

img {
  max-height: 200px;
  max-width: 100%;
}

form > div.flex-column > ul {
  border: 1px solid black;
  padding: 12px;
  border-radius: 12px;
}

form > div.flex-column > ul > li {
  margin: 12px 0;
}

form > div.flex-column > ul > li > div.input-row {
  padding: 0.5em;
  align-items: normal;
  width: 98%;
}

form > div.flex-column > ul > li > div.input-row > label {
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
