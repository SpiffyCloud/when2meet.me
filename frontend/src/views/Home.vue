<template>
  <div id="home" class="p-d-flex p-flex-column p-jc-around p-p-5">
    <h1 id="heading" class="p-text-center p-text-bold">When 2 Meet Me</h1>
    <NameInput v-model:title="title" :error="titleError" />

    <CalendarInput v-model:date="by_end_date" v-model:error="dateError" />

    <div id="create-meeting-group" class="p-field p-text-left p-d-flex p-flex-column">
      <Button
        id="create-meeting"
        label="Create Meeting"
        :disabled="dateError !== ''"
        @click="onMeetingCreate()"
        class="p-button-raised p-button-success p-button-lg"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Button from "primevue/button";

import NameInput from "../components/NameInput.vue";
import CalendarInput from "../components/CalendarInput.vue";

import usePostMeeting from "@/composables/usePostMeeting";

export default {
  name: "Home",
  components: {
    NameInput,
    CalendarInput,
    Button,
  },
  setup() {
    return {
      ...usePostMeeting(),
    };
  },
};
</script>

<style lang="css">
#home {
  background-color: var(--primary-color);
  color: var(--primary-color-text);
  font-family: var(--font-family);
  height: 100%;
}

.p-field {
  max-width: 500px;
  margin-right: auto;
  margin-left: auto;
}
</style>
