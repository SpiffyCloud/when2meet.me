<template>
  <div id="root" ref="root" class="p-field p-text-left p-d-flex p-flex-column">
    <label class="p-text-bold" for="name">What is this meeting for?</label>
    <InputText
      id="name"
      type="text"
      placeholder="The Grandiose Meeting"
      v-model="value"
      :class="{ 'p-invalid': this.error }"
      class="p-shadow-5 p-inputtext-lg"
    />
    <p v-if="this.error" id="name-help" class="p-error p-text-bold p-mt-2">
      <i class="pi pi-exclamation-triangle p-mr-1"></i>{{ this.error }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import InputText from "primevue/inputtext";

const NameInput = defineComponent({
  components: { InputText },

  setup() {
    const value = ref("");
    const error = ref("");

    return {
      value,
      error,
    };
  },
});

export default NameInput;
</script>
