<template>
  <div class="container">
    <div id="title" class="p-d-flex p-ai-center p-flex-column">
      <i class="pi pi-clock logo p-mb-4"></i>
      <h1 id="heading">When 2 Meet Me</h1>
    </div>
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

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

.logo {
  font-size: 4rem !important;
  opacity: 0.5;
}
</style>
