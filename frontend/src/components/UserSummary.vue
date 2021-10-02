<template>
  <h3>Summary of your availability</h3>
  <i>See your availability stats and make adjustments</i>
  <div class="stats">
    <div>Total availability: {{ totalAvailability }}</div>
    <div>Longest you can meet: <span class="number">30</span> min</div>
    <div>Ovelap with others: <span class="number">72</span> %</div>
  </div>
  <Button @click="handleAdjustBtn" label="Adjust my availability" />
</template>

<script lang="ts">
import { computed, defineComponent, inject, Ref } from 'vue'

import { meeting } from '@/api/meeting'

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

    const meeting = inject('meeting') as meeting
    const totalAvailability = computed(() => {
      const userIndex = meeting.availability.findIndex((a) => {
        return a.name === activeUser.value
      })
      if (userIndex == -1) return 0

      const totalMinutes = meeting.availability[userIndex].slots.length * 15
      // convert totalMinutes to hours and minutes
      const hours = Math.floor(totalMinutes / 60)
      const minutes = totalMinutes % 60
      return `${hours} hr ${minutes} min`
    })

    return {
      totalAvailability,
      handleAdjustBtn
    }
  }
})
</script>

<style></style>
