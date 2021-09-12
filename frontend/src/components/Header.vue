<template>
  <h1 id="heading">{{ title }}</h1>
  <Button
    label="Copy Meeting URL"
    @click="copyMeetingUrl"
    class="p-button-lg p-button-success p-my-3 p-shadow-5"
  />
  <Button
    label="View All Availability"
    @click="viewAllAvailability"
    class="p-button-lg p-button-success p-my-3 p-shadow-5"
  />
</template>

<script>
import { defineComponent } from "vue";

// Primevue components
import Button from "primevue/button";

// Composables
import useCopyUrl from "@/composables/useCopyUrl";

export default defineComponent({
  name: "Header",
  components: {
    Button,
  },
  props: {
    title: String,
  },
  emits: ["view-all"],
  setup(_, { emit }) {

    const viewAllAvailability = () => {
      emit("view-all")
    }

    return {
      viewAllAvailability,
      ...useCopyUrl(),
    };
  },
});
</script>
