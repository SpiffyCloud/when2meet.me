<template>
  <UserSummary v-if="activeUser" />
  <NewUserForm v-else />
</template>

<script lang="ts">
import UserSummary from "@/components/UserSummary.vue";
import NewUserForm from "@/components/NewUserForm.vue";

import Button from "primevue/button";
import { inject } from 'vue';

export default {
  name: "MyAvailability",
  components: {
    UserSummary,
    NewUserForm,
    Button,
  },
  props: {
    by_end_date: {
      type: String,
      required: true,
    },
  },
  setup() {
    const activeUser = inject("activeUser") as string;
    return {
      activeUser
    }
  },
};
</script>

<style></style>
