import { computed, ref } from '@vue/runtime-dom'

export default function useCopyUrl() {
    const copied = ref(false)

    const buttonText = computed(() => {
        return copied.value ? 'Copied!' : 'Copy Meeting Url'
    })
    const copyMeetingUrl = async () => {
        await navigator.clipboard.writeText(window.location.href as string)
        copied.value = true
    }

    return {
        copied,
        buttonText,
        copyMeetingUrl
    }
}
