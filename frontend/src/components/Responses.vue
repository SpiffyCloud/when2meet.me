<template>
  <div id="responses-group" class="p-field p-d-flex p-flex-column p-jc-between p-mb-4">
    <h3 id="responders-title" class="p-text-bold">Responders</h3>
    <small class="p-text-bold p-mb-2"
      >Click your name below to update your availability</small
    >
    <div id="responders-group" class="p-d-flex p-jc-start p-flex-wrap">
      <Button
        v-for="resp in meeting.availability"
        :key="resp.name"
        :label="resp.name"
        class="p-button p-bg-white p-m-1 p-button-lg p-shadow-2"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Button from "primevue/button";
export default {
  components: {
    Button,
  },
  props: {
    meeting: {
      type: Object,
      required: true,
    },
  },
  setup(props: any) {
    return {};
  },
};
</script>
