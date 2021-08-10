<template>
  <div id="meeting" class="p-d-flex p-flex-column p-jc-between p-p-4">
    <h1>{{ meeting.title }}</h1>
    <div id="action-group" class="p-mb-5 p-d-flex p-flex-column p-jc-between">
      <Button
        label="Copy Meeting URL"
        class="p-button-lg p-button-success p-my-3 p-shadow-5"
      />
    </div>

    <div id="chart">
      <VueApexCharts
        height="1000px"
        :options="chartOptions"
        :series="chartData"
      />
    </div>

    <div id="toggle-group" class="p-d-flex p-flex-column p-jc-between"></div>

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
    <Dialog
      header="Best Window Options"
      v-model:visible="displayModal"
      :modal="true"
    >
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
    <Accordion
      class="p-my-3 p-shadow-5"
      v-if="meeting.best_windows?.length > 0"
    >
      <AccordionTab
        v-for="win in meeting.best_windows"
        :key="win.time"
        :header="win.time"
      >
        <p v-for="mem in win.members" :key="mem">
          {{ mem }}
        </p>
      </AccordionTab>
    </Accordion>
    <h3 class="p-my-2 p-text-center" v-else>No responses yet!</h3>

    <div
      id="responses-group"
      class="p-field p-d-flex p-flex-column p-jc-between p-mb-4"
    >
      <h3 id="responders-title" class="p-text-bold">Responders</h3>
      <small class="p-text-bold p-mb-2"
        >Click your name below to update your availability</small
      >
      <div id="responders-group" class="p-d-flex p-jc-start p-flex-wrap">
        <Button
          v-for="resp in meeting.availability"
          :key="resp.name"
          :label="resp.name"
          class="p-button p-bg-white p-m-1 p-button-lg p-shadow-2"
        />
      </div>
    </div>

    <div
      id="new-user-group"
      class="p-field p-d-flex p-flex-column p-jc-between"
    >
      <h3 id="new-user-title" class="p-text-bold p-mt-4">
        Can't find your name?
      </h3>
      <small class="p-text-bold p-mb-2"
        >Type your name here to enter your availability</small
      >
      <InputText
        id="name"
        type="text"
        placeholder="The Brash Baluga"
        class="p-shadow-5 p-inputtext-lg"
      />
      <Button
        class="p-button-success p-button-lg p-my-4 p-shadow-5"
        label="Add My Availability"
      />
    </div>
  </div>
</template>

<script lang="tsx">
import { Options, Vue } from "vue-class-component";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import Dialog from "primevue/dialog";
import SelectButton from "primevue/selectbutton";
import VueApexCharts from "vue3-apexcharts";
// Interfaces
interface window {
  time: string;
  members: string[];
}

interface availability {
  name: string;
  slots: number[];
}

interface meeting {
  title: string;
  by_end_date: string;
  availability: availability[];
  best_windows?: window[];
}

interface data {
  x: string;
  y: number;
}

interface series {
  name: string;
  data: data[];
}

// Component
@Options({
  name: "Meeting",
  components: {
    Accordion,
    AccordionTab,
    Button,
    InputText,
    Dropdown,
    Dialog,
    SelectButton,
    VueApexCharts,
  },
})
export default class Meeting extends Vue {
  active = 0;
  meeting: meeting = {
    title: "",
    by_end_date: "",
    availability: [],
    best_windows: [],
  };

  filters = [
    { label: "First Available", value: 0 },
    { label: "Last Available", value: 1 },
  ];
  selectedFilter = { label: "First Available", value: 0 };
  displayModal = false;

  chartOptions = {
    chart: {
      type: "heatmap",
      toolbar: false,
      height: 1000,
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#32a852"],
  };

  generateData(numPoints: number, options: { min: number, max: number }) {
    const data = [];
    for (let i = 0; i < numPoints; i++) {
      data.push(
        Math.floor(Math.random() * (options.max - options.min) + options.min)
      );
    }
    return data;
  }
  chartData = this.calculateSeries();

  calculateSeries() {
    // return a series of data points
    const chart: series[] = [];
    for (let i = 0; i < 96; i++) {
      let currentSeries: data[] = [];
      const data = this.generateData(5, { min: 0, max: 100 });
      for (let j = 0; j < 5; j++) {
        currentSeries.push({
          x: `${j}`,
          y: data[j],
        });
      }
      chart.push({
        name: `Series ${i}`,
        data: currentSeries,
      });
    }
    return chart;
  }
  // return {
  // series: [
  // {
  // name: "My First Chart",
  // data: [
  // {
  // x: "x",
  // y: 1,
  // },
  // ],
  // },
  // ],
  // };
  // Lifecycle method before render and dom but after data initialization
  async created(): Promise<void> {
    // get meeting id
    const meetingId = this.$route.params.id;
    // get meeting info from api
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(
      `/api/v1/meetings/${meetingId}`,
      requestOptions
    );
    if (response.status == 200) {
      this.meeting = await response.json();

      // TODO: Get real availabilites
      this.meeting.availability = [
        {
          name: "John Doe",
          slots: [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
            19, 20, 21, 22, 23,
          ],
        },
        {
          name: "Jane Doe",
          slots: [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
            19, 20, 21, 22, 23,
          ],
        },
        {
          name: "John Smith",
          slots: [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
            19, 20, 21, 22, 23,
          ],
        },
        {
          name: "Jane Smith",
          slots: [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
            19, 20, 21, 22, 23,
          ],
        },
      ];
      // TODO: get best windows from api
      this.meeting.best_windows = [
        {
          time: "August 08, 2021 from 5:00pm to 6:00pm",
          members: ["John Doe", "Jane Doe", "John Smith", "Jane Smith"],
        },
        {
          time: "August 09, 2021 from 12:00pm to 1:00pm",
          members: ["John Doe", "Jane Doe", "John Smith"],
        },
        {
          time: "August 1, 2021 from 9:00am to 10:30am",
          members: ["John Doe", "Jane Doe"],
        },
      ];
    } else {
      this.$router.push("/404");
    }
  }

  openModal() {
    this.displayModal = true;
  }

  closeModal() {
    this.displayModal = false;
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

#meeting {
  background-color: var(--primary-color);
  color: var(--primary-color-text);
  font-family: var(--font-family);
  min-height: 100%;
}

.p-error {
  color: var(--yellow-500) !important;
}

.p-button.p-bg-white {
  background-color: white !important;
  color: var(--primary-color) !important;
}

.settings-icon {
  font-size: 2rem !important;
}
</style>
