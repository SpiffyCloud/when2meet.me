<template>
  <div class="header p-p-4">
    <div class="title">
      <h1 class="heading">
        {{ title }}
      </h1>
      <i
        class="pi pi-link clickable"
        style="font-size: 1.6rem; margin-left: 10px;"
        @click="copyMeetingUrl"
      ></i>
    </div>
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
