<template>
  <div class="p-mt-5">
    <BestWindows />
    <Responders
      :availability="availability"
      is-identified
      @user-clicked="onUserClicked"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, toRefs } from "vue";

// Internal Components
import BestWindows from "@/components/BestWindows.vue";
import Responders from "@/components/Responders.vue";
import AvailabilityTable from "@/components/AvailabilityTable.vue";

import { availability } from "@/api/meeting";

export default defineComponent({
  name: "AllAvailability",
  components: {
    BestWindows,
    Responders,
    AvailabilityTable,
  },
  props: {},
  emit: ["user-clicked"],
  setup(props: any, { emit }) {
    const onUserClicked = (name: string) => {
      emit("user-clicked", name);
    };

    return {
      onUserClicked,
    };
  },
});
</script>
