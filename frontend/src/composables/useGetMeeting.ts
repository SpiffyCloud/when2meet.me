import { useRoute } from "vue-router";
import { ref, onMounted, watch } from "vue";
import { meeting, fetchMeeting } from "../api/meeting";



export default function useGetMeeting() {
    const route = useRoute();

    const meeting = ref({} as meeting);
    const getMeeting = async () => {
      meeting.value = await fetchMeeting(route.params.id as string);
      meeting.value.availability = [
        {
          name: "Jack",
          slots: [1, 2, 3,4 ,5],
        },
      ]
    };

    onMounted(getMeeting);

    watch(() => route.params.id, getMeeting);

    return {
        meeting,
        getMeeting,
    }
}