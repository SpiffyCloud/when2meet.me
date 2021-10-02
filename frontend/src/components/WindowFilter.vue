<template>
  <div class="p-d-flex p-flex-column p-jc-between">
    <div class="p-d-flex p-my-1 p-jc-between p-align-center">
      <p class="p-mr-1 p-text-bold">Urgency:</p>
      <Dropdown
        v-model="filters.urgency"
        @change="updateFilter('urgency', $event)"
        :options="urgencyOptions"
        :placeholder="urgencyOptions[filters.urgency]"
      />
    </div>
    <div class="p-d-flex p-my-1 p-jc-between p-align-center">
      <p class="p-mr-1 p-text-bold">Min. Duration:</p>
      <Dropdown
        v-model="filters.duration"
        @change="updateFilter('duration', $event.value)"
        :options="durationOptions"
        optionLabel="label"
        :placeholder="durationOptions[filters.duration].label"
      />
    </div>
    <div class="p-d-flex p-my-1 p-jc-between p-align-center">
      <p class="p-mr-1 p-text-bold"># of Available:</p>
      <Dropdown
        v-model="filters.available"
        @change="updateFilter('available', $event)"
        :options="availableOptions"
        :placeholder="filters.available.toString()"
      />
    </div>
    <div class="p-d-flex p-my-1 p-jc-center p-align-center">
      <Button label="Apply" @click="updateWindowFilter(false)" />
    </div>
  </div>
</template>

<script lang="ts">
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import { inject } from 'vue'

export default {
  name: 'Window Filter',
  components: {
    Dropdown,
    Button
  },
  props: {
    urgencyOptions: {
      type: Object,
      required: true
    },
    durationOptions: {
      type: Object,
      required: true
    },
    availableOptions: {
      type: Array,
      required: true
    }
  },
  setup() {
    const updateWindowFilter = inject('updateWindowFilter') as (
      show: boolean
    ) => void
    const updateFilter = inject('updateFilter') as (
      filter: string,
      value: string
    ) => void
    const filters = inject('filters') as any

    return {
      updateWindowFilter,
      updateFilter,
      filters
    }
  }
}
</script>
