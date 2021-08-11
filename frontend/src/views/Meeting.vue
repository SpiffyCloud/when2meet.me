<template>
  <div id="meeting" class="p-d-flex p-flex-column p-jc-between p-p-4">
    <h1 id="heading">{{ meeting.title }}</h1>
    <div id="action-group" class="p-mb-5 p-d-flex p-flex-column p-jc-between">
      <Button
        label="Copy Meeting URL"
        class="p-button-lg p-button-success p-my-3 p-shadow-5"
      />
    </div>

    <SelectButton v-model="selectedDisplayOption" :options="displayOptions" />
    <MyAvailability
      v-if="selectedDisplayOption === displayOptions[0]"
      :meeting="meeting"
    />
    <GroupAvailability v-else :meeting="meeting" />

    <Responses :meeting="meeting" />

    <NewUserForm />
  </div>
</template>

<script lang="tsx">
import { ref } from "vue";
import SelectButton from "primevue/selectbutton";
import Button from "primevue/button";

import MyAvailability from "@/components/MyAvailability.vue";
import GroupAvailability from "@/components/GroupAvailability.vue";
import Responses from "@/components/Responses.vue";
import NewUserForm from "@/components/NewUserForm.vue";

import useGetMeeting from "@/composables/useGetMeeting";

export default {
  name: "Meeting",
  components: {
    MyAvailability,
    GroupAvailability,
    Responses,
    NewUserForm,
    SelectButton,
    Button,
  },
  setup() {
    const { meeting, getMeeting } = useGetMeeting();

    const displayOptions = ["My Availability", "Group Availability"];
    const selectedDisplayOption = ref(displayOptions[0]);
    return {
      meeting,
      getMeeting,
      displayOptions,
      selectedDisplayOption,
    };
  },
};

// // Component
// @Options({
//   name: "Meeting",
//   components: {
//     Button,
//     SelectButton,
//     MyAvailability,
//     GroupAvailability,
//     Responses,
//     NewUserForm,
//   },
// })
// export default class Meeting extends Vue {
//   selectedDisplayOption = "My Availability";
//   displayOptions = ["My Availability", "Group Availability"];

//   meeting: meeting = {
//     title: "",
//     by_end_date: "",
//     availability: [],
//     best_windows: [],
//   };

//   filters = [
//     { label: "First Available", value: 0 },
//     { label: "Last Available", value: 1 },
//   ];
//   selectedFilter = { label: "First Available", value: 0 };
//   displayModal = false;

//   generateData(numPoints: number, options: { min: number; max: number }) {
//     const data = [];
//     for (let i = 0; i < numPoints; i++) {
//       data.push(Math.floor(Math.random() * (options.max - options.min) + options.min));
//     }
//     return data;
//   }

//   // Lifecycle method before render and dom but after data initialization
//   async created(): Promise<void> {
//     // get meeting id
//     const meetingId = this.$route.params.id;
//     // get meeting info from api
//     const requestOptions = {
//       method: "GET",
//       headers: { "Content-Type": "application/json" },
//     };
//     const response = await fetch(`/api/v1/meetings/${meetingId}`, requestOptions);
//     if (response.status == 200) {
//       this.meeting = await response.json();

//       const now = new Date();
//       now.setHours(0, 0, 0, 0);
//       const end = new Date(now);
//       end.setDate(end.getDate() + 5);

//       // convert to epoch time in 15 minute blocks
//       const startTime: number = Math.floor(now.getTime() / (15 * 60 * 1000));
//       const endTime: number = Math.floor(end.getTime() / (15 * 60 * 1000));
//       // TODO: Get real availabilites
//       this.meeting.availability = [
//         {
//           name: "John Doe",
//           slots: this.generateData(100, {
//             min: startTime,
//             max: endTime,
//           }),
//         },
//         {
//           name: "Jane Doe",
//           slots: this.generateData(100, {
//             min: startTime,
//             max: endTime,
//           }),
//         },
//         {
//           name: "John Smith",
//           slots: this.generateData(100, {
//             min: startTime,
//             max: endTime,
//           }),
//         },
//         {
//           name: "Jane Smith",
//           slots: this.generateData(100, {
//             min: startTime,
//             max: endTime,
//           }),
//         },
//       ];
//       // TODO: get best windows from api
//       this.meeting.best_windows = [
//         {
//           time: "August 08, 2021 from 5:00pm to 6:00pm",
//           members: ["John Doe", "Jane Doe", "John Smith", "Jane Smith"],
//         },
//         {
//           time: "August 09, 2021 from 12:00pm to 1:00pm",
//           members: ["John Doe", "Jane Doe", "John Smith"],
//         },
//         {
//           time: "August 1, 2021 from 9:00am to 10:30am",
//           members: ["John Doe", "Jane Doe"],
//         },
//       ];
//     } else {
//       this.$router.push("/404");
//     }
//   }

//   openModal() {
//     this.displayModal = true;
//   }

//   closeModal() {
//     this.displayModal = false;
//   }
// }
</script>

<style>
#meeting {
  background-color: var(--primary-color);
  color: var(--primary-color-text);
  font-family: var(--font-family);
  min-height: 100%;
}

.p-button.p-bg-white {
  background-color: white !important;
  color: var(--primary-color) !important;
}

.settings-icon {
  font-size: 2rem !important;
}
</style>
