<template>
  <div id="group-availability">
    <h3>Group Availability</h3>
    <VueApexCharts height="2000px" :options="chartOptions" :series="chartData" />
  </div>
</template>

<script lang="ts">
import { reactive, ref, onMounted, toRefs } from "vue";

import VueApexCharts from "vue3-apexcharts";

export default {
  name: "Group",
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
    const chartData = [] as any;
    const { meeting } = toRefs(props);

    const initChartData = () => {
      const startDate = new Date();
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(meeting.by_end_date);
      endDate.setHours(23, 59, 59, 999);

      const startEpoch = Math.floor(startDate.getTime() / (1000 * 60 * 15));
      const endEpoch = Math.floor(endDate.getTime() / (1000 * 60 * 15));
      const groupAvailability = [];
      for (let i = startEpoch; i < endEpoch; i++) {
        groupAvailability.push(0);
      }

      const availabilites = meeting.availability;
      for (let i = 0; i < availabilites?.length; i++) {
        const availability = availabilites[i];
        for (let j = 0; j < availability.slots.length; j++) {
          const slot = availability.slots[j];
          if (slot >= startEpoch && slot < endEpoch) {
            groupAvailability[slot - startEpoch] += 1;
          }
        }
      }
      // createa series of data points from the group availability
      for (let y = 0; y < 96; y++) {
        const rawData = [];
        for (let x = 0; x < 5; x++) {
          const data = groupAvailability[y + x * 96];
          const date = new Date((y + x * 96) * 15 * 60 * 1000);
          rawData.push({
            x: `${date.getMonth() + 1}/${date.getDate()}`,
            y: 1,
          });
        }
        const day = new Date(y * 15 * 60 * 1000);
        chartData.push({
          name: `${day.getHours()}:${day.getMinutes()}`,
          data: rawData,
        });
      }
    };

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

    onMounted(initChartData);

    return {
      chartData,
      chartOptions,
      initChartData,
    };
  },
};
</script>
