<template>
  <template v-if="activeUser">
    <h2>Welcome back, {{ activeUser }}</h2>
    <p>Not you? <a href="#" @click="changeUser">Change user</a></p>
  </template>

  <UserSummary v-if="activeUser" />
  <NewUserForm v-else />
</template>

<script lang="ts">
import UserSummary from '@/components/UserSummary.vue'
import NewUserForm from '@/components/NewUserForm.vue'

import { inject } from 'vue'

export default {
  name: 'MyAvailability',
  components: {
    UserSummary,
    NewUserForm
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
a {
  text-decoration: none;
}
</style>
