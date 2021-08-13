<template>
  <div id="group-availability">
    <h3>Group Availability</h3>
    <ScrollPanel style="width: 100%; height: 600px">
      <VueApexCharts height="3000px" :options="chartOptions" :series="chartData" />
    </ScrollPanel>
  </div>
</template>

<script lang="ts">
import { reactive, ref, onMounted, toRefs } from "vue";

import VueApexCharts from "vue3-apexcharts";
import ScrollPanel from "primevue/scrollpanel";

export default {
  name: "Group",
  components: {
    VueApexCharts,
    ScrollPanel,
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
      // get number of 15 minute intervals
      const start15MinBlock = startDate.getTime() / (1000 * 60 * 15);

      // startDate + 5 days
      const endDate = new Date(startDate.getTime() + 1000 * 60 * 60 * 24 * 5);
      const end15MinBlock = endDate.getTime() / (1000 * 60 * 15);
      const groupAvailability = [];
      for (let i = start15MinBlock; i < end15MinBlock; i++) {
        groupAvailability.push(0);
      }
      const availabilites = meeting.value.availability;
      for (let i = 0; i < availabilites?.length; i++) {
        const availability = availabilites[i];
        for (let j = 0; j < availability.slots.length; j++) {
          const slot = availability.slots[j];
          if (slot >= start15MinBlock && slot < end15MinBlock) {
            groupAvailability[slot - start15MinBlock] += 1;
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
            y: data,
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
        enabled: false,
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
