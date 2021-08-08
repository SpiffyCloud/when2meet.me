<template>
  <div id="home" class="p-d-flex p-flex-column p-jc-around p-p-5">
    <h1 id="heading" class="p-text-center p-text-bold">When 2 Meet Me</h1>

    <div id="name-group" class="p-field p-text-left p-d-flex p-flex-column">
      <label class="p-text-bold" for="name">What is this meeting for?</label>
      <InputText
        id="name"
        type="text"
        v-model="title"
        placeholder="The Grandiose Meeting"
        :class="{ 'p-invalid': this.error.nameError }"
        class="p-shadow-5 p-inputtext-lg"
      />
      <p
        v-if="this.error.nameError"
        id="name-help"
        class="p-error p-text-bold p-mt-2"
      >
        <i class="pi pi-exclamation-triangle p-mr-1"></i
        >{{ this.error.nameError }}
      </p>
    </div>

    <div id="date-group" class="p-field p-text-left p-d-flex p-flex-column">
      <label for="date" class="p-text-bold">When do you need to meet by?</label>
      <Calendar
        id="touchUI"
        v-model="by_end_date"
        :touchUI="true"
        :class="{ 'p-invalid': this.error.dateError }"
        class="p-shadow-5 p-inputtext-lg"
      />
      <p
        v-if="this.error.dateError"
        id="date-help"
        class="p-error p-text-bold p-mt-2"
      >
        <i class="pi pi-exclamation-triangle p-mr-1"></i
        >{{ this.error.dateError }}
      </p>
    </div>

    <div id="create-meeting-group" class="p-fluid p-mt-2 p-mx-1">
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
import { Options, Vue } from "vue-class-component";
import Button from "primevue/button";
import Calendar from "primevue/calendar";
import InputText from "primevue/inputtext";

// import adjectives from "../assets/adjectives.json";

interface meeting {
  title: string;
  by_end_date: string;
}

@Options({
  name: "Home",
  components: {
    Button,
    Calendar,
    InputText,
  },

  watch: {
    by_end_date: {
      handler(value: string) {
        // check if date is in the past
        if (new Date(value) < new Date()) {
          this.error.dateError = "End date cannot be in the past";
        } else {
          this.error.dateError = "";
        }
      },
    },
  },

  methods: {
    async onMeetingCreate() {
      const id = await this.createMeeting();
      if (id !== "Error") {
        this.$router.push(`/${id}`);
      }
    },
  },
})
export default class Home extends Vue {
  title = "The Grandiose Meeting";
  by_end_date = new Date();

  error = {
    nameError: "",
    dateError: "",
  };

  async createMeeting(): Promise<string> {
    // check if all fields are filled
    if (this.title === "") {
      this.error.nameError = "Please enter a meeting title";
      return "Error";
    } else {
      const data: meeting = {
        title: this.title,
        by_end_date: this.by_end_date.toISOString().split("T")[0],
      };
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
      const response = await fetch("api/v1/meetings/", requestOptions);
      if (response.status === 201) {
        const respData = await response.json();
        return respData.meeting_id;
      } else {
        const err = await response.json();
        this.error = {
          nameError: err.title ? err.title[0] : "",
          dateError: err.by_end_date ? err.by_end_date[0] : "",
        };
        return "Error";
      }
    }
  }
}
</script>

<style lang="css">
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

#home {
  background-color: var(--primary-color);
  color: var(--primary-color-text);
  font-family: var(--font-family);
  height: 100vh;
}

.p-error {
  color: var(--yellow-500) !important;
}
</style>
