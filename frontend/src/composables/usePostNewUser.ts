import { postNewUser } from "@/api/meeting";
import { ref } from "vue";
import { useRoute } from "vue-router";

export default function usePostNewUser(emit: any) {
    const name = ref("");
    const nameError = ref("");
    const route = useRoute();

    const addNewUser = async () => {
        if (name.value.trim() === "") {
          nameError.value = "Please fill out a name!";
          return;
        }
        nameError.value = "";
        const response = await postNewUser(route.params.id as string, name.value);
        if (response.meeting_id) {
          emit("new-user-added", name.value);
        }
      };

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Enter") {
          addNewUser();
        }
      };

      
    return {
        name, nameError, addNewUser, handleKeyDown
    }
}