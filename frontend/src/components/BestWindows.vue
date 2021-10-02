<template>
  <h3 class="p-mb-2">
    Best Windows of Availability
    <i
      class="pi pi-filter"
      @click="updateWindowFilter(true)"
      style="fontsize: 2rem"
    ></i>
  </h3>
  <div v-if="windows.length > 0" class="window-group">
    <Window
      v-for="window in windows"
      :time="window.start"
      :duration="window.windowLength"
      :responses="window.numOfPeople"
      :key="window.start"
    />
  </div>
  <i v-else-if="meeting.availability.length > 0"
    >No meetings match those filters!</i
  >
  <i v-else>No availability yet! Be the first!</i>

  <Dialog
    header="Best Window Options"
    v-model:visible="showWindowFilter"
    :modal="true"
  >
    <WindowFilter
      :urgencyOptions="urgencyOptions"
      :durationOptions="durationOptions"
      :availableOptions="availableOptions"
    />
  </Dialog>
</template>

<script lang="ts">
// PrimeVue Components
import Dialog from 'primevue/dialog'

// Internal Components
import Window from '@/components/Window.vue'
import WindowFilter from '@/components/WindowFilter.vue'

// Composables
import useWindows from '@/composables/useWindows'
import { inject } from 'vue'

import { meeting } from '@/api/meeting'

export default {
  name: 'BestWindows',

  components: {
    Dialog,
    Window,
    WindowFilter
  },
  setup() {
    const meeting = inject('meeting') as meeting
    return {
      meeting,
      ...useWindows()
    }
  }
}
</script>

<style scoped></style>
