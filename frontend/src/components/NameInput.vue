<template>
  <div id="name-group">
    <label class="label p-mb-2" for="name">What's its name?</label>
    <em class="assistive">Type the meeting name you want here.</em>
    <input
      class="input p-mt-2"
      id="title-input"
      v-model="title"
      :class="{ 'input-error': error }"
    />

    <p v-if="error" id="name-help" class="error-text">
      {{ error }}
    </p>
  </div>
</template>

<style>
</style>

<script lang="ts">
import { ref, watch } from 'vue'

export default {
  name: 'NameInput',
  components: {},
  emits: ['update:title'],
  props: {
    error: {
      type: String,
      default: ''
    }
  },
  setup(_, context: any) {
    const title = ref(context.attrs.title)

    watch(title, (newVal: string) => {
      context.emit('update:title', newVal)
    })

    return {
      title
    }
  }
}
</script>
