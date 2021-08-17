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
        <h3 class="p-mb-2">Group Availability</h3>
        <div id="group-availability" class="table-wrapper p-shadow-5">
            <AvailabilityTable :chartData="chartData" disabled />
        </div>

        <Responses
            id="response-group"
            ref="response-group"
            :meeting="meeting"
        />
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
import Responses from "@/components/Responses.vue";
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
        Responses,
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
            const storedUser = localStorage.getItem(`user-${meeting_id}`);
            if (storedUser) {
                activeUser.value = storedUser;
                return;
            }
        };

        const scrollToResponders = () => {
            const respondersSection = document.querySelector(
                "#response-group"
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
            showMyAvailability.value = true;
            // getUserFromLocalStorage();
            // if (activeUser.value === "") {
            // scrollToResponders();
            // setTimeout(twinkleButtons, 750);
            // }
            // else {
            // showMyAvailability.value = true;
            // }
        };

        const { meeting } = useGetMeeting();

        const { chartData } = useAvailiability(meeting);

        return {
            ...useGetMeeting(),
            ...useCopyUrl(),
            activeUser,
            showMyAvailability,
            adjustMyAvailability,
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
    margin-bottom: 2rem;
    border-radius: 25px;
}

.availability-table {
    border-collapse: collapse;
    width: 100%;
    margin-bottom: 1.5rem;
    position: relative;
}
.availability-table thead,
.availability-table tbody tr td:first-child {
    background-color: var(--green-600);
    color: whitesmoke;
    font-weight: bold;
    text-align: center;
    border: none;
    opacity: 1;
    z-index: 1;
}

.availability-table td {
    height: 3rem;
    width: 2rem;
}

.availability-table tbody td {
    color: white;
    background-color: white;
    text-align: center;
    border: 1px solid black;
}

.sticky-header {
    position: sticky;
    top: 0;
    background-color: var(--green-600);
}

h1.active-user {
    position: fixed;
    top: 0;
    margin-top: 1rem;
    color: black;
}
</style>
