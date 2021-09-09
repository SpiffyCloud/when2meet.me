import { availability } from "@/api/meeting";
import { ref } from "vue";

export default function useAuth(meeting) {
    // TODO figure out where to use this
    const isIdentified = ref(false);

    const onUserIdentified = (name: any) => {
        if (name?.length == 0) return;
        if (isNewUser(name)) {
            addUserToAvailabilty(name);
        }
        setUserInLocalStorage(name);
        isIdentified.value = true;
      };

    const isNewUser = (name: string) => {
       return meeting.availability.findIndex((user) => user.name === name) === -1;
    }

    const addUserToAvailabilty = (name: string) => {
        meeting.availability = [
            ...meeting.availability,
            { name: name, slots: [] as any },
          ];

    }
    const setUserInLocalStorage = (name: string) => {
        localStorage.setItem(`${meeting.meeting_id}`, name);
        
    }

   
    const initUser = () => {
        const user = localStorage.getItem(`${meeting.meeting_id}`);

        if (user) {
           isIdentified.value = true;
        }
    }




    return {
        isIdentified,
        onUserIdentified,
        initUser,
    }

}