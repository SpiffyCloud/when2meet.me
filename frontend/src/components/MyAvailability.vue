<template>
    <div class="p-py-5 p-px-4">
        <div class="p-mb-4" v-if="activeUser">
            <h2 class="label">Welcome back, {{ activeUser }}</h2>
            <p class="assistive" @click="changeUser">
                Not you? <span class="action">Change user</span>
            </p>
        </div>
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
</style>
