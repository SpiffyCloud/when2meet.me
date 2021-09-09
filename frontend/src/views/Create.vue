<template>
  <div id="home" class="p-d-flex p-flex-column p-jc-around p-p-5">
    <h1 id="heading" class="p-text-center p-text-bold">When 2 Meet Me</h1>
    <MeetingForm
      :serverError="serverError"
      @submit-meeting="onSubmitMeeting($event)"
    />
  </div>
</template>

<script lang="ts">
import MeetingForm from "@/components/MeetingForm.vue";

import usePostMeeting from "@/composables/usePostMeeting";

export default {
  name: "Create",
  components: {
    MeetingForm,
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
