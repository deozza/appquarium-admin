<template>
  <div class="flex-row flex-between">
    <span :class="'fa-stack fa-'+baseStatsModele.icons.length+'x'">
      <i v-for="(icon, index) in baseStatsModele.icons" v-bind:key="index" :class="icon"></i>
    </span>
    <div>
      <BaseHeader :base-header-model="header" />
      <BaseParagraph :base-paragraph-model="paragraph"/>
    </div>
  </div>
</template>

<script lang="ts">
import BaseStatsModel from "./BaseStatsModel";
import BaseParagraph from "~/components/atoms/typography/paragraph/BaseParagraph.vue";
import BaseParagraphModel from "~/components/atoms/typography/paragraph/BaseParagraphModel";
import BaseHeader from "~/components/atoms/typography/header/BaseHeader.vue";
import BaseHeaderModel from "~/components/atoms/typography/header/BaseHeaderModel";
import Vue from "vue";

export default Vue.extend({
  name: "BaseStatsVue",
  components: {
    BaseParagraph,
    BaseHeader
  },
  props: {
    baseStatsModele: {
      type: BaseStatsModel,
      required: true
    }
  },
  computed: {
    header(): BaseHeaderModel {
      return new BaseHeaderModel(this.baseStatsModele.title, 3)
    },
    paragraph(): BaseParagraphModel {
      return new BaseParagraphModel(this.baseStatsModele.stat)
    }
  }
})

</script>

<style scoped>
div.flex-row{
  flex: 1 1 auto;
  padding: 12px;
  background: white;
  border: 1px solid white;
  border-radius: 12px;
  margin: 12px;
}

div.flex-row > div > p {
  margin: 12px 0;
}
</style>
