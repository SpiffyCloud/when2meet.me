<template>
    <div id="date-group" class="p-field p-text-left p-d-flex p-flex-column">
        <label for="date" class="p-text-bold"
            >When do you need to meet by?</label
        >
        <Calendar
            id="touchUI"
            name="date"
            v-model="date"
            :inline="true"
            :class="{ 'p-invalid': error }"
            class="p-shadow-5 p-inputtext-lg"
            :selectOtherMonths="true"
            :minDate="new Date()"
        />
        <p v-if="error" id="date-help" class="p-error p-text-bold p-mt-2">
            <i class="pi pi-exclamation-triangle p-mr-1"></i>{{ error }}
        </p>
    </div>
</template>

<script lang="ts">
import { ref, watch } from "vue";

import Calendar from "primevue/calendar";

export default {
    name: "CalendarInput",
    components: {
        Calendar,
    },
    props: {
        error: {
            type: String,
            default: "",
        },
    },
    setup(_, context: any) {
        const date = ref(new Date());
        watch(date, (newVal: Date) => {
          context.emit("update:date", newVal.toISOString());
        });
        return {
            date,
        };
    },
};
</script>
