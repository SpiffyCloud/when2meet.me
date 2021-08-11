<template>
  <div id="meeting" class="p-d-flex p-flex-column p-jc-between p-p-4">
    <h1 id="heading">{{ meeting.title }}</h1>
    <div id="action-group" class="p-mb-5 p-d-flex p-flex-column p-jc-between">
      <Button
        label="Copy Meeting URL"
        class="p-button-lg p-button-success p-my-3 p-shadow-5"
      />
    </div>

    <div id="chart" class="chart-parent">
      <VueApexCharts
        height="1000px"
        :options="chartOptions"
        :series="chartData"
        @click="handleClick"
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
    },
    dataLabels: {
      enabled: true,
    },
    title: {
      text: "HeatMap Chart (Single color)",
    },
    colors: ["#32a852"],
  };

  generateData(numPoints: number, options: { min: number; max: number }) {
    const data = [];
    for (let i = 0; i < numPoints; i++) {
      data.push(
        Math.floor(Math.random() * (options.max - options.min) + options.min)
      );
    }
    return data;
  }
  chartData = [] as series[];

  calculateChartData(startTime: number, endTime: number): series[] {
    const availabilites = this.meeting.availability;
    // create a blank array from the start time to the end time
    const groupAvailability = [];
    for (let i = startTime; i < endTime; i++) {
      groupAvailability.push(0);
    }

    // create an array with the number of availabilities for each time slot from the start time to the end time
    for (let i = 0; i < availabilites.length; i++) {
      const availability = availabilites[i];
      for (let j = 0; j < availability.slots.length; j++) {
        const slot = availability.slots[j];
        if (slot >= startTime && slot < endTime) {
          groupAvailability[slot - startTime] += 1;
        }
      }
    }
    // createa series of data points from the group availability
    const chart: series[] = [];
    for (let y = 0; y < 96; y++) {
      const rawData = [];
      for (let x = 0; x < 5; x++) {
        const data = groupAvailability[y + x * 96];
        rawData.push({
          x: `${this.convertToDate(y + x * 96)}`,
          y: data,
        });
      }
      chart.push({
        name: `${this.convertToTime(y)}`,
        data: rawData,
      });
    }
    return chart;
  }

  convertToDate(x: number): string {
    const date = new Date(x * 15 * 60 * 1000);
    // return month and date
    return `${date.getMonth() + 1}/${date.getDate()}`;
  }

  convertToTime(y: number): string {
    const date = new Date(y * 15 * 60 * 1000);
    // return hour and minute
    return `${date.getHours()}:${date.getMinutes()}`;
  }

  // get todays date at 12:00 AM

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

      const now = new Date();
      now.setHours(0, 0, 0, 0);
      const end = new Date(now);
      end.setDate(end.getDate() + 5);

      // convert to epoch time in 15 minute blocks
      const startTime: number = Math.floor(now.getTime() / (15 * 60 * 1000));
      const endTime: number = Math.floor(end.getTime() / (15 * 60 * 1000));
      // TODO: Get real availabilites
      this.meeting.availability = [
        {
          name: "John Doe",
          slots: this.generateData(100, { min: startTime, max: endTime }),
        },
        {
          name: "Jane Doe",
          slots: this.generateData(100, { min: startTime, max: endTime }),
        },
        {
          name: "John Smith",
          slots: this.generateData(100, { min: startTime, max: endTime }),
        },
        {
          name: "Jane Smith",
          slots: this.generateData(100, { min: startTime, max: endTime }),
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

      this.chartData = this.calculateChartData(startTime, endTime).slice(0, 40);
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

  startDrag = {
    x: null,
    y: null,
  };

  endDrag = {
    x: null,
    y: null,
  };

  handleClick(event: any, chart: any, opts: any) {
    console.log(this.startDrag);
    if (this.startDrag.x != null && this.startDrag.y != null) {
      this.endDrag = {
        x: opts.dataPointIndex,
        y: opts.seriesIndex,
      };
      console.log("Start", this.startDrag);
      console.log("End", this.endDrag);
      this.startDrag = {
        x: null,
        y: null,
      };
      this.endDrag = {
        x: null,
        y: null,
      };
    } else {
      this.startDrag = {
        x: opts.dataPointIndex,
        y: opts.seriesIndex,
      };
    }
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
