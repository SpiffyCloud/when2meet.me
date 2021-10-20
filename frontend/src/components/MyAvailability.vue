<template>
  <div class="p-py-5 p-px-4">
    <div class="p-mb-4" v-if="activeUser">
      <h2 class="label">Welcome back, {{ activeUser }}</h2>
      <p class="assistive" @click="changeUser">
        Not you? <span class="action">Change user</span>
      </p>
    </div>
    <NewUserForm v-else />
    <Responders v-if="activeUser"/>
  </div>
</template>

<script lang="ts">
import NewUserForm from '@/components/NewUserForm.vue'
import Responders from '@/components/Responders.vue'

import { inject } from 'vue'

export default {
  name: 'MyAvailability',
  components: {
    NewUserForm,
    Responders
  },
  setup() {
    const activeUser = inject('activeUser') as string
    const clearActiveUser = inject('clearActiveUser') as () => void

    const changeUser = (e) => {
      e.preventDefault()
      clearActiveUser()
    }
    return {
      activeUser,
      changeUser
    }
  }
}
</script>

<style>
.action {
  text-decoration: underline;
}

.action:hover {
  cursor: pointer;
}
</style>
