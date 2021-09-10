import { postAvailability } from "@/api/meeting";
import { useRoute } from "vue-router";

export default function usePostAvailability(emit, showTable, meeting
) {
  const route = useRoute();
  
  const submitAvailability = async (newAvailability: any) => {
    showTable.value = false;
    const meeting_id = route.params.id as string;
    const name = localStorage.getItem(`${meeting_id}`);
    if (name) {
      const response  = await postAvailability(meeting_id, name, newAvailability);
      meeting.availability = [...response.availability]
    }
  };

  return {
    submitAvailability,
  };
}
