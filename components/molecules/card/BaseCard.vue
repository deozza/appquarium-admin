<template>
  <div class="card">
    <div class="card-header">
      <slot name="header"></slot>
    </div>
    <div class="card-body">
      <slot name="body"></slot>
    </div>
    <div class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">

export default {
  name: "BaseCardVue"
}

</script>

<style scoped>

div.card {
  border-radius: 6px;
  margin: 30px 0;
  width: 90%;
  background-color: white;
  display: flex;
}

div.card > div.card-body {
  padding: 1rem 20px;
  flex: 1 1 auto;
  position: relative;
}
</style>
