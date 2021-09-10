import { useRouter } from "vue-router";
import { ref } from "vue";
import { createMeeting } from "../api/meeting";

export default function usePostMeeting() {
    const serverError = ref("");

    const router = useRouter();
    
    const onSubmitMeeting = async ({ title, by_end_date }) => {
        const meeting = await createMeeting(title.value, by_end_date.value);
        if (meeting.meeting_id) {
            router.push(`/${meeting.meeting_id}`);
        }
        else {
            serverError.value = meeting.error;
        }
    };



    return {
        serverError,
        onSubmitMeeting,
    }
}