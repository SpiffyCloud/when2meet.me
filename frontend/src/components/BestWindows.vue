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
    <Window
      v-for="(window, index) in windows"
      :time="window.start"
      :duration="window.windowLength"
      :key="index"
    />
    <Dialog
      header="Best Window Options"
      v-model:visible="showWindowFilter"
      :modal="true"
    >
      <WindowFilter
        @apply="updateWindows($event)"
        :availability="availability"
        :defaults="defaults"
      />
    </Dialog>
  </div>
  <i v-else>No Availability yet! Be the first!</i>
</template>

<script lang="ts">
import { computed, inject, toRefs } from "vue";
// PrimeVue Components
import Dialog from "primevue/dialog";
import Button from "primevue/button";

// Internal Components
import Window from "@/components/Window.vue";
import WindowFilter from "@/components/WindowFilter.vue";

// Composables
import useWindows from "@/composables/useWindows";
import { meeting } from "@/api/meeting";

export default {
  name: "BestWindows",

  components: {
    Dialog,
    Button,
    Window,
    WindowFilter,
  },
  setup() {
    const meeting = inject("meeting") as meeting;
    const numAvailable = computed(() => {
      return meeting.availability.length;
    });
    const defaults = computed(() => {
      return {
        urgency: 1,
        duration: 4,
        available: numAvailable.value,
      };
    });
    return {
      ...useWindows(meeting.availability, defaults),
      defaults,
    };
  },
};
</script>

<style scoped></style>
