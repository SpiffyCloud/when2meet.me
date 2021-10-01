<template>
    <h1 id="heading">{{ title }}</h1>
    <Button
        label="Copy Meeting URL"
        @click="copyMeetingUrl"
        class="p-button-lg p-button-success p-my-3 p-shadow-5"
    />
    <Button
        label="View All Availability"
        @click="updateShowTable(true, 'All')"
        class="p-button-lg p-button-success p-my-3 p-shadow-5"
    />
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'

// Primevue components
import Button from 'primevue/button'

// Composables
import useCopyUrl from '@/composables/useCopyUrl'

export default defineComponent({
    name: 'Header',
    components: {
        Button
    },
    props: {
        title: String
    },
    setup() {
        const updateShowTable = inject('updateShowTable') as (
            show: boolean,
            user: string
        ) => void

        return {
            updateShowTable,
            ...useCopyUrl()
        }
    }
})
</script>
