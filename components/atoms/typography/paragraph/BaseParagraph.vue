<script lang="ts">
import BaseParagraphModel from "./BaseParagraphModel";

export default {
  name: "BaseParagraphVue",
  props: {
    baseParagraphModel: {
      type: BaseParagraphModel,
      required: true
    }
  }
}

</script>
<template>
  <p :class="baseParagraphModel.style" v-html="baseParagraphModel.content"></p>
</template>


<style scoped>
.light {
  color: black;
}

.dark {
  color: white;
}

.primary {
  color: var(--primary_text);
}

.secondary {
  color: var(--secondary_text);
}

.success {
  color: var(--success_text);
}

.danger {
  color: var(--danger_text);
}

.warning {
  color: var(--warning_text);
}

.info {
  color: var(--info_text);
}
</style>
