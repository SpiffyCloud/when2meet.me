<template>
  <div id="about" class="p-d-flex p-flex-column p-jc-between p-p-4">
    <h1 id="heading" class="p-text-center p-text-bold p-pb-4">
      When 2 Meet Me
    </h1>

    <div id="what-is" class="p-field p-text-left p-d-flex p-flex-column p-pb-2">
      <h4 class="p-pb-2">What is When2MeetMe?</h4>
      <p class="p-pb-2">
        When2MeetMe is a quick and easy availability survey tool that helps you
        find the best times you and your group can meet.
      </p>
      <p class="p-pb-2">
        Please read our
        <a href="#" class="p-underline" @click="openTerms"
          >terms and conditions</a
        >
        for details on whta we track and use the data we collect.
      </p>
    </div>

    <Dialog
      header="Terms and Conditions"
      v-model:visible="displayModalTerms"
      :modal="true"
    >
      <p class="">A document that says legal stuff...</p>
    </Dialog>

    <div
      id="feedback-love-group"
      class="p-field p-text-left p-d-flex p-flex-column p-pb-2"
    >
      <h4 class="p-pb-2">We'd love your feedback!</h4>
      <p class="p-pb-2">The good, the bad, and the ugly.</p>

      <div id="feedback-love" class="p-d-flex p-jc-start p-flex-wrap">
        <Button
          v-for="(item, index) in feedbackMessages"
          :key="index"
          @click="selectFeedback"
          class="p-button p-bg-white p-m-1 p-button-lg p-shadow-2"
        >
          {{ item }}
        </Button>
      </div>
    </div>

    <div
      id="feedback-contact"
      class="p-field p-text-left p-d-flex p-flex-column p-pb-2"
    >
      <h4 class="p-pb-2">Would you like to say something?</h4>
      <p class="p-pb-2">Share your thoughts and ideas. <span>optional</span></p>
      <Textarea
        v-model="contact"
        :autoResize="true"
        rows="5"
        cols="30"
        placeholder="This is cool!"
      />
      <br />
      <Button
        id="submit-feedback"
        label="Submit My Feedback"
        @click="onSubmitFeedback"
        class="p-button-raised p-button-success p-button-lg"
      />
    </div>

    <div id="hire-contact" class="p-field p-text-left p-d-flex p-flex-column p-pb-2">
      <h4 class="p-pb-2">Like our style?</h4>
      <p class="p-pb-2">
        When2MeetMe is designed, developed, and maintained by a stellar group of
        people who love to make great products.
      </p>
      <p class="">
        If you've got an idea and would like to hire us - just let us know!
      </p>
      <br />
      <Button
        id="hire-us"
        label="Hire Us"
        @click="openHireUs"
        class="p-button-raised p-button-success p-button-lg"
      />

      <Dialog
        header="Hire Us"
        v-model:visible="displayModalHireUs"
        :modal="true"
      >
        <Textarea
          v-model="hireContact"
          :autoResize="true"
          rows="5"
          cols="30"
          placeholder="You guys rock!"
        />
      </Dialog>
    </div>

    <h3 id="footer" class="p-text-center p-text-bold p-pt-2">Home</h3>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Button from "primevue/button";
import Textarea from "primevue/textarea";
import Dialog from "primevue/dialog";
import SelectButton from "primevue/selectbutton";

@Options({
  name: "About",
  components: {
    Button,
    Textarea,
    Dialog,
    SelectButton,
  },

  methods: {
    onSubmitFeedback() {
      console.log("[todo] onSubmitFeedback");
    },
    onSubmitHireUs() {
      console.log("[todo] onSubmitHireUs");
    },
  },
})
export default class About extends Vue {
  displayModalTerms = false;
  displayModalHireUs = false;

  feedbackMessages = [
    "I love it!",
    "I hate it!",
    "Fast",
    "Great experience",
    "Easy to use",
    "It's confusing",
    "Unintuitive",
  ];

  selectedFeedbackMessages = [];

  openTerms() {
    this.displayModalTerms = true;
  }

  openHireUs() {
    this.displayModalHireUs = true;
  }

  selectFeedback() {
    console.log("[todo] selectFeedback");
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
