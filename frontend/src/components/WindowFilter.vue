<template>
    <div class="p-d-flex p-flex-column p-jc-between">
        <div class="p-d-flex p-my-1 p-jc-between p-align-center">
            <p class="p-mr-1 p-text-bold">Urgency:</p>
            <Dropdown
                v-model="selectedUrgency"
                :options="urgencyOptions"
                :placeholder="urgencyOptions[selectedUrgency]"
                optionLabel="name"
            />
        </div>
        <div class="p-d-flex p-my-1 p-jc-between p-align-center">
            <p class="p-mr-1 p-text-bold">Min. Duration:</p>
            <Dropdown
                v-model="selectedDuration"
                :options="durationOptions"
                :placeholder="durationOptions[selectedDuration]"
                optionLabel="name"
            />
        </div>
        <div class="p-d-flex p-my-1 p-jc-between p-align-center">
            <p class="p-mr-1 p-text-bold"># of Available:</p>
            <Dropdown
                v-model="selectedAvailable"
                :options="availableOptions"
                :placeholder="availableOptions[selectedAvailable]"
            />
        </div>
        <div class="p-d-flex p-my-1 p-jc-center p-align-center">
            <Button label="Apply" @click="applyFilter()" />
        </div>
    </div>
</template>

<script lang="ts">
import { computed, reactive, ref, toRefs } from "vue";
import Dropdown from "primevue/dropdown";
import Button from "primevue/button"

export default {
    name: "Window Filter",
    components: {
        Dropdown,
        Button
    },
    props: {
        meeting: {
            type: Object,
        },
    },
    setup(props: any, context: any) {
        const { meeting } = toRefs(props);
        const selectedUrgency = ref();
        const selectedDuration = ref();
        const selectedAvailable = ref();
        const urgencyOptions = [
            { name: "Soonest", code: 0 },
            { name: "Latest", code: 1 },
        ];
        const durationOptions = [
            { name: "15 minutes", code: 0 },
            { name: "30 minutes", code: 1 },
            { name: "1 hour", code: 2 },
            { name: "2 hours", code: 3 },
            { name: "4 hours", code: 4 },
        ];

        const availableOptions = computed(() => {
            return Array.from(
                { length: meeting.value.availability.length },
                (v, i) => `${i + 1}`
            );
        });

        const applyFilter = () => {
            context.emit("apply", {
                urgency: selectedUrgency.value?.code,
                duration: selectedDuration.value?.code,
                available: selectedAvailable.value,
                urgencyOptions,
                durationOptions,
                });
        };

        return {
            selectedUrgency,
            selectedDuration,
            selectedAvailable,
            urgencyOptions,
            durationOptions,
            availableOptions,
            applyFilter,
        };
    },
};
</script>
