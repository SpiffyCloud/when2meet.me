<template>
  <h3 id="responders-title" class="p-text-bold">Responders</h3>
  <div v-if="responders.length > 0">
    <p class="p-text-bold p-mb-1" v-if="isIdentified">
      Click on a responder to see his or her individual availability
    </p>
    <p v-else class="p-text-bold p-mb-1">
      Click your name below to update your availability
    </p>
    <Button
      v-for="name in responders"
      @click="selectUser(name)"
      :key="name"
      :label="name"
      class="p-button p-bg-white p-m-1 p-button-lg p-shadow-2 response-btn"
    />
  </div>
  <div v-else>No responders yet!</div>
</template>

<script lang="ts">
// Primevue Components
import Button from "primevue/button";
import { computed } from "vue";
import { availability } from "@/api/meeting";

export default {
  name: "Responders",
  components: {
    Button,
  },
  props: {
    availability: {
      type: Array as () => availability[],
      required: false,
      default: () => [],
    },
    isIdentified: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ["user-clicked"],
  setup(props, { emit }) {
    const selectUser = (name: string) => {
      emit("user-clicked", name);
    };

    const responders = computed(() => {
      return props.availability.map((resp) => resp.name);
    });

    return {
      responders,
      selectUser,
    };
  },
};
</script>

<style scoped></style>
