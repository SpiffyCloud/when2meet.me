<template>
  <div id="new-user-group" class="p-d-flex p-flex-column">
    <h3>Who are you?</h3>
    <i class="">Type your name here to enter your availability</i>
    <InputText
      id="name"
      type="text"
      v-model="name"
      placeholder="The Brash Baluga"
      class="p-shadow-5 p-inputtext-lg"
      :class="{ 'p-invalid': nameError?.length > 0 }"
      @keydown="handleKeyDown($event)"
    />
    <p
      v-if="nameError?.length > 0"
      id="name-help"
      class="p-error p-text-bold p-mt-2"
    >
      <i class="pi pi-exclamation-triangle p-mr-1"></i>{{ nameError }}
    </p>
    <Button
      class="p-button-success p-button-lg p-my-4 p-shadow-5"
      label="Add My Availability"
      @click="addNewUser"
    />
  </div>
</template>

<script lang="ts">
import InputText from "primevue/inputtext";
import Button from "primevue/button";

import usePostNewUser from "@/composables/usePostNewUser";

export default {
  components: {
    InputText,
    Button,
  },
  emits: ["new-user-added"],
  setup(_, { emit }) {
    return {
      ...usePostNewUser(emit),
    };
  },
};
</script>
