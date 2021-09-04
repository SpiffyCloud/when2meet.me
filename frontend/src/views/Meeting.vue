<template>
  <div id="meeting" class="p-d-flex p-flex-column p-p-4">
    <Toast position="bottom-right" group="br" />
    <Header :title="meeting.title" />
    <Details v-if="isIdentified" />
    <Preview v-else @user-identified="identifyUser($event)" />
  </div>
</template>

<script lang="tsx">
import { onMounted } from "vue";
// Prime Vue components
import Toast from "primevue/toast";
// Internal components
import Header from "@/components/Header.vue";
import Preview from "@/components/Preview.vue";
import Details from "@/components/Details.vue";
// Composables
import useGetMeeting from "@/composables/useGetMeeting";
import useAuth from "@/composables/useAuth";
import useChart from "@/composables/useChart";

export default {
  name: "Meeting",
  components: {
    Header,
    Preview,
    Details,
    Toast,
  },
  setup() {
    const { meeting, getMeeting } = useGetMeeting();
    const { chartData, initChartData, updateChartData } = useChart(meeting);
    const { isIdentified, identifyUser, initUser } = useAuth(meeting);
    // TODO: useBestWindows() feature

    onMounted(async () => {
      await getMeeting();
      initUser();
      initChartData();
    });

    return {
      meeting,
      chartData,
      isIdentified,
      identifyUser,
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
