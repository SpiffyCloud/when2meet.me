<template>
  <div id="meeting" class="p-d-flex p-flex-column p-p-4">
    <Toast position="bottom-right" group="br" />
    <Header :title="title" />
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
      />
      <MyAvailability
        v-if="active === 1"
        :availability="availability"
        :by_end_date="by_end_date"
        :isIdentified="isIdentified"
        @user-identified="onUserIdentified"
        @updated-availability="onUpdatedAvailabilty"
      />
    </div>
  </div>
</template>

<script lang="tsx">
import { onMounted, toRefs } from "vue";
// Prime Vue components
import Toast from "primevue/toast";
import TabMenu from "primevue/tabmenu";
// Internal components
import Header from "@/components/Header.vue";
import AllAvailability from "@/components/AllAvailability.vue";
import MyAvailability from "@/components/MyAvailability.vue";
// Composables
import useGetMeeting from "@/composables/useGetMeeting";
import useAuth from "@/composables/useAuth";
import useTabMenu from "@/composables/useTabMenu";

import { availability } from "@/api/meeting";

export default {
  name: "Meeting",
  components: {
    Header,
    AllAvailability,
    MyAvailability,
    TabMenu,
    Toast,
  },
  setup() {
    const { meeting, getMeeting } = useGetMeeting();
    const { isIdentified, onUserIdentified, initUser } = useAuth(meeting);
    // TODO: useBestWindows() feature

    onMounted(async () => {
      await getMeeting();
      console.log(meeting.availability);
      initUser();
    });

    const onUpdatedAvailabilty = (availability: availability[]) => {
      meeting.availability = [...availability];
    };

    return {
      ...toRefs(meeting),
      isIdentified,
      onUserIdentified,
      onUpdatedAvailabilty,
      ...useTabMenu(),
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
