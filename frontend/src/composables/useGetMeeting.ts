import { useRoute } from "vue-router";
import { ref, reactive } from "vue";
import { meeting, fetchMeeting } from "../api/meeting";

export default function useGetMeeting() {
    const route = useRoute();

    const meeting = reactive({} as meeting);

    const getMeeting = async () => {
        const { title, availability, by_end_date, meeting_id } =
            await fetchMeeting(route.params.id as string);

        meeting.title = title;
        meeting.availability = availability;
        meeting.by_end_date = by_end_date;
        meeting.meeting_id = meeting_id;
    };

    return {
        meeting,
        getMeeting,
    };
}
