<template>
  <div id="meeting" class="p-d-flex p-flex-column p-p-4">
    <Toast position="bottom-right" group="br" />
    <Header :title="title"  @view-all="onViewAll" />
    <TabMenu
      :model="items"
      v-model:activeIndex="active"
      @tab-change="handleTabChange"
    />
    <div id="tabs">
      <AllAvailability
        v-if="active === 0"
        :availability="availability"
        :by_end_date="by_end_date"
        @user-clicked="onUserClicked"
      />
      <MyAvailability
        v-if="active === 1"
        :availability="availability"
        :by_end_date="by_end_date"
        :isIdentified="isIdentified"
        @user-identified="onNewUserAdded"
        @adjust-my-availability="onAdjustMyAvailability"
      />
    </div>

    <div class="page" v-if="showTable">
        <AvailabilityTable
          :chartData="chartData"
          @submit-availability="submitAvailability"
        />
  </div>
  </div>
</template>

<script lang="tsx">
import { onMounted, ref, toRefs } from "vue";
// Prime Vue components
import Toast from "primevue/toast";
import TabMenu from "primevue/tabmenu";
// Internal components
import Header from "@/components/Header.vue";
import AllAvailability from "@/components/AllAvailability.vue";
import MyAvailability from "@/components/MyAvailability.vue";
import AvailabilityTable from "@/components/AvailabilityTable.vue"
// Composables
import useGetMeeting from "@/composables/useGetMeeting";
import useAuth from "@/composables/useAuth";
import useTabMenu from "@/composables/useTabMenu";
import useChart from "@/composables/useChart";
import usePostAvailability from "@/composables/usePostAvailability";

import { availability } from "@/api/meeting";

export default {
  name: "Meeting",
  components: {
    Header,
    AllAvailability,
    MyAvailability,
    AvailabilityTable,
    TabMenu,
    Toast,
  },
  setup(_, { emit }) {
    const { meeting, getMeeting } = useGetMeeting();
    const { isIdentified, onUserIdentified, initUser } = useAuth(meeting);
    // TODO: useBestWindows() feature

    onMounted(async () => {
      await getMeeting();
      initUser();
    });

    const onUpdatedAvailabilty = (availability: availability[]) => {
      meeting.availability = [...availability];
    };

    const showTable = ref(false);


    const onUserClicked = (user: string) => {
      // show disabled table with only the clicked users availability
      showTable.value = true;
    }

    const onNewUserAdded = (user: string) => {
      // show enabled table with only your avialability
      onUserIdentified(user);
      showTable.value = true;
    }

    const onAdjustMyAvailability = () => {
      // show enabled table with only your availability
      showTable.value = true;
    }

    const onViewAll = () => {
      // Show disabled table with all responders
      showTable.value = true;
    }


    const { title, availability, by_end_date } = toRefs(meeting);


    return {
      title, 
      availability, 
      by_end_date,
      isIdentified,
      onUserIdentified,
      onUpdatedAvailabilty,
      ...useTabMenu(),
      ...useChart(availability, by_end_date, showTable),
      ...usePostAvailability(emit, showTable),
      onUserClicked,
      onNewUserAdded, 
      onViewAll, 
      onAdjustMyAvailability,
      showTable, 
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
.page {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  z-index: 1;
  background: var(--primary-color);
  transition: left 0.5s ease-in-out;
}

.p-tabmenu.p-component {
  width: 100vw;
  margin-left: -1.5rem;
}

.p-tabmenu-nav.p-reset {
  display: flex;
  justify-content: space-evenly;
}
.p-tabmenuitem {
  width: 50%;
  text-align: center;
}

.p-menuitem-text {
  width: 100%;
  font-size: 1rem;
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
