<template>
  <h3 id="responders-title" class="p-text-bold">Responders</h3>
  <div v-if="responders.length > 0">
    <p class="p-text-bold p-mb-1" v-if="activeUser">
      Click on a responder to see his or her individual availability
    </p>
    <p v-else class="p-text-bold p-mb-1">
      Click your name below to update your availability
    </p>
    <Button
      v-for="name in responders"
      @click="onClick"
      :key="name"
      :label="name"
      class="p-button p-bg-white p-m-1 p-button-lg p-shadow-2 response-btn"
    />
  </div>
  <div v-else>No responders yet!</div>
</template>

<script lang="ts">
// Primevue Components
import Button from "primevue/button";
import { computed, inject } from "vue";

export default {
  name: "Responders",
  components: {
    Button,
  },
  setup() {
    const meeting = inject("meeting") as any; // todo change name of "meeting" to "meetingType" or something to prevent conflicts
    const activeUser = inject("activeUser") as string;
    const updateShowTable = inject("updateShowTable") as (show: boolean, user: string) => void;

    const responders = computed(() => {
      return meeting.availability.map((resp) => resp.name);
    });

    const onClick = (name: string) => {
      updateShowTable(true, name);
    }

    return {
      activeUser,
      responders,
      onClick,
    };
  },
};
</script>

<style scoped></style>
