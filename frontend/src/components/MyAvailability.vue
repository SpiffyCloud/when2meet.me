<template>
  <div id="chart">
    <VueApexCharts :options="chartOptions" :series="chartData" @click="handleClick" />
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import VueApexCharts from "vue3-apexcharts";

export default {
  components: {
    VueApexCharts,
  },
  props: {
    meeting: {
      type: Object,
      required: true,
    },
  },
  setup(props: any) {
    const chartData = ref([]);
    const chartOptions = {
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

    return {
      chartData,
      chartOptions,
    };
  },

  methods: {
    handleClick(event: any, chart: any, opts: any) {
      console.log("click");
      return;
    },
    convertToDate(x: number): string {
      const date = new Date(x * 15 * 60 * 1000);
      // return month and date
      return `${date.getMonth() + 1}/${date.getDate()}`;
    },
    convertToTime(y: number): string {
      const date = new Date(y * 15 * 60 * 1000);
      // return hour and minute
      return `${date.getHours()}:${date.getMinutes()}`;
    },
    calculateChartData(startTime: number, endTime: number) {
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
      const chart = [];
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
    },
  },
};
</script>
