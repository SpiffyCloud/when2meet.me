<template>
  <UserSummary v-if="isIdentified" @show-adjust="isAdjusting = true" />
  <NewUserForm v-else @new-user-added="handleNewUser" />
  <div class="page" v-if="isAdjusting">
    <AvailabilityTable
      :chartData="chartData"
      @submit-availability="submitAvailability"
    />
  </div>
</template>

<script lang="ts">
import { ref, toRefs } from "vue";

import AvailabilityTable from "@/components/AvailabilityTable.vue";
import UserSummary from "@/components/UserSummary.vue";
import NewUserForm from "@/components/NewUserForm.vue";

import useChart from "@/composables/useChart";
import usePostAvailability from "@/composables/usePostAvailability";

import { availability } from "@/api/meeting";

import Button from "primevue/button";

export default {
  name: "MyAvailability",
  components: {
    AvailabilityTable,
    UserSummary,
    NewUserForm,
    Button,
  },
  props: {
    availability: {
      type: Array as () => availability[],
      required: true,
    },
    by_end_date: {
      type: String,
      required: true,
    },
    isIdentified: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["user-identified", "updated-availability"],
  setup(props: any, { emit }) {
    const { availability, by_end_date } = toRefs(props);
    const isAdjusting = ref(false);

    const handleNewUser = (name: string) => {
      isAdjusting.value = true;
      emit("user-identified", name);
    };

    return {
      ...useChart(availability, by_end_date, isAdjusting),
      ...usePostAvailability(emit, isAdjusting),
      isAdjusting,
      handleNewUser,
    };
  },
};
</script>

<style></style>
