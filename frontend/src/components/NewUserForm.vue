<template>
  <div id="new-user-group" class="p-field p-d-flex p-flex-column p-jc-between">
    <h3 id="new-user-title" class="p-text-bold p-mt-4">Can't find your name?</h3>
    <small class="p-text-bold p-mb-2"
      >Type your name here to enter your availability</small
    >
    <InputText
      id="name"
      type="text"
      placeholder="The Brash Baluga"
      class="p-shadow-5 p-inputtext-lg"
    />
    <Button
      class="p-button-success p-button-lg p-my-4 p-shadow-5"
      label="Add My Availability"
    />
  </div>
</template>

<script lang="ts">
import InputText from "primevue/inputtext";
import Button from "primevue/button";

export default {
  components: {
    InputText,
    Button,
  },
  setup() {
    return {};
  },
};
</script>
