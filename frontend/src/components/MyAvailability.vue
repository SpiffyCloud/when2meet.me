<template>
  <div ref="table-wrapper" class="table-wrapper">
    <AvailabilityTable
      :chartData="chartData"
      @submit-availability="handleSubmit"
    />
  </div>
</template>

<script lang="ts">
import AvailabilityTable from "@/components/AvailabilityTable.vue";
import { toRefs } from "vue";
import useChart from "@/composables/useChart";
import usePostAvailability from "@/composables/usePostAvailability";

export default {
  name: "MyAvailability",
  components: {
    AvailabilityTable,
  },
  props: {
    meeting: {
      type: Object,
      required: true,
    },
  },
  setup(props: any) {
    const { meeting } = toRefs(props);

    return {
      ...useChart(meeting.value), // This loses reactivity but I'm not sure we need to keep it
      ...usePostAvailability(meeting),
    };
  },
};
</script>

<style>
.table-wrapper {
  margin-left: -1.5rem;
  max-height: 90vh;
  height: fit-content;
  width: 100vw;
  overflow-y: scroll;
  overflow-x: scroll;
  background-color: var(--green-600);
}
</style>
