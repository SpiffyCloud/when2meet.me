<template>
  <div id="responses-group" class="p-field p-d-flex p-flex-column p-jc-between p-mb-4">
    <div
      v-if="meeting.availability?.length > 0"
      id="responders-group"
      class="p-d-flex p-jc-start p-flex-wrap"
    >
      <h3 id="responders-title" class="p-text-bold">Responders</h3>

      <small class="p-text-bold p-mb-2"
        >Click your name below to update your availability</small
      >
      <Button
        v-for="resp in meeting.availability"
        :key="resp.name"
        :label="resp.name"
        class="p-button p-bg-white p-m-1 p-button-lg p-shadow-2"
      />
    </div>

    <!-- <div v-else id="no-responses-yet" class="p-field p-d-flex">
      <p class="p-text-bold">
        <small>No one has responded to this meeting yet.</small>
      </p>
    </div> -->
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
};
</script>
