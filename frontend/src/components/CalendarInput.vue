<template>
  <div id="date-group">
    <label for="date" class="label p-mt-5 p-mb-2"
      >When do you need to meet by?</label
    >
    <em class="assistive">This is optional.</em>
    <Calendar
      id="touchUI"
      name="date"
      v-model="date"
      :inline="true"
      :class="{ 'p-invalid': error }"
      class="p-mt-2"
      :minDate="new Date()"
    />
    <p v-if="error" id="date-help" class="p-error p-text-bold p-mt-2">
      <i class="pi pi-exclamation-triangle p-mr-1"></i>{{ error }}
    </p>
  </div>
</template>

<style>
/* Overriding base calendar styles */
.p-calendar {
  width: 100%;
}

.p-component {
  font-family: 'Montserrat', sans-serif !important;
}

.p-datepicker,
.p-datepicker-header {
  background: var(--primary) !important;
  color: var(--text) !important;
  border: none !important;
  font-size: 1.5rem;
}
td.p-datepicker-other-month > .p-disabled {
  display: none !important;
}
.p-datepicker {
  font-size: 1.5rem;
  padding: 0 !important;
}
.p-datepicker table {
  font-size: 1.5rem !important;
  font-weight: 500 !important;
}
.p-datepicker-group-container {
  width: 100%;
}

.p-datepicker table td > span {
  height: 3rem;
  width: 3rem;
}

.p-datepicker table td > span.p-highlight,
.p-datepicker table td.p-datepicker-today > span {
  border: 2px var(--secondary) solid !important;
  background: none !important;
  color: var(--text) !important;
}

table.p-datepicker-calendar > thead {
  display: none;
}

.p-datepicker-other-month {
  border-top: none !important;
}

table.p-datepicker-calendar > tbody > tr > td {
  border-top: 1px solid var(--secondary);
  padding-bottom: 1rem;
}
</style>

<script lang="ts">
import { ref, watch } from 'vue'

import Calendar from 'primevue/calendar'

export default {
  name: 'CalendarInput',
  components: {
    Calendar
  },
  props: {
    error: {
      type: String,
      default: ''
    }
  },
  setup(_, context: any) {
    const date = ref(new Date())
    watch(date as any, (newVal: Date) => {
      context.emit('update:date', newVal.toISOString())
    })
    return {
      date
    }
  }
}
</script>
