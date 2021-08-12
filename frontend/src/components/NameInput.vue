<template>
  <div id="name-group" class="p-field p-text-left p-d-flex p-flex-column">
    <label class="p-text-bold" for="name">What is this meeting for?</label>
    <InputText
      id="name"
      type="text"
      v-model="title"
      placeholder="The Grandiose Meeting"
      :class="{ 'p-invalid': this.error }"
      class="p-shadow-5 p-inputtext-lg"
    />
    <p v-if="this.error" id="name-help" class="p-error p-text-bold p-mt-2">
      <i class="pi pi-exclamation-triangle p-mr-1"></i>{{ this.error }}
    </p>
  </div>
</template>

<script lang="ts">
import { ref, toRefs, watch } from "vue";

import InputText from "primevue/inputtext";

export default {
  name: "NameInput",
  components: {
    InputText,
  },
  emits: ["update:title"],
  setup(props: any, context: any) {
    const title = ref(context.attrs.title);
    const error = ref("");

    watch(title, (newVal: string) => {
      context.emit("update:title", newVal);
    });

    return {
      title,
      error,
    };
  },
};
</script>
