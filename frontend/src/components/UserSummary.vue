<template>
  <h3>Summary of your availability</h3>
  <i>See your availability stats and make adjustments</i>
  <div class="stats">
    <div>Total availability: {{ totalAvailability }}</div>
    <div>Longest you can meet: {{ longestMeeting }}</div>
    <div>Ovelap with others: {{ overlapWithOthers }}</div>
  </div>
  <Button @click="handleAdjustBtn" label="Adjust my availability" />
</template>

<script lang="ts">
import { defineComponent, inject, Ref } from 'vue'

import { useStats } from '@/composables/useStats'

import Button from 'primevue/button'

export default defineComponent({
  name: 'UserSummary',
  components: {
    Button
  },
  emits: ['show-adjust'],
  setup() {
    const updateShowTable = inject('updateShowTable') as (
      show: boolean,
      user: string
    ) => void
    const activeUser = inject('activeUser') as Ref<string>

    const handleAdjustBtn = () => {
      updateShowTable(true, activeUser.value)
    }

    return {
      ...useStats(),
      handleAdjustBtn
    }
  }
})
</script>

<style></style>
