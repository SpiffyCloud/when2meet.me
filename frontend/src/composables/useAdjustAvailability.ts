import { ref } from "vue";
import { useRoute } from "vue-router";

export default function useAdjustAvailability() {
    const showMyAvailability = ref(false);
    const activeUser = ref("");

    const route = useRoute();
    const getUserFromLocalStorage = () => {
      const meeting_id = route.params.id;
      const storedUser = localStorage.getItem(`${meeting_id}`);
      if (storedUser) {
        activeUser.value = storedUser;
        return;
      }
    };

    const scrollToResponders = () => {
      const respondersSection = document.querySelector("#responses-group") as HTMLElement;
      window.scrollTo({
        behavior: "smooth",
        top: respondersSection?.offsetTop,
      });
    };

    const twinkleButtons = () => {
      const responseButtons = document.querySelectorAll(".response-btn");
      responseButtons.forEach((btn) => {
        btn.classList.add("response-btn-lg");
        btn.addEventListener("transitionend", () => {
          btn.classList.remove("response-btn-lg");
        });
      });
    };

    const adjustMyAvailability = () => {
      getUserFromLocalStorage();
      if (activeUser.value === "") {
        scrollToResponders();
        setTimeout(twinkleButtons, 600);
      } else {
        showMyAvailability.value = true;
      }
    };

    const setActiveUser = (event: any, meeting: any) => {
      localStorage.setItem(meeting.meeting_id, event.target.innerText);
    };

    return {
      adjustMyAvailability,
      setActiveUser,
      activeUser,
      showMyAvailability
    };
}