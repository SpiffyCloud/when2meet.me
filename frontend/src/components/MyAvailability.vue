<template>
  <UserSummary v-if="isIdentified" @show-adjust="onAdjustMyAvailability" />
  <NewUserForm v-else @new-user-added="handleNewUser" />

</template>

<script lang="ts">
import { ref, toRefs } from "vue";

import AvailabilityTable from "@/components/AvailabilityTable.vue";
import UserSummary from "@/components/UserSummary.vue";
import NewUserForm from "@/components/NewUserForm.vue";



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
  emits: ["user-identified", "adjust-my-availability"],
  setup(props: any, { emit }) {
    const handleNewUser = (name: string) => {
      emit("user-identified", name);
    };

    const onAdjustMyAvailability = () => {
      emit("adjust-my-availability");
    }

    return {
      handleNewUser,
      onAdjustMyAvailability,
    };
  },
};
</script>

<style></style>
