<template>
  <div id="name-group">
    <label class="label p-mb-2" for="name">What's its name?</label>
    <em class="assitive">Type the meeting name you want here</em>
    <input class="input p-mt-2" v-model="title" />

    <p v-if="error" id="name-help" class="p-error p-text-bold p-mt-2">
      <i class="pi pi-exclamation-triangle p-mr-1"></i>{{ error }}
    </p>
  </div>
</template>

<style>
.label {
  font-size: 1.5rem;
  font-weight: bold;
  display: block;
}

.assitive {
  font-size: 1.5rem;
  opacity: 0.5;
}

.input {
  height: 2.5rem;
  width: 100%;
  background: none;
  color: var(--text);
  font-size: 1.5rem;
  outline: none;
  border: none;
  border-bottom: 2px solid var(--secondary);
}
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
