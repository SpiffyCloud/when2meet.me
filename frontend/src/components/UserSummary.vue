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

    const longestMeeting = computed(() => {
      const userIndex = meeting.availability.findIndex((a) => {
        return a.name === activeUser.value
      })
      if (userIndex == -1) return 0

      // longest continuous block of time ( using a reducer for fun)
      let previous
      let max = 0
      const longest = meeting.availability[userIndex].slots.reduce(
        (acc, curr) => {
          if (acc == 0) {
            previous = curr
            return 1
          } else if (curr - previous == 1) {
            previous = curr
            return acc + 1
          } else {
            max = acc
            return max
          }
        },
        0
      )
      const longestInMinutes = longest * 15
      // convert longestInMinutes to hours and minutes
      const hours = Math.floor(longestInMinutes / 60)
      const minutes = longestInMinutes % 60
      return `${hours} hr ${minutes} min`
    })

    const overlapWithOthers = computed(() => {
      // count the total number of slots across all users
      const totalSlots = meeting.availability.reduce((acc, curr) => {
        return acc + curr.slots.length
      }, 0)
      // make a set of all the slots
      const slots = meeting.availability.reduce((acc, curr) => {
        return acc.concat(...(curr.slots as any))
      }, []) as any
      console.log(slots.length)
      // total slots that active user has in the set
      const userIndex = meeting.availability.findIndex((a) => {
        return a.name === activeUser.value
      })
      if (userIndex == -1) return 0
      const userSlots = Array.from(meeting.availability[userIndex].slots)
      const overlap = slots.filter((slot) => {
        return userSlots.includes(slot)
      })
      console.log(overlap.length)
      // return perecentage of overlap to slots roudned to 2 decimal places
      const fraction = (overlap.length / totalSlots) * 100
      return `${fraction.toFixed(2)}%`
    })

    return {
      totalAvailability,
      longestMeeting,
      overlapWithOthers,
      handleAdjustBtn
    }
  }
})
</script>

<style></style>
