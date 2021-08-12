<template>
  <div id="about" class="p-d-flex p-flex-column p-jc-between p-p-4">
    <h1 id="heading" class="p-text-center p-text-bold">When 2 Meet Me</h1>

    <div id="about-group" class="p-field p-text-left p-d-flex p-flex-column">
      <label for="about" class="p-text-bold">What is When2MeetMe?</label>
      <p>
        When2MeetMe is a quick and easy availability survey tool that helps you find the best times you and your group can meet.
      </p>
      <p>
        Please read our <Button label="Link" class="p-button-link" @click="openModal">terms and conditions</Button> for details on whta we track and use the data we collect.
      </p>
    </div>

    <Dialog
      header="Terms and Conditions"
      v-model:visible="displayModal"
      :modal="true"
    >
      <p>
        A document that says legal stuff...
      </p>
    </Dialog>

    <div id="feedback-group" class="p-field p-text-left p-d-flex p-flex-column">
      <label for="feedback" class="p-text-bold">We'd love your feedback!</label>
      <p>
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
    </div>

    <div id="thoughts-group" class="p-field p-text-left p-d-flex p-flex-column">
      <label for="thoughts" class="p-text-bold">Would you like to say something?</label>
      <p>
        Share your thoughts and ideas. <span>optional</span>
      </p>
      <Textarea v-model="value" :autoResize="true" rows="5" cols="30" placeholder="This is cool!" />

      <Button
        id="submit-feedback"
        label="Submit My Feedback"
        @click="onSubmitFeedback()"
        class="p-button-raised p-button-success p-button-lg"
      />
    </div>

    <div id="contact-group" class="p-field p-text-left p-d-flex p-flex-column">
      <label for="contact" class="p-text-bold">Like our style?</label>
      <p>
        When2MeetMe is designed, developed, and maintained by a stellar group of people who love to make great products.
      </p>
      <p>
        If you've got an idea and would like to hire us - just let us know!
      </p>
      <Textarea v-model="contact" :autoResize="true" rows="5" cols="30" placeholder="You guys rock!" />

      <Button
        id="hire-us"
        label="Hire Us"
        @click="onHireUs()"
        class="p-button-raised p-button-success p-button-lg"
      />
    </div>

    <h3 id="footer" class="p-text-center p-text-bold">Home</h3>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Button from "primevue/button";
import Textarea from "primevue/textarea";
import Dialog from "primevue/dialog";

@Options({
  name: "About",
  components: {
    Button,
    Textarea,
    Dialog,
  },

  methods: {
    async onSubmitFeedback() {
      console.log("[todo] onSubmitFeedback")
    },
    async onHireUs() {
      console.log("[todo] onHireUs")
    },
  },
})

export default class About extends Vue {
  displayModal = false;

  openModal() {
    this.displayModal = true;
  }
}
</script>

<style lang="css">
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

#about {
  background-color: var(--primary-color);
  color: var(--primary-color-text);
  font-family: var(--font-family);
}

.p-field {
  min-width: 320px;
  max-width: 500px;
  margin-right: auto;
  margin-left: auto;
}
</style>
