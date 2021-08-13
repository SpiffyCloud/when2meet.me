import { useRoute } from "vue-router";
import { ref, onMounted, watch } from "vue";
import { meeting, fetchMeeting } from "../api/meeting";



export default function useGetMeeting() {
    const route = useRoute();

    const meeting = ref({} as meeting);

    const generateData =  (numPoints: number, options: { min: number; max: number }) => {
      const data = [];
      for (let i = 0; i < numPoints; i++) {
        data.push(
          Math.floor(Math.random() * (options.max - options.min) + options.min)
        );
      }
      return data;
    }
    const getMeeting = async () => {
      meeting.value = await fetchMeeting(route.params.id as string);
      // start date epoch at ytoday 0 hour
      const startDate = new Date();
      startDate.setHours(0, 0, 0, 0);
      // get number of 15 minute intervals
      const start15MinBlock = startDate.getTime() / (1000 * 60 * 15);

      const endDate = new Date(meeting.value.by_end_date)
      const end15MinBlock = endDate.getTime() / (1000 * 60 * 15);


      meeting.value.availability = [
        {
          name: "Jack",
          slots: generateData(100, { min: start15MinBlock, max: end15MinBlock }),
        },
        {
          name: "Jill",
          slots: generateData(100, { min: start15MinBlock, max: end15MinBlock }),
        },
        {
          name: "Jim",
          slots: generateData(100, { min: start15MinBlock, max: end15MinBlock }),
        },
        {
          name: "Jen",
          slots: generateData(100, { min: start15MinBlock, max: end15MinBlock }),
        }
      ]
    };

    onMounted(getMeeting);

    watch(() => route.params.id, getMeeting);

    return {
        meeting,
        getMeeting,
    }
}