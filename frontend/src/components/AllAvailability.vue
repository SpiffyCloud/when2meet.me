<template>
  <div class="p-mt-5">
    <BestWindows :availability="availability" />
    <Responders
      :availability="availability"
      is-identified
      @user-clicked="onUserClicked"
    />
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
  emit: ["user-clicked"],
  setup(props: any,  { emit }) {
    const onUserClicked = (name: string) => {
      emit("user-clicked", name)
    };

    return {
      onUserClicked,
    };
  },
});
</script>
