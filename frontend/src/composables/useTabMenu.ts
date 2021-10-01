import { ref } from 'vue'

export default function useTabMenu() {
    const active = ref(0)
    const items = ref([
        {
            label: 'All Availability'
        },
        {
            label: 'My Availability'
        }
    ])

    return {
        active,
        items
    }
}
