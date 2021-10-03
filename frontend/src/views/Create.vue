<template>
  <div class="container">
    <div id="title" class="p-d-flex p-ai-center p-flex-column p-my-5">
      <i class="pi pi-clock logo p-mb-4"></i>
      <h1 id="heading">When 2 Meet Me</h1>
    </div>
    <MeetingForm
      class="p-p-5"
      :serverError="serverError"
      @submit-meeting="postMeeting"
    />
    <div class="footer">
      <router-link class="link" to="/about">About</router-link>
    </div>
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
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo {
  font-size: 4rem !important;
  opacity: 0.5;
}
</style>
