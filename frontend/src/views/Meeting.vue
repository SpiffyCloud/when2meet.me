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
            <AvailabilityTable :chartData="chartData" />
        </Sidebar>
        <h3 class="p-mb-2">
            Best Windows of Availability
            <i
                class="pi pi-filter"
                @click="showWindowFilter = true"
                style="fontsize: 2rem"
            ></i>
        </h3>
        <div class="window-group">
            <Window />
            <Window />
            <Window />
            <Dialog
                header="Best Window Options"
                v-model:visible="showWindowFilter"
                :modal="true"
            >
                <WindowFilter
                    @apply="updateWindows($event)"
                    :meeting="meeting"
                />
            </Dialog>
        </div>
        <div class="p-d-flex p-jc-end">
            <Button label="View all" class="p-button" @click="viewAll = true" />
        </div>
        <Sidebar position="full" :modal="true" v-model:visible="viewAll">
            <TabView class="p-mt-1">
                <TabPanel header="Best Windows" style="color: white">
                    <div class="p-d-flex p-jc-start">
                        <p class="p-text-bold p-mx-2">Filter</p>
                        <i
                            class="pi pi-filter"
                            @click="showWindowFilter = true"
                            style="fontsize: 2rem"
                        ></i>
                    </div>

                    <Dialog
                        header="Best Window Options"
                        v-model:visible="showWindowFilter"
                        :modal="true"
                    >
                        <WindowFilter
                            @apply="updateWindows($event)"
                            :meeting="meeting"
                        />
                    </Dialog>
                    <Window />
                    <Window />
                    <Window />
                    <Window />
                    <Window />
                    <Window />
                    <Window />
                    <Window />
                </TabPanel>
                <TabPanel header="Heatmap">
                    <div
                        id="group-availability"
                        class="table-wrapper p-shadow-5"
                    >
                        <AvailabilityTable
                            id="group-availability-table"
                            :chartData="chartData"
                            disabled
                        /></div
                ></TabPanel>
            </TabView>
        </Sidebar>
        <h3 id="responders-title" class="p-text-bold">Responders</h3>
        <small class="p-text-bold p-mb-2"
            >Click your name below to update your availability</small
        >
        <div
            id="responses-group"
            class="p-field p-d-flex p-flex-column p-jc-between p-mb-4"
        >
            <div
                v-if="meeting.availability?.length > 0"
                id="responders-group"
                class="p-d-flex p-jc-start p-flex-wrap"
            >
                <Button
                    v-for="resp in meeting.availability"
                    @click="setActiveUser($event, meeting)"
                    :key="resp.name"
                    :label="resp.name"
                    class="
                        p-button p-bg-white p-m-1 p-button-lg p-shadow-2
                        response-btn
                    "
                />
            </div>
            <h3 v-else class="p-text-bold p-my-5">No Responses yet!</h3>
        </div>
        <NewUserForm @addNewUser="setNewUser($event)" />
    </div>
</template>

<script lang="tsx">
import { ref } from "vue";
// Third party components
import Button from "primevue/button";
import Toast from "primevue/toast";
import Sidebar from "primevue/sidebar";
import Dialog from "primevue/dialog";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import { useToast } from "primevue/usetoast";
// Internal components
import NewUserForm from "@/components/NewUserForm.vue";
import AvailabilityTable from "@/components/AvailabilityTable.vue";
import Window from "@/components/Window.vue";
import WindowFilter from "@/components/WindowFilter.vue";
// Composables
import useGetMeeting from "@/composables/useGetMeeting";
import useCopyUrl from "@/composables/useCopyUrl";
import useAvailiability from "@/composables/useAvailability";
import useAdjustAvailiability from "@/composables/useAdjustAvailability";

export default {
    name: "Meeting",
    components: {
        AvailabilityTable,
        NewUserForm,
        Window,
        Button,
        Toast,
        Sidebar,
        WindowFilter,
        Dialog,
        TabView,
        TabPanel,
    },
    setup() {
        const { meeting } = useGetMeeting();
        const { chartData } = useAvailiability(meeting);
        const showWindowFilter = ref(false);
        const viewAll = ref(false);
        const toast = useToast();

        const updateWindows = (event: any) => {
            // Todo: calculate the top 3 windows
            showWindowFilter.value = false;
        };

        const setNewUser = (event: any) => {
            if (event?.length == 0) return;
            // check if event in availability
            const index = meeting.value.availability.findIndex(
                (x) => x.name == event
            );
            if (index === -1) {
                meeting.value.availability = [
                    ...meeting.value.availability,
                    { name: event, slots: [] as any },
                ];
                localStorage.setItem(meeting.value.meeting_id, event);
                toast.add({
                    severity: "success",
                    summary: "",
                    detail: `Now Editing As: ${event}`,
                    group: "br",
                    life: 3000,
                });
            }
        };

        const selectedViewAll = ref(null);
        const viewAllOptions = ["Windows", "Heatmap"];

        return {
            meeting,
            ...useCopyUrl(),
            ...useAdjustAvailiability(),
            chartData,
            showWindowFilter,
            updateWindows,
            setNewUser,
            viewAll,
            selectedViewAll,
            viewAllOptions,
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
