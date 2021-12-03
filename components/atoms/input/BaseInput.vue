<script lang="ts">
import BaseInputModel from "./BaseInputModel";

export default {
  name: "BaseInputVue",
  props: {
    baseInputModel: {
      type: BaseInputModel,
      required: true
    }
  }
}

</script>

<template>
  <li class="flex-column">
    <div class="flex-row input-row">
      <label :class="baseInputModel.style" :for="baseInputModel.id">{{ baseInputModel.label }} <span
        v-if="baseInputModel.required" class="required-field">*</span></label>
      <input :type="baseInputModel.type" :id="baseInputModel.id" :name="baseInputModel.name"
             :required="baseInputModel.required" v-model="baseInputModel.value">
    </div>
  </li>
</template>


<style scoped>
li {
  margin: 12px 0;
}

li > div.input-row {
  padding: 0.5em;
  align-items: normal;
  width: 98%;
}

li > div.input-row > label {
  flex: 1;
  padding: 0.5em 1em 0.5em 0;
}

li > div.input-row > label > span.required-field {
  margin-left: 6px;
  color: var(--danger_text);
}

li > div.input-row > input {
  flex: 2;
}

li.error {
  color: var(--danger_text);
}

label.light {
  color: black;
}

label.dark {
  color: white;
}

label.primary {
  color: var(--primary_text);
}

label.secondary {
  color: var(--secondary_text);
}

label.success {
  color: var(--success_text);
}

label.danger {
  color: var(--danger_text);
}

label.warning {
  color: var(--warning_text);
}

label.info {
  color: var(--info_text);
}

@media screen and (max-width: 760px) {
  li .flex-row {
    flex-direction: column;
  }
}
</style>
