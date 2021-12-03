<script lang="ts">
import BaseLinkModel from "./BaseLinkModel";

export default {
  name: "BaseLinkVue",
  props: {
    baseLinkModel: {
      type: BaseLinkModel,
      required: true
    }
  }
}

</script>

<template>
  <a :href="baseLinkModel.linkTo" :class="baseLinkModel.style + (baseLinkModel.hasUnderline ? '' : ' no-underline')"
     :target="baseLinkModel.isExternal ? '_blank' : '_self'">{{ baseLinkModel.content }}</a>
</template>

<style scoped>
a.light {
  color: black;
}

a.dark {
  color: white;
}

a.primary {
  color: var(--primary_text);
}

a.secondary {
  color: var(--secondary_text);
}

a.success {
  color: var(--success_text);
}

a.danger {
  color: var(--danger_text);
}

a.warning {
  color: var(--warning_text);
}

a.info {
  color: var(--info_text);
}

a.no-underline {
  text-decoration: none;
}
</style>
