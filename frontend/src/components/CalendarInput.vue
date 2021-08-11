<template>
  <div id="date-group" class="p-field p-text-left p-d-flex p-flex-column">
    <label for="date" class="p-text-bold">When do you need to meet by?</label>
    <Calendar
      id="touchUI"
      v-model="value"
      :inline="true"
      :class="{ 'p-invalid': this.error }"
      class="p-shadow-5 p-inputtext-lg"
    />
    <p v-if="this.error" id="date-help" class="p-error p-text-bold p-mt-2">
      <i class="pi pi-exclamation-triangle p-mr-1"></i>{{ this.error }}
    </p>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";

import Calendar from "primevue/calendar";

export default {
  name: "CalendarInput",
  components: {
    Calendar,
  },
  setup() {
    const value = ref("");
    const error = ref("");

    return {
      value,
      error,
    };
  },
};
</script>
