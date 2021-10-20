<template>
  <div class="p-mt-5 p-p-3">
    <BestWindows />
    <button @click="updateShowTable(true, 'All')" class="button p-my-4">
      View All Availability
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'

// Internal Components
import BestWindows from '@/components/BestWindows.vue'

export default defineComponent({
  name: 'AllAvailability',
  components: {
    BestWindows
  },
  setup() {
    const updateShowTable = inject('updateShowTable') as (
      show: boolean,
      user: string
    ) => void
    return { updateShowTable }
  }
})
</script>
