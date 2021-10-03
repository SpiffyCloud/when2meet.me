<template>
  <h3 class="label">
    Best Windows of Availability
    <i
      v-if="meeting.availability.length > 0"
      class="pi pi-filter"
      @click="updateWindowFilter(true)"
      style="fontsize: 2rem"
    ></i>
  </h3>
  <div v-if="windows.length > 0" class="window-group">
    <em class="assistive">Click the filter icon above to update windows</em>
    <Window
      v-for="window in windows"
      :time="window.start"
      :duration="window.windowLength"
      :responses="window.numOfPeople"
      :key="window.start"
    />
  </div>
  <em class="assistive" v-else-if="meeting.availability.length > 0"
    >No windows match those filters. Click the filter icon above to find new
    windows.</em
  >
  <em class="assistive" v-else>No availability yet! Be the first!</em>

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

<style></style>
