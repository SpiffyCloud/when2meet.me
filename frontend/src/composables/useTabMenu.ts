import { ref } from 'vue'

export default function useTabMenu() {
    const active = ref(0)
    const items = ref([
        {
            label: 'Meeting Details'
        },
        {
            label: 'Attendees'
        }
    ])

    return {
        active,
        items
    }
}
