
import { postAvailability } from "@/api/meeting";

export default function usePostAvailability(meeting) {
    const submitAvailability = async (availability: any) => {
        const meeting_id = meeting.value.meeting_id;
        const name = localStorage.getItem(`${meeting_id}`)
        if (name) {
            const response = await postAvailability(meeting_id, name, availability);
        }
      };
      const handleSubmit = (availabilites: any) => {
        setTimeout(submitAvailability, 0, availabilites);
      };

    return {
        handleSubmit,
    };
}