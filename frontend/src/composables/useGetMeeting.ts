import { useRoute } from "vue-router";
import { ref, onMounted, watch } from "vue";
import { meeting, fetchMeeting } from "../api/meeting";



export default function useGetMeeting() {
  const route = useRoute();

  const meeting = ref({} as meeting);
  const generateData = (
    numPoints: number,
    options: { min: number; max: number }
  ) => {
    const data = [];
    for (let i = 0; i < numPoints; i++) {
      data.push(
        Math.floor(
          Math.random() * (options.max - options.min) +
          options.min
        )
      );
    }
    return data;
  };

  const addFakeData = (meeting: any) => {
    meeting.value.availability = [
      {
        name: "Jack",
        slots: generateData(100, { min: 0, max: 480 }),
      },
      {
        name: "Jill",
        slots: generateData(100, { min: 0, max: 480 }),
      },
      {
        name: "Jim",
        slots: generateData(100, { min: 0, max: 480 }),
      },
      {
        name: "Jen",
        slots: generateData(100, { min: 0, max: 480 }),
      },
    ];
  };






  const getMeeting = async () => {
    meeting.value = await fetchMeeting(route.params.id as string);
    addFakeData(meeting);

    return meeting
  }




  onMounted(getMeeting);

  watch(() => route.params.id, getMeeting);

  return {
    meeting,
  }
}