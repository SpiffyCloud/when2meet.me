<template>
    <div class="p-d-flex p-flex-column p-jc-between">
        <div class="p-d-flex p-my-1 p-jc-between p-align-center">
            <p class="p-mr-1 p-text-bold">Urgency:</p>
            <Dropdown
                v-model="selectedFilters.Urgency"
                :options="urgencyOptions"
                :placeholder="urgencyOptions[selectedFilters.Urgency].name"
                optionLabel="name"
            />
        </div>
        <div class="p-d-flex p-my-1 p-jc-between p-align-center">
            <p class="p-mr-1 p-text-bold">Min. Duration:</p>
            <Dropdown
                v-model="selectedFilters.Duration"
                :options="durationOptions"
                :placeholder="durationOptions[selectedFilters.Duration].name"
                optionLabel="name"
            />
        </div>
        <div class="p-d-flex p-my-1 p-jc-between p-align-center">
            <p class="p-mr-1 p-text-bold"># of Available:</p>
            <Dropdown
                v-model="selectedFilters.Available"
                :options="availableOptions"
                :placeholder="availableOptions[selectedFilters.Available]"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { computed, reactive, toRefs } from "vue";
import Dropdown from "primevue/dropdown";

export default {
    name: "Window Filter",
    components: {
        Dropdown,
    },
    props: {
        meeting: {
            type: Object,
        },
    },
    setup(props: any) {
        const { meeting } = toRefs(props);
        const selectedFilters = reactive({
            Urgency: 0,
            Duration: 0,
            Available: 0,
        });
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

        return {
            selectedFilters,
            urgencyOptions,
            durationOptions,
            availableOptions,
        };
    },
};
</script>
