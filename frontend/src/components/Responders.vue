<template>
  <h3 id="responders-title" class="label p-mt-3">Responders</h3>
  <div v-if="responders.length > 0">
    <div>
      <em class="assistive" v-if="activeUser">
        Click on a responder to see their availability or update your own.
      </em>
      <em v-else class="assistive">
        Click your name below to update your availability
      </em>
    </div>
    <button
      v-for="name in responders"
      @click="onClick(name)"
      :key="name"
      class="button-secondary"
    >
      {{ name }}
    </button>
  </div>

  <em class="assistive" v-else>No responders yet!</em>
</template>

<script lang="ts">
// Primevue Components
import { computed, inject } from 'vue'

export default {
  name: 'Responders',
  setup() {
    const meeting = inject('meeting') as any // todo change name of "meeting" to "meetingType" or something to prevent conflicts
    const activeUser = inject('activeUser') as any
    const updateShowTable = inject('updateShowTable') as (
      show: boolean,
      user: string
    ) => void

    const responders = computed(() => {
      return meeting.availability.map((resp) => resp.name)
    })

    const onClick = (name) => {
      updateShowTable(true, name)
    }

    return {
      activeUser,
      responders,
      onClick
    }
  }
}
</script>

<style scoped></style>
