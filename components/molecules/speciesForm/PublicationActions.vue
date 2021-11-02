<template>
  <div class="flex-row flex-around">
    <BaseButton v-for="(button, index) in publicationActions" :base-button-model="button" v-bind:key="index" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import BaseButton from "~/components/atoms/button/BaseButton.vue";
import BaseButtonModel from "~/components/atoms/button/BaseButtonModel";

export default Vue.extend( {
  name: "PublicationActionsVue",
  components: {
    BaseButton
  },
  props: {
    publicationState: {
      type: String,
      required: true
    }
  },
  data() {

    const prePublishButton: BaseButtonModel = new BaseButtonModel('Pré-publier', 'success', 'button', 'normal', '', false, true)
    const publishButton: BaseButtonModel = new BaseButtonModel('Publier', 'success', 'button')
    const moderateButton: BaseButtonModel = new BaseButtonModel('Modérer', 'warning', 'button')
    const archiveButton: BaseButtonModel = new BaseButtonModel('Archiver', 'danger', 'button')
    const deleteButton: BaseButtonModel = new BaseButtonModel('Supprimer', 'danger', 'button')

    prePublishButton.event = 'prePublishClicked'
    publishButton.event = 'publishClicked'
    moderateButton.event = 'moderateClicked'
    archiveButton.event = 'archiveClicked'
    deleteButton.event = 'deleteClicked'

    const publicationActions = {
      'DRAFT': [
        prePublishButton,
        archiveButton
      ],
      'PRE_PUBLISHED': [
        publishButton,
        moderateButton
      ],
      'PUBLISHED': [
        moderateButton
      ],
      'MODERATED': [
        prePublishButton,
        archiveButton
      ],
      'ARCHIVED': [
        moderateButton,
        deleteButton
      ]
    }

    return {
      publicationActions: publicationActions[this.publicationState]
    }

  }
})
</script>

<style scoped>

</style>
