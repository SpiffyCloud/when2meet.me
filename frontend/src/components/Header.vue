<template>
  <div class="header p-p-4">
    <div class="title">
      <h1 class="heading">{{ title }}</h1>
    </div>
    <button
      @click="copyMeetingUrl"
      class="button p-my-4"
      :class="{ copied: copied }"
    >
      {{ buttonText }}
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

// Composables
import useCopyUrl from '@/composables/useCopyUrl'

export default defineComponent({
  name: 'Header',
  props: {
    title: String
  },
  setup() {
    return {
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
  height: 3rem;
}

.copied {
  background-color: #7ccba9;
  font-style: italic;
}
</style>