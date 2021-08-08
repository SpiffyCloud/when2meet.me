<template>
  <div id="meeting" class="p-d-flex p-flex-column p-jc-start p-p-5">
    <h1>The Grandiose Meeitng</h1>
    <div id="action-group" class="p-mb-5 p-d-flex p-flex-column p-jc-between">
      <Button
        label="Copy Meeting URL"
        class="p-button-lg p-button-success p-my-3 p-shadow-5"
      />
      <Button
        label="Adjust My Availability"
        class="p-button-lg p-button-success p-my-3 p-shadow-5"
      />
    </div>

    <div id="best-group" class="p-d-flex p-flex-column p-jc-between">
      <h3 id="best-title" class="p-text-bold">Best Windows of Availability</h3>
      <Accordion class="p-my-5 p-shadow-5" v-if="tabs.length > 0">
        <AccordionTab v-for="tab in tabs" :key="tab.title" :header="tab.title">
          <p>{{ tab.content }}</p>
        </AccordionTab>
      </Accordion>
      <h3 class="p-my-2 p-text-center" v-else>No responses yet!</h3>
    </div>
  </div>
</template>

<script lang="tsx">
import { Options, Vue } from "vue-class-component";
import Button from "primevue/button";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";

@Options({
  name: "Meeting",
  components: {
    Button,
    Accordion,
    AccordionTab,
  },
})
export default class Meeting extends Vue {
  active = 0;
  tabs = [
    {
      title: "August 07, 2021: 5:00pm - 9:00pm (4/5)",
      content: "Dayron, Jack, Cole, Alex",
      value: 80,
    },
    {
      title: "August 08, 2021: 12:00pm - 3:00pm (3/5)",
      content: "Dayron, Jack, Cole",
      value: 60,
    },
    {
      title: "August 11, 2021: 9:30am - 11:30am (2/5)",
      content: "Cole, Alex",
      value: 40,
    },
  ];

  getClass(value: number) {
    if (value >= 80) {
      return "p-bg-success";
    } else if (value >= 60) {
      return "p-bg-warning";
    } else if (value >= 40) {
      return "p-bg-danger";
    } else {
      return "p-bg-info";
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

#meeting {
  background-color: var(--primary-color);
  color: var(--primary-color-text);
  font-family: var(--font-family);
  min-height: 100vh;
}

.p-error {
  color: var(--yellow-500) !important;
}
</style>
