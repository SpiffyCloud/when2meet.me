import { useRoute, useRouter } from 'vue-router'
import { reactive, provide, readonly, ref } from 'vue'
import {
    meeting,
    availability,
    fetchMeeting,
    createMeeting
} from '../api/meeting'

export default function useMeeting() {
    const route = useRoute()
    const router = useRouter()
    const serverError = ref('')
    const meeting = reactive({
        title: '',
        availability: [] as availability[],
        by_end_date: '',
        meeting_id: ''
    } as meeting)

    const getMeeting = async () => {
        const { title, availability, by_end_date, meeting_id } =
            await fetchMeeting(route.params.id as string)

        meeting.title = title
        meeting.availability = availability
        meeting.by_end_date = by_end_date
        meeting.meeting_id = meeting_id
    }

    const postMeeting = async ({ title, by_end_date }) => {
        const createdMeeting = await createMeeting(
            title.value,
            by_end_date.value
        )
        if (createdMeeting.meeting_id) {
            Object.assign(meeting, createdMeeting)
            router.push(`/${meeting.meeting_id}`)
        } else {
            serverError.value = createdMeeting.error
        }
    }

    const updateMeeting = (updatedMeeting: meeting) => {
        Object.assign(meeting, updatedMeeting)
    }

    provide('meeting', readonly(meeting))
    provide('updateMeeting', updateMeeting)

    return {
        meeting,
        getMeeting,
        postMeeting,
        serverError
    }
}
