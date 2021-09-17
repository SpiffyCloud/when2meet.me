<template>
  <div class="p-d-flex p-flex-column p-jc-between">
    <div class="p-d-flex p-my-1 p-jc-between p-align-center">
      <p class="p-mr-1 p-text-bold">Urgency:</p>
      <Dropdown
        v-model="filters.urgency"
        :options="urgencyOptions"
        :placeholder="defaults.urgency"
      />
    </div>
    <div class="p-d-flex p-my-1 p-jc-between p-align-center">
      <p class="p-mr-1 p-text-bold">Min. Duration:</p>
      <Dropdown
        v-model="filters.duration"
        :options="durationOptions"
        :placeholder="defaults.duration"
      />
    </div>
    <div class="p-d-flex p-my-1 p-jc-between p-align-center">
      <p class="p-mr-1 p-text-bold"># of Available:</p>
      <Dropdown
        v-model="filters.available"
        :options="availableOptions"
        :placeholder="defaults.available"
      />
    </div>
    <div class="p-d-flex p-my-1 p-jc-center p-align-center">
      <Button label="Apply" @click="applyFilter()" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, onMounted, reactive, ref, toRefs } from "vue";
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";

export default {
  name: "Window Filter",
  components: {
    Dropdown,
    Button,
  },
  props: {
    availability: {
      type: Object,
    },
    defaults: {
      type: Object,
    },
  },
  setup(props: any, context: any) {
    const { availability } = toRefs(props);
    const filters = reactive({
      urgency: "",
      duration: "",
      available: "",
    });
    const urgencyOptions = ["Soonest", "Latest"];

    const durationOptions = [
      "15 minutes",
      "30 minutes",
      "1 hour",
      "2 hours",
      "4 hours",
    ];

    const availableOptions = computed(() => {
      return Array.from(
        { length: availability.value.length },
        (v, i) => `${i + 1}`
      );
    });

    const applyFilter = () => {
      context.emit("apply", filters);
    };

    return {
      filters,
      urgencyOptions,
      durationOptions,
      availableOptions,
      applyFilter,
    };
  },
};
</script>
