<template>
  <div class="flex-column card">
    <div class="card-header flex-column">
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
  box-shadow: 5px 5px 5px grey;
}


div.card > div.card-header,
div.card > div.card-body,
div.card > div.card-footer {
  padding: 1rem 20px;
  width: 98%;
}

div.card > div.card-header {
  margin-top: -36px;
  margin-bottom: 36px;
  width: 90%;
  background-color: var(--info_bg);
  box-shadow: 1px 1px 15px grey;
  border-radius: 6px;
}
</style>
