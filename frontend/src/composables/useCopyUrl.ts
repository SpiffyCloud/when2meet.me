import { useRoute } from 'vue-router'
import { useToast } from 'primevue/usetoast'

export default function useCopyUrl() {
    const route = useRoute()
    const toast = useToast()
    const copyMeetingUrl = async () => {
        await navigator.clipboard.writeText(route.fullPath as string)
        toast.add({
            severity: 'success',
            summary: '',
            detail: 'Copied to clipboard',
            group: 'br',
            life: 3000
        })
    }

    return {
        copyMeetingUrl
    }
}
