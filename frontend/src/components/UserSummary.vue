<template>
    <label class="label p-mb-2">Summary of your availability</label>
    <em class="assistive">See your availability stats and make adjustments</em>
    <div class="stats">
        <div class="label p-my-2">
            Total availability:
            <span class="stat">{{ totalAvailability }}</span>
        </div>
        <div class="label p-mb-2">
            Longest you can meet: <span class="stat">{{ longestMeeting }}</span>
        </div>
        <div class="label p-mb-2">
            Ovelap with others:
            <span class="stat">{{ overlapWithOthers }}</span>
        </div>
    </div>
    <button class="button p-mt-5" @click="handleAdjustBtn">
        Adjust my availability
    </button>
</template>

<script lang="ts">
import { defineComponent, inject, Ref } from 'vue'

import { useStats } from '@/composables/useStats'

export default defineComponent({
    name: 'UserSummary',
    emits: ['show-adjust'],
    setup() {
        const updateShowTable = inject('updateShowTable') as (
            show: boolean,
            user: string
        ) => void
        const activeUser = inject('activeUser') as Ref<string>

        const handleAdjustBtn = () => {
            updateShowTable(true, activeUser.value)
        }

        return {
            ...useStats(),
            handleAdjustBtn
        }
    }
})
</script>

<style>
.stat {
    color: var(--text-secondary);
}
</style>
