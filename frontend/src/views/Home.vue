<template>
  <div id="home" class="p-d-flex p-flex-column p-jc-around p-p-5">
    <h1 id="heading" class="p-text-center p-text-bold">When 2 Meet Me</h1>
    <NameInput v-model:title="title" :error="titleError" />

    <CalendarInput v-model:date="by_end_date" />

    <div id="create-meeting-group" class="p-field p-text-left p-d-flex p-flex-column">
      <Button
        id="create-meeting"
        label="Create Meeting"
        @click="onMeetingCreate()"
        class="p-button-raised p-button-success p-button-lg"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Button from "primevue/button";

import NameInput from "../components/NameInput.vue";
import CalendarInput from "../components/CalendarInput.vue";

import usePostMeeting from "@/composables/usePostMeeting";

export default {
  name: "Home",
  components: {
    NameInput,
    CalendarInput,
    Button,
  },
  setup() {
    const { onMeetingCreate, title, titleError, by_end_date } = usePostMeeting();

    return {
      onMeetingCreate,
      title,
      titleError,
      by_end_date,
    };
  },
};
// @Options({
//   name: "Home",
//   components: {
//     Button,
//     NameInput,
//     CalendarInput,
//   },

//   watch: {
//     by_end_date: {
//       handler(value: string) {
//         // check if date is in the past
//         if (new Date(value) < new Date()) {
//           this.error.dateError = "End date cannot be in the past";
//         } else {
//           this.error.dateError = "";
//         }
//       },
//     },
//   },

//   methods: {
//     async onMeetingCreate() {
//       const id = await this.createMeeting();
//       if (id !== "Error") {
//         this.$router.push(`/${id}`);
//       }
//     },
//   },
// })
// export default class Home extends Vue {
//   title = "The Grandiose Meeting";
//   by_end_date = new Date();

//   error = {
//     nameError: "",
//     dateError: "",
//   };

//   async createMeeting(): Promise<string> {
//     // check if all fields are filled
//     if (this.title === "") {
//       this.error.nameError = "Please enter a meeting title";
//       return "Error";
//     } else {
//       const data = {
//         title: this.title,
//         by_end_date: this.by_end_date.toISOString().split("T")[0],
//       };
//       const requestOptions = {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//       };
//       const response = await fetch("api/v1/meetings/", requestOptions);
//       if (response.status === 201) {
//         const respData = await response.json();
//         return respData.meeting_id;
//       } else {
//         const err = await response.json();
//         this.error = {
//           nameError: err.title ? err.title[0] : "",
//           dateError: err.by_end_date ? err.by_end_date[0] : "",
//         };
//         return "Error";
//       }
//     }
//   }
// }
</script>

<style lang="css">
#home {
  background-color: var(--primary-color);
  color: var(--primary-color-text);
  font-family: var(--font-family);
  height: 100%;
}

.p-field {
  max-width: 500px;
  margin-right: auto;
  margin-left: auto;
}
</style>
