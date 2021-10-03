<template>
  <div id="meeting">
    <Toast position="bottom-right" group="br" />
    <Header :title="meeting.title" />
    <TabMenu :model="items" v-model:activeIndex="active" />
    <div id="tabs">
      <AllAvailability v-if="active === 0" />
      <MyAvailability v-if="active === 1" />
    </div>
    <div class="footer">
      <router-link class="link" to="/">Create</router-link>
      <router-link class="link" to="/about">About</router-link>
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
/* Table CSS */
.slide-enter-active,
.slide-leave-active {
  transition: all 1s;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100vw);
}
</style>

<style>
/* Tab Menu CSS overrides */
.p-tabmenu .p-tabmenu-nav {
  background: var(--primary) !important;
  border: none !important;
}
.p-tabmenuitem {
  width: 100%;
}
.p-tabmenu-nav .p-menuitem-text {
  width: 100%;
  text-align: center;
}

.p-tabmenu .p-tabmenu-nav .p-tabmenuitem.p-highlight .p-menuitem-link {
  background: var(--primary) !important;
  color: var(--secondary) !important;
  border: none !important;
  opacity: 1;
  border-bottom: 0.25rem solid var(--secondary) !important;
  margin: 0;
}

.p-tabmenu .p-tabmenu-nav .p-tabmenuitem .p-menuitem-link {
  border: none !important;
  background: var(--primary) !important;
  color: var(--text) !important;
  opacity: 0.5;
  font-size: 1.5rem;
  margin: 0;
}
.p-tabmenu
  .p-tabmenu-nav
  .p-tabmenuitem
  .p-menuitem-link:not(.p-disabled):focus {
  box-shadow: none !important;
}
</style>