<template>
  <div id="about" class="p-d-flex p-flex-column p-jc-between p-p-5">
    <h1 id="heading" class="p-text-center p-text-bold">When 2 Meet Me</h1>

    <div id="about-group" class="p-field p-text-left p-d-flex p-flex-column">
      <label for="about" class="p-text-bold">What is When2MeetMe?</label>
      <p>
        When2MeetMe is a quick and easy availability survey tool that helps you find the best times you and your group can meet.
      </p>
      <p>
        Please read our terms and conditions for details on whta we track and use the data we collect.
      </p>
    </div>

    <div id="feedback-group" class="p-field p-text-left p-d-flex p-flex-column">
      <label for="feedback" class="p-text-bold">We'd love your feedback!</label>
      <p class="">
        The good, the bad, and the ugly.
      </p>

      <div id="feedback-love-group" class="p-d-flex p-jc-start p-flex-wrap">   <!-- TODO: This can be change into a more robust solution. -->
        <Button
          class="p-button p-bg-white p-m-1 p-button-lg p-shadow-2">
          I love it!
        </Button>
        <Button
          class="p-button p-bg-white p-m-1 p-button-lg p-shadow-2">
          I hate it!
        </Button>
        <Button
          class="p-button p-bg-white p-m-1 p-button-lg p-shadow-2">
          Fast
        </Button>
        <Button
          class="p-button p-bg-white p-m-1 p-button-lg p-shadow-2">
          Great experience
        </Button>
        <Button
          class="p-button p-bg-white p-m-1 p-button-lg p-shadow-2">
          Easy to use
        </Button>
        <Button
          class="p-button p-bg-white p-m-1 p-button-lg p-shadow-2">
          It's confusing
        </Button>
        <Button
          class="p-button p-bg-white p-m-1 p-button-lg p-shadow-2">
          Unintuitive
        </Button>
      </div>

      <div id="fedback-thoughts-group" class="p-field p-text-left p-d-flex p-flex-column">
        <label for="about" class="p-text-bold">Would you like to say something?</label>
        <p>
          Share your thoughts and ideas. <span>optional</span>
        </p>
        <Textarea v-model="value" :autoResize="true" rows="5" cols="30" />
      </div>
      <!-- 
  This is cool!
  Submit My Feedback -->
    </div>

    <div
      id="create-meeting-group"
      class="p-field p-text-left p-d-flex p-flex-column"
    >
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
import Textarea from "primevue/textarea";
import Button from "primevue/button";

@Options({
  name: "About",
  components: {
    Textarea,
    Button,
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

export default class About extends Vue {
  title = "The Grandiose Meeting";
  by_end_date = new Date();

  error = {
    nameError: "",
    dateError: "",
  };
}
</script>

<style lang="css">
#about {
  background-color: var(--primary-color);
  color: var(--primary-color-text);
  font-family: var(--font-family);
  height: 100%;
}

.p-error {
  color: var(--yellow-500) !important;
}
.p-field {
  max-width: 500px;
  margin-right: auto;
  margin-left: auto;
}
</style>
