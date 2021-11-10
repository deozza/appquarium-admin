<template>
  <span
    class="badge"
    :class="[
      { [`badge-${baseBadgeModel.style}`]: baseBadgeModel.style },
      { 'badge-icon': baseBadgeModel.isOnlyIcon },
    ]"
  >
    {{baseBadgeModel.content}} <i v-if="baseBadgeModel.icon !== ''" :class="baseBadgeModel.icon"></i>
  </span>

</template>

<script lang="ts">
import Vue from 'vue'

import BaseBadgeModel from "./BaseBadgeModel";

export default Vue.extend( {
  name: "BaseBadgeVue",
  props: {
    baseBadgeModel: {
      type: BaseBadgeModel,
      required: true
    }
  }
})


</script>


<style scoped>
    span.badge {
        display: inline-block;
        font-weight: 400;
        text-decoration: none;
        color: #212529;
        text-align: center;
        font-size: 0.875rem;
        line-height: 1.333333;
        vertical-align: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        background-color: transparent;
        border: 1px solid transparent;
        border-radius: 33px;
        padding: 5px 20px;
    }


    span.badge.badge-icon {
      height: 2.375rem;
      min-width: 2.375rem;
      width: 2.375rem;
      border-radius: 10px;
      padding: 0 !important;
    }

    span.badge.badge-primary {
        color: white;
        background-color: var(--primary_bg_hover);
        border-color: var(--primary_border_hover);
    }

    span.badge.badge-secondary {
        color: black;
        background-color: var(--secondary_bg_hover);
        border-color: var(--secondary_border_hover);
    }

    span.badge.badge-success {
        color: white;
        background-color: var(--success_bg_hover);
        border-color: var(--success_border_hover);
    }

    span.badge.badge-danger {
        color: white;
        background-color: var(--danger_bg_hover);
        border-color: var(--danger_border_hover);
    }

    span.badge.badge-warning {
        color: white;
        background-color: var(--warning_bg_hover);
        border-color: var(--warning_border_hover);
    }

    span.badge.badge-info {
        color: white;
        background-color: var(--info_bg_hover);
        border-color: var(--info_border_hover);
    }

</style>
