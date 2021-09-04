<template>
  <TabMenu
    :model="items"
    v-model:activeIndex="active"
    @tab-change="handleTabChange"
  />
  <div id="tabs">
    <AllAvailability v-if="active === 0" :meeting="meeting" />
    <MyAvailability v-if="active === 1" :meeting="meeting" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
// Primevue components
import TabMenu from "primevue/tabmenu";

// Internal Components
import AllAvailability from "@/components/AllAvailability.vue";
import MyAvailability from "@/components/MyAvailability.vue";

export default defineComponent({
  name: "Details",
  props: {
    meeting: {
      type: Object,
      required: true,
    },
  },
  components: {
    AllAvailability,
    MyAvailability,
    TabMenu,
  },
  setup(props: any) {
    const active = ref(0);
    const items = ref([
      {
        label: "All Availability",
      },
      {
        label: "My Availability",
      },
    ]);

    const handleTabChange = async ({ index }) => {
      if (index === 1) {
        const tabs = await document.querySelector("#tabs"); // it says it has no effect but it does ¯\_(ツ)_/¯
        tabs?.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scroll({ top: 0, behavior: "smooth" });
      }
    };

    return {
      active,
      items,
      handleTabChange,
    };
  },
});
</script>

<style>
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
</style>
