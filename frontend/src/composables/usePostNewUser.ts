import { meeting, postNewUser } from '@/api/meeting'
import { inject, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export default function usePostNewUser() {
    const name = ref('')
    const nameError = ref('')
    const route = useRoute()

    const meeting = inject('meeting') as meeting
    const updateMeeting = inject('updateMeeting') as (meeting) => void
    const setActiveUser = inject('setActiveUser') as () => void
    const updateShowTable = inject('updateShowTable') as (
        show: boolean,
        user: string
    ) => void

    const addNewUser = async () => {
        if (name.value.trim() === '') {
            nameError.value = 'Please fill out a name!'
            return
        }
        nameError.value = ''
        const updatedMeeting = await postNewUser(
            route.params.id as string,
            name.value
        )
        if (updatedMeeting.meeting_id) {
            updateMeeting(updatedMeeting)
            localStorage.setItem(meeting.meeting_id, name.value.trim())
            updateShowTable(true, name.value.trim())
        }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            addNewUser()
        }
    }

    watch(meeting, () => {
        const activeUser = localStorage.getItem(meeting.meeting_id)
        if (activeUser) {
            setActiveUser()
        }
    })

    return {
        name,
        nameError,
        addNewUser,
        handleKeyDown
    }
}
