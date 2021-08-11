import { useRoute } from "vue-router";
import { ref, onMounted, watch } from "vue";
import { fetchMeeting } from "../api/meeting";

export default function useGetMeeting() {
    const route = useRoute();

    const meeting = ref({});
    const getMeeting = async () => {
      meeting.value = await fetchMeeting(route.params.id as string);
    };

    onMounted(getMeeting);

    watch(() => route.params.id, getMeeting);

    return {
        meeting,
        getMeeting,
    }
}