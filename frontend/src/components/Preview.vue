// TODO Meeting preview before auth
<template>
  <Button
    label="Adjust My Availability"
    @click="scrollToResponders"
    class="p-button-lg p-button-success p-my-3 p-shadow-5"
  />
  <BestWindows />
  <Responders
    @select-user="setNewUser"
    ref="respondersElement"
    :responders="responders"
  />
  <NewUserForm @add-new-user="setNewUser" />
</template>

<script lang="ts">
import { ref } from "vue";

// PrimeVue Components
import Button from "primevue/button";

// Internal Components
import BestWindows from "@/components/BestWindows.vue";
import Responders from "@/components/Responders.vue";
import NewUserForm from "@/components/NewUserForm.vue";

export default {
  name: "Preview",
  components: {
    Button,
    BestWindows,
    Responders,
    NewUserForm,
  },
  props: {
    responders: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  emits: ["user-identified"],
  setup(_, { emit }) {
    const respondersElement: any = ref(null);

    const scrollToResponders = () => {
      respondersElement.value?.scrollIntoView({
        behavior: "smooth",
      });
    };

    const setNewUser = (name: string) => {
      emit("user-identified", name);
    };

    return {
      scrollToResponders,
      setNewUser,
    };
  },
};
</script>

<style scoped></style>
