<template>
  <div class="p-mt-5">
    <BestWindows />
    <Responders :responders="meeting.availability" is-identified />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Internal Components
import BestWindows from "@/components/BestWindows.vue";
import Responders from "@/components/Responders.vue";

export default defineComponent({
  name: "AllAvailability",
  components: {
    BestWindows,
    Responders,
  },
  props: {
    meeting: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {};
  },
});
</script>
