<template>
  <div class="header p-p-4">
    <div class="title">
      <h1 class="heading">{{ title }}</h1>
    </div>
    <button @click="copyMeetingUrl" class="button p-my-4">
      Copy Meeting URL
    </button>
    <button @click="updateShowTable(true, 'All')" class="button p-my-4">
      View All Availability
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'

// Composables
import useCopyUrl from '@/composables/useCopyUrl'

export default defineComponent({
  name: 'Header',
  props: {
    title: String
  },
  setup() {
    const updateShowTable = inject('updateShowTable') as (
      show: boolean,
      user: string
    ) => void

    return {
      updateShowTable,
      ...useCopyUrl()
    }
  }
})
</script>

<style>
.title {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: capitalize;
  height: 5rem;
}
</style>