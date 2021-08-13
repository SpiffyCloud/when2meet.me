<template>
  <div id="meeting" class="p-d-flex p-flex-column p-jc-between p-p-4">
    <Toast position="bottom-right" group="br" />

    <h1 id="heading">{{ meeting.title }}</h1>
    <div id="action-group" class="p-mb-5 p-d-flex p-flex-column p-jc-between">
      <Button
        label="Copy Meeting URL"
        @click="copyMeetingUrl"
        class="p-button-lg p-button-success p-my-3 p-shadow-5"
      />
      <Button
        label="Adjust My Availability"
        @click="copyMeetingUrl"
        class="p-button-lg p-button-success p-my-3 p-shadow-5"
      />
    </div>
    <GroupAvailability :meeting="meeting" />

    <MyAvailability v-if="showMyAvailability" :meeting="meeting" />

    <Responses :meeting="meeting" />
    <NewUserForm />
  </div>
</template>

<script lang="tsx">
import { ref } from "vue";
// Third party components
import Button from "primevue/button";
import Toast from "primevue/toast";

// Internal components
import MyAvailability from "@/components/MyAvailability.vue";
import GroupAvailability from "@/components/GroupAvailability.vue";
import Responses from "@/components/Responses.vue";
import NewUserForm from "@/components/NewUserForm.vue";

// Composables
import useGetMeeting from "@/composables/useGetMeeting";
import useCopyUrl from "@/composables/useCopyUrl";

export default {
  name: "Meeting",
  components: {
    MyAvailability,
    GroupAvailability,
    Responses,
    NewUserForm,
    Button,
    Toast,
  },
  setup() {
    const showMyAvailability = ref(false);
    return {
      ...useGetMeeting(),
      ...useCopyUrl(),
      showMyAvailability,
    };
  },
};
</script>

<style>
#meeting {
  background-color: var(--primary-color);
  color: var(--primary-color-text);
  font-family: var(--font-family);
  min-height: 100%;
}

.p-button.p-bg-white {
  background-color: white !important;
  color: var(--primary-color) !important;
}

.settings-icon {
  font-size: 2rem !important;
}

.p-toast {
  width: fit-content !important;
}
</style>
