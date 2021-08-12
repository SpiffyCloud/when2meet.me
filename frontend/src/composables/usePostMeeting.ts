import { useRouter } from "vue-router";
import { ref } from "vue";
import { createMeeting } from "../api/meeting";

export default function usePostMeeting() {
    const title = ref("The Grandiose Meeting");
    const titleError = ref("");
    const by_end_date = ref(new Date());
    const dateError = ref("");

    const router = useRouter();
    const onMeetingCreate = async () => {
        const meeting = await createMeeting(title.value, by_end_date.value);
        if (meeting.meeting_id) {
            router.push(`/${meeting.meeting_id}`);
        }
        else {
            titleError.value = meeting.title ? meeting.title[0] : "";
            dateError.value = meeting.by_end_date ? meeting.by_end_date[0] : "";
        }
    };



    return {
        title,
        titleError,
        by_end_date,
        dateError,
        onMeetingCreate,
    }
}