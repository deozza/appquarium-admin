<template>
  <h1 v-if="baseHeaderModel.size === 1" :class="baseHeaderModel.style">{{baseHeaderModel.content}}</h1>
  <h2 v-else-if="baseHeaderModel.size === 2" :class="baseHeaderModel.style">{{baseHeaderModel.content}}</h2>
  <h3 v-else-if="baseHeaderModel.size === 3" :class="baseHeaderModel.style">{{baseHeaderModel.content}}</h3>
  <h4 v-else-if="baseHeaderModel.size === 4" :class="baseHeaderModel.style">{{baseHeaderModel.content}}</h4>
  <h5 v-else-if="baseHeaderModel.size === 5" :class="baseHeaderModel.style">{{baseHeaderModel.content}}</h5>
  <h6 v-else :class="baseHeaderModel.style">{{baseHeaderModel.content}}</h6>
</template>

<script lang="ts">
import BaseHeaderModel from "./BaseHeaderModel";

export default {
  name: "BaseHeaderVue",
  props: {
    baseHeaderModel: {
      type: BaseHeaderModel,
      required: true
    }
  }
}

</script>

<style scoped>
    h1 {
        font-size: 4rem;
    }

    h2 {
        font-size: 2rem;
    }

    h3 {
        font-size: 1.75rem;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        margin: 20px 0 20px 0;
    }

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
