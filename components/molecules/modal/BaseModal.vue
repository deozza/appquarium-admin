<template>
  <div v-if="isOpened" class="modal">
    <div class="flex-column modal-content">
      <div v-if="isSlotEmpty('header')" class="modal-header flex-row flex-around">
        <slot name="header"></slot>
        <i @click="isOpened = false" class="fas fa-times"></i>
      </div>
      <div v-if="isSlotEmpty('body')" class="modal-body">
        <slot name="body"></slot>
      </div>
      <div v-if="isSlotEmpty('footer')" class="modal-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>

</template>

<script lang="ts">

import Vue from 'vue'

export default Vue.extend({
  name: "BaseModalVue",
  props: {
    isOpened: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    isSlotEmpty(slotName: string): boolean {
      return !!this.$slots[slotName]
    }
  }
})

</script>

<style scoped>

div.modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #000000da;
}

div.modal-content {
  background-color: white;
  margin-top: 10vh;
  padding: 36px;
  border-radius: 12px;
  max-height: 33vh;
}

div.modal-content > div.modal-header,
div.modal-content > div.modal-body,
div.modal-content > div.modal-footer {
  padding: 1rem 20px;
  width: 98%;
}

</style>
