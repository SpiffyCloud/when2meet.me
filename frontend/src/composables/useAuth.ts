import { readonly, ref, provide, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default function useAuth() {
    const route = useRoute()
    const activeUser = ref('')
    const setActiveUser = () => {
        activeUser.value = localStorage.getItem(`${route.params.id}`) as string
    }

    provide('activeUser', readonly(activeUser))
    provide('setActiveUser', setActiveUser)

    onMounted(setActiveUser)

    return {
        activeUser
    }
}
