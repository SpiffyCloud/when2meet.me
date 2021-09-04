import { onMounted, ref } from "vue";

export default function useAuth(meeting) {
    // TODO figure out where to use this
    const isIdentified = ref(false);

    const identifyUser = (name: any) => {

        if (name?.length == 0) return;
        if (isNewUser(name)) {
            addUserToAvailabilty(name);
        }
        setUserInLocalStorage(name);
        isIdentified.value = true;
      };

    const isNewUser = (name: string) => {
        return meeting.availability.find((x) => x.name == name) === -1;
    }

    const addUserToAvailabilty = (name: string) => {

        meeting.availability = [
            ...meeting.availability,
            { name: event, slots: [] as any },
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
        identifyUser,
        initUser,
    }

}