<template>
  <div class="p-p-5">
    <UserSummary v-if="activeUser" />
    <NewUserForm v-else />
  </div>
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
    return {
      activeUser
    }
  }
}
</script>

<style></style>
