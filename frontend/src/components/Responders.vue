<template>
  <h3 id="responders-title" class="p-text-bold">Responders</h3>
  <div v-if="responders.length > 0">
    <small class="p-text-bold p-mb-1"
      >Click your name below to update your availability</small
    >

    <Button
      v-for="resp in responders"
      @click="selectUser(resp.name)"
      :key="resp.name"
      :label="resp.name"
      class="p-button p-bg-white p-m-1 p-button-lg p-shadow-2 response-btn"
    />
  </div>
  <div v-else>No responders yet!</div>
</template>

<script lang="ts">
// Primevue Components
import Button from "primevue/button";

export default {
  name: "Responders",
  components: {
    Button,
  },
  props: {
    responders: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  setup(_, { emit }) {
    const selectUser = (name: string) => {
      emit("select-user", name);
    };

    return {
      selectUser,
    };
  },
};
</script>

<style scoped></style>
