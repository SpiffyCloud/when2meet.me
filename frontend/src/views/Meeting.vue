<template>
  <div id="meeting" class="p-d-flex p-flex-column p-p-4">
    <Toast position="bottom-right" group="br" />
    <Header :title="meeting.title" />
    <TabMenu :model="items" v-model:activeIndex="active" />
    <div id="tabs">
      <AllAvailability v-if="active === 0" />
      <MyAvailability v-if="active === 1" />
    </div>

    <transition name="slide">
      <AvailabilityTable
        v-model:visible="showTable"
        :user="tableUser"
        :disabled="tableUser !== activeUser"
      />
    </transition>
  </div>
</template>

<script lang="tsx">
import { onMounted, provide, readonly, ref, defineComponent } from 'vue'
// Prime Vue components
import Toast from 'primevue/toast'
import TabMenu from 'primevue/tabmenu'
// Internal components
import Header from '@/components/Header.vue'
import AllAvailability from '@/components/AllAvailability.vue'
import MyAvailability from '@/components/MyAvailability.vue'
import AvailabilityTable from '@/components/AvailabilityTable.vue'
// Composables
import useTabMenu from '@/composables/useTabMenu'
import useMeeting from '@/composables/useMeeting'
import useAuth from '@/composables/useAuth'

export default defineComponent({
  name: 'Meeting',
  components: {
    Header,
    AllAvailability,
    MyAvailability,
    AvailabilityTable,
    TabMenu,
    Toast
  },
  setup() {
    const { getMeeting, meeting } = useMeeting()
    const { activeUser } = useAuth()
    onMounted(getMeeting)

    // show table logic, could be moved to a composition function

    const showTable = ref(false)
    const tableUser = ref('')

    const updateShowTable = (show: boolean, user: string) => {
      showTable.value = show
      tableUser.value = user
    }
    provide('updateShowTable', updateShowTable)
    provide('tableUser', readonly(tableUser))
    //

    return {
      meeting,
      activeUser,
      ...useTabMenu(),
      // Showing the table features
      showTable,
      tableUser
    }
  }
})
</script>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: all 1s;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100vw);
}
.page {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  z-index: 1;
  background: var(--primary-color);
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
