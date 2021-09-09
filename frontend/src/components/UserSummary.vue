<template>
  <h3>Summary of your availability</h3>
  <i>See your availability stats and make adjustments</i>
  <div class="stats">
    <div>
      Total availability: <span class="number">4</span> hr
      <span class="number">30</span> min
    </div>
    <div>Longest you can meet: <span class="number">30</span> min</div>
    <div>Ovelap with others: <span class="number">72</span> %</div>
  </div>
  <Button @click="handleAdjustBtn" label="Adjust my availability" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Button from "primevue/button";

export default defineComponent({
  name: "UserSummary",
  components: {
    Button,
  },
  emits: ["show-adjust"],
  setup(_, { emit }) {
    const handleAdjustBtn = () => {
      emit("show-adjust");
    };

    return {
      handleAdjustBtn,
    };
  },
});
</script>

<style></style>
