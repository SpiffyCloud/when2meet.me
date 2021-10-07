import { inject, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

export default function useTabMenu() {
    const route = useRoute()
    const active = ref(0)
    const items = ref([
        {
            label: 'All Availability'
        },
        {
            label: 'My Availability'
        }
    ])

    onMounted(() => {
        const activeUser = localStorage.getItem(`${route.params.id}`)
        console.log(activeUser)
        active.value = activeUser ? 0 : 1
    })

    return {
        active,
        items
    }
}
