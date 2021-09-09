<template>
  <div class="p-mt-5">
    <BestWindows :availability="availability" />
    <Responders
      :availability="availability"
      is-identified
      @user-clicked="onUserClicked"
    />
    <div class="page" v-if="isAdjusting">
      <AvailabilityTable
        :chartData="chartData"
        @submit-availability="isAdjusting = false"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs } from "vue";

// Internal Components
import BestWindows from "@/components/BestWindows.vue";
import Responders from "@/components/Responders.vue";
import AvailabilityTable from "@/components/AvailabilityTable.vue";

import { availability } from "@/api/meeting";
import useChart from "@/composables/useChart";

export default defineComponent({
  name: "AllAvailability",
  components: {
    BestWindows,
    Responders,
    AvailabilityTable,
  },
  props: {
    availability: {
      type: Array as () => availability[],
    },
    by_end_date: {
      type: String,
    },
  },
  setup(props: any) {
    const isAdjusting = ref(false);
    const { availability, by_end_date } = toRefs(props);

    const onUserClicked = () => {
      isAdjusting.value = true;
    };

    return {
      ...useChart(availability, by_end_date, isAdjusting),
      isAdjusting,
      onUserClicked,
    };
  },
});
</script>
