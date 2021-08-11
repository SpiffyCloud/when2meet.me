<template>
  <div id="best-group" class="p-d-flex p-jc-start p-align-end">
    <h3 id="best-title" class="p-mb-2 p-text-bold p-text-center">
      Best Windows of Availability
    </h3>
    <Button
      icon="pi pi-cog"
      class="p-button-rounded p-button-primary p-ml-2"
      @click="openModal"
    />
  </div>
  <Dialog header="Best Window Options" v-model:visible="displayModal" :modal="true">
    <div id="filter-group" class="p-d-flex p-flex-column p-jc-between">
      <div
        id="first-last-filter"
        class="p-fluid p-field p-d-flex p-align-center p-jc-between"
      >
        <label class="p-text-bold">How soon?</label>
        <Dropdown
          v-model="selectedFilter"
          :options="filters"
          optionLabel="label"
          optionValue="value"
          placeholder="First Available"
          class="p-my-2"
        />
      </div>
      <div
        id="first-last-filter"
        class="p-fluid p-field p-d-flex p-align-center p-jc-between"
      >
        <label class="p-text-bold">Duration?</label>
        <Dropdown
          v-model="selectedFilter"
          :options="filters"
          optionLabel="label"
          optionValue="value"
          placeholder="First Available"
          class="p-my-2"
        />
      </div>
      <div
        id="number-filter"
        class="p-fluid p-field p-d-flex p-align-center p-jc-between"
      >
        <label class="p-text-bold"># of available?</label>
        <Dropdown
          v-model="selectedFilter"
          :options="filters"
          optionLabel="label"
          optionValue="value"
          placeholder="All"
          class="p-my-2"
        />
      </div>
    </div>
  </Dialog>
  <Accordion class="p-my-3 p-shadow-5" v-if="meeting.best_windows?.length > 0">
    <AccordionTab v-for="win in meeting.best_windows" :key="win.time" :header="win.time">
      <p v-for="mem in win.members" :key="mem">
        {{ mem }}
      </p>
    </AccordionTab>
  </Accordion>
  <h3 class="p-my-2 p-text-center" v-else>No responses yet!</h3>
</template>

<script lang="ts">
import Button from "primevue/button";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import Dropdown from "primevue/dropdown";

import { ref } from "vue";
export default {
  components: {
    Button,
    Accordion,
    AccordionTab,
    Dropdown,
  },
  props: {
    meeting: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const active = ref(0);
    const displayModal = ref(false);
    return {
      active,
      displayModal,
    };
  },
  methods: {},
};
</script>
