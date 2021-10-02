<template>
  <div id="home" class="p-d-flex p-flex-column p-jc-evenly p-p-5">
    <h1 id="heading" class="p-text-center p-text-bold">When 2 Meet Me</h1>
    <MeetingForm :serverError="serverError" @submit-meeting="postMeeting" />
  </div>
</template>

<script lang="ts">
import MeetingForm from '@/components/MeetingForm.vue'

import useMeeting from '@/composables/useMeeting'

export default {
  name: 'Create',
  components: {
    MeetingForm
  },
  setup() {
    const { serverError, postMeeting } = useMeeting()
    return {
      serverError,
      postMeeting
    }
  }
}
</script>

<style></style>
