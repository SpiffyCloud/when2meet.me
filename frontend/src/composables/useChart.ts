import { ref, watch, computed, inject, onMounted } from "vue";
import { meeting } from "@/api/meeting";

export default function useChart() {
  // Create a 2d array to represent a list of availabilities
  const chartData = ref([] as any);
  const tableUser = ref("");

  const meeting = inject("meeting") as meeting;
  watch(meeting, () => {
    if (meeting.meeting_id) {
      initChartData();
    }
  });

  const formatAMPMTime = (date: Date) => {
    let hours: number = date.getHours();
    let minutes: any = date.getMinutes();

    const ampm = hours > 12 ? "PM" : "AM";

    hours = hours % 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return `${hours}:${minutes} ${ampm}`;
  };

  const createChartData = (start15MinBlock, end15MinBlock) => {
    chartData.value = [];
    // create an array of 0s for each 15 min block
    const groupAvailability = Array(end15MinBlock - start15MinBlock).fill(0);
    meeting.availability.forEach((user) => {
      if (user.name === "All" || user.name === tableUser.value) {
        user.slots.forEach((slot) => {
          if (slot >= start15MinBlock && slot <= end15MinBlock) {
            groupAvailability[slot - start15MinBlock] += 1;
          }
        });
      }
    });

    // createa series of data points from the group availability.value
    const { endDate } = getStartAndEndDate();
    const days = dateDiffInDays(new Date(), endDate);
    for (let y = 0; y < 96; y++) {
      const rawData = [] as any;
      for (let x = 0; x < days; x++) {
        const data = groupAvailability[y + x * 96];
        const date = new Date((start15MinBlock + y + x * 96) * 15 * 60 * 1000);
        rawData.push({
          x: `${date.getMonth() + 1}/${date.getDate()}`,
          y: data,
          slot: start15MinBlock + y + x * 96,
        });
      }
      const day = new Date((start15MinBlock + y) * 15 * 60 * 1000);

      chartData.value.push({
        name: formatAMPMTime(day),
        data: rawData,
      });
    }
  };

  const dates = computed(() => {
    return chartData.value.length > 0
      ? chartData.value[0].data.map((dataPoint) => dataPoint.x)
      : [];
  });

  const initChartData = () => {
    // CHANGE TO REAL DATE
    const { today, endDate } = getStartAndEndDate();
    const start15MinBlock = get15MinuteBlock(today);
    const end15MinBlock = get15MinuteBlock(endDate);

    createChartData(start15MinBlock, end15MinBlock);
  };

  const getStartAndEndDate = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const formattedDate = meeting.by_end_date
      .concat("T00:00:00")
      .replace(/-/g, "/")
      .replace(/T.+/, "");
    const endDate = new Date(formattedDate);
    endDate.setDate(endDate.getDate() + 1);

    return {
      today,
      endDate,
    };
  };

  const get15MinuteBlock = (date: Date) => {
    return date.getTime() / (15 * 60 * 1000);
  };

  const _MS_PER_DAY = 1000 * 60 * 60 * 24;

  const dateDiffInDays = (a, b) => {
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  };




  return {
    chartData,
    dates,
    initChartData,
  };
}
