import { useRouter } from "vue-router";
import { ref, watch } from "vue";
import { createMeeting } from "../api/meeting";

export default function usePostMeeting() {
    const title = ref("");
    const titleError = ref("");
    const by_end_date = ref(new Date());

    const router = useRouter();
    const onMeetingCreate = async () => {
        const meeting = await createMeeting(title.value, by_end_date.value);
        if (meeting.meeting_id) {
            router.push(`/${meeting.meeting_id}`);
        }
        else {
            titleError.value = meeting.title[0];
        }
    };



    return {
        title,
        titleError,
        by_end_date,
        onMeetingCreate,
    }
}