<template>
    <div id="meeting" class="p-d-flex p-flex-column p-jc-between p-p-4">
        <Toast position="bottom-right" group="br" />

        <h1 id="heading">{{ meeting.title }}</h1>
        <div
            id="action-group"
            class="p-mb-5 p-d-flex p-flex-column p-jc-between"
        >
            <Button
                label="Copy Meeting URL"
                @click="copyMeetingUrl"
                class="p-button-lg p-button-success p-my-3 p-shadow-5"
            />
            <Button
                label="Adjust My Availability"
                @click="adjustMyAvailability"
                class="p-button-lg p-button-success p-my-3 p-shadow-5"
            />
        </div>

        <Sidebar v-model:visible="showMyAvailability" position="full">
            <h1 class="active-user">{{ activeUser }}'s availability</h1>
            <AvailabilityTable :chartData="chartData" />
        </Sidebar>

        <h3>Best Windows of Availability</h3>
        <h3 class="p-mb-2 p-pt-4" id="group">Group Availability</h3>
        <div id="group-availability" class="table-wrapper p-shadow-5">
            <AvailabilityTable
                id="group-availability-table"
                :chartData="chartData"
                disabled
            />
        </div>

        <div
            id="responses-group"
            class="p-field p-d-flex p-flex-column p-jc-between p-mb-4"
        >
            <div
                v-if="meeting.availability?.length > 0"
                id="responders-group"
                class="p-d-flex p-jc-start p-flex-wrap"
            >
                <h3 id="responders-title" class="p-text-bold">Responders</h3>

                <small class="p-text-bold p-mb-2"
                    >Click your name below to update your availability</small
                >
                <Button
                    v-for="resp in meeting.availability"
                    @click="setActiveUser"
                    :key="resp.name"
                    :label="resp.name"
                    class="
                        p-button p-bg-white p-m-1 p-button-lg p-shadow-2
                        response-btn
                    "
                />
            </div>
        </div>
        <NewUserForm />
    </div>
</template>

<script lang="tsx">
import { ref } from "vue";
import { useRoute } from "vue-router";
// Third party components
import Button from "primevue/button";
import Toast from "primevue/toast";
import Sidebar from "primevue/sidebar";

// Internal components
import NewUserForm from "@/components/NewUserForm.vue";
import AvailabilityTable from "@/components/AvailabilityTable.vue";
// Composables
import useGetMeeting from "@/composables/useGetMeeting";
import useCopyUrl from "@/composables/useCopyUrl";
import useAvailiability from "@/composables/useAvailability";

export default {
    name: "Meeting",
    components: {
        AvailabilityTable,
        NewUserForm,
        Button,
        Toast,
        Sidebar,
    },
    setup() {
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
            const respondersSection = document.querySelector(
                "#responses-group"
            ) as HTMLElement;
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

        const setActiveUser = (event: any) => {
          localStorage.setItem(meeting.value.meeting_id, event.target.innerText)
        }

        const { meeting } = useGetMeeting();

        const { chartData } = useAvailiability(meeting);

        return {
            ...useGetMeeting(),
            ...useCopyUrl(),
            activeUser,
            showMyAvailability,
            adjustMyAvailability,
            setActiveUser,
            chartData,
        };
    },
};
</script>

<style>
#meeting {
    background-color: var(--primary-color);
    color: var(--primary-color-text);
    font-family: var(--font-family);
    min-height: 100%;
}

.p-button.p-bg-white {
    background-color: white !important;
    color: var(--primary-color) !important;
}

.settings-icon {
    font-size: 2rem !important;
}

.p-toast {
    width: fit-content !important;
}

.table-wrapper {
    max-height: 90vh;
    height: fit-content;
    overflow-y: scroll;
    overflow-x: none;
    margin-bottom: 2rem;
    border-radius: 1rem;
    background-color: var(--green-600);
}

h1.active-user {
    position: fixed;
    top: 0;
    margin-top: 1rem;
    color: black;
}

.response-btn {
  transition: all 0.5s ease-in-out !important;
}

.response-btn-lg {
  transform: scale(1.1);
}
</style>
