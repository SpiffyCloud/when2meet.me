<template>
    <div id="meeting" class="p-d-flex p-flex-column p-p-4">
        <Toast position="bottom-right" group="br" />

        <h1 id="heading">{{ meeting.title }}</h1>
        <div
            id="action-group"
            class="p-mb-2 p-d-flex p-flex-column p-jc-between"
        >
            <Button
                label="Copy Meeting URL"
                @click="copyMeetingUrl"
                class="p-button-lg p-button-success p-my-3 p-shadow-5"
            />

            <Button
                v-if="hasResponders"
                label="Adjust My Availability"
                @click="adjustMyAvailability"
                class="p-button-lg p-button-success p-my-3 p-shadow-5"
            />
        </div>

        <div>
            <Sidebar v-model:visible="showMyAvailability" position="full">
                <AvailabilityTable
                    @getNext="getNextWeek"
                    @getPrev="getPrevWeek"
                    :chartData="chartData"
                />
            </Sidebar>
            <h3 class="p-mb-2">
                Best Windows of Availability
                <i
                    v-if="windows.length > 0"
                    class="pi pi-filter"
                    @click="showWindowFilter = true"
                    style="fontsize: 2rem"
                ></i>
            </h3>
            <div v-if="windows.length > 0" class="window-group">
                <Window
                    v-for="(window, index) in windows.slice(3)"
                    :key="index"
                />
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
                <div class="p-d-flex p-jc-end">
                    <Button
                        label="View all"
                        class="p-button"
                        @click="viewAll = true"
                    />
                </div>
            </div>
            <div
                v-else
                class="p-d-flex p-jc-center empty-message p-shadow-5 p-mb-4"
            >
                <h3>No Availability yet! Be the first!</h3>
            </div>

            <Sidebar position="full" :modal="true" v-model:visible="viewAll">
                <TabView class="p-mt-2">
                    <TabPanel header="Best Windows">
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
                        <AvailabilityTable
                            id="group-availability-table"
                            :chartData="chartData"
                            disabled
                    /></TabPanel>
                </TabView>
            </Sidebar>
            <h3 id="responders-title" class="p-text-bold">Responders</h3>
            <small class="p-text-bold p-mb-1"
                >Click your name below to update your availability</small
            >

            <div
                v-if="hasResponders"
                id="responders-group"
                class="p-d-flex p-jc-start p-flex-wrap p-mb-2"
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
            <div v-else class="p-d-flex p-jc-center p-shadow-5 empty-message">
                <h3 class="p-text-bold">
                    No Responders yet! Add your name below.
                </h3>
            </div>
            <h3 id="new-user-title" class="p-text-bold p-mt-2">
                Can't find your name?
            </h3>

            <NewUserForm @addNewUser="setNewUser($event)" />
        </div>
        <!-- <div v-else>
            <h3 id="new-user-title" class="p-text-bold p-mt-2">
                You're the first one here!
            </h3>

            <NewUserForm @addNewUser="setNewUser($event)" />
        </div> -->
    </div>
</template>

<script lang="tsx">
import { computed, onMounted, ref } from "vue";
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
import useChart from "@/composables/useChart";
import useAdjustAvailiability from "@/composables/useAdjustAvailability";
import useWindows from "@/composables/useWindows";

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
        const { meeting, getMeeting } = useGetMeeting();
        const { chartData, initChartData, updateChartData } = useChart(meeting);
        // TODO: useBestWindows() feature

        const viewAll = ref(false);
        const toast = useToast();

        const setNewUser = (event: any) => {
            if (event?.length == 0) return;
            // check if event in availability
            const index = meeting.availability.findIndex(
                (x) => x.name == event
            );
            if (index === -1) {
                meeting.availability = [
                    ...meeting.availability,
                    { name: event, slots: [] as any },
                ];
                localStorage.setItem(meeting.meeting_id, event);
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

        const hasResponders = computed(
            () => meeting.availability?.length > 0
        );


        onMounted(() => {
            getMeeting()
            initChartData()
        });

        return {
            meeting,
            ...useCopyUrl(),
            ...useAdjustAvailiability(),
            ...useWindows(),
            chartData,
            setNewUser,
            viewAll,
            selectedViewAll,
            viewAllOptions,
            hasResponders,
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
    width: 100vw;
    overflow-y: scroll;
    overflow-x: scroll;
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

.empty-message {
    background-color: white;
    border-radius: 1rem;
    color: var(--primary-color);
    padding: 1rem;
}

.p-tabview .p-tabview-panels,
.p-sidebar-content {
    padding: 0 !important;
}
</style>
