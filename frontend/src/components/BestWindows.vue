<template>
  <h3 class="p-mb-2">
    Best Windows of Availability
    <i
      v-if="windows.length > 0"
      class="pi pi-filter"
      @click="showWindowFilter = true"
      style="fontsize: 2rem"
    ></i>
  </h3>
  <div v-if="windows.length > 0" class="window-group">
    <Window v-for="(window, index) in windows.slice(3)" :key="index" />
    <Dialog
      header="Best Window Options"
      v-model:visible="showWindowFilter"
      :modal="true"
    >
      <WindowFilter @apply="updateWindows($event)" :meeting="meeting" />
    </Dialog>
    <div class="p-d-flex p-jc-end">
      <Button label="View all" class="p-button" @click="viewAll = true" />
    </div>
  </div>
  <div v-else class="p-d-flex p-jc-center empty-message p-shadow-5 p-mb-4">
    <h3>No Availability yet! Be the first!</h3>
  </div>
</template>

<script lang="ts">
// PrimeVue Components
import Dialog from "primevue/dialog";
import Button from "primevue/button";

// Internal Components
import Window from "@/components/Window.vue";
import WindowFilter from "@/components/WindowFilter.vue";

// Composables
import useWindows from "@/composables/useWindows";

export default {
  name: "BestWindows",
  components: {
    Dialog,
    Button,
    Window,
    WindowFilter,
  },
  setup() {
    return {
      ...useWindows(),
    };
  },
};
</script>

<style scoped></style>
