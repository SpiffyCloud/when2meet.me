<template>
  <div id="new-user-group" class="p-field p-d-flex p-flex-column p-jc-between">
    <h3 id="new-user-title" class="p-text-bold p-mt-4">Can't find your name?</h3>
    <small class="p-text-bold p-mb-2"
      >Type your name here to enter your availability</small
    >
    <InputText
      id="name"
      type="text"
      v-model="name"
      placeholder="The Brash Baluga"
      class="p-shadow-5 p-inputtext-lg"
      :class="{ 'p-invalid': nameError?.length > 0 }"
      @keydown="handleKeyDown($event)"
      
    />
        <p v-if="nameError?.length > 0" id="name-help" class="p-error p-text-bold p-mt-2">
      <i class="pi pi-exclamation-triangle p-mr-1"></i>{{ nameError }}
    </p>
    <Button
      class="p-button-success p-button-lg p-my-4 p-shadow-5"
      label="Add My Availability"
      @click="addNewUser()"
    />
  </div>
</template>

<script lang="ts">
import { ref} from 'vue';
import { useRoute } from 'vue-router';
import InputText from "primevue/inputtext";
import Button from "primevue/button";

import { postNewUser } from '@/api/meeting'

export default {
  components: {
    InputText,
    Button,
  },
  setup(props: any, context: any) {
    const name = ref("");
    const nameError = ref("")

    const route = useRoute();

    const addNewUser = async () => {
      if (name.value.trim() === "")  {
        nameError.value = "Please fill out a name!"
        return;
      }
      nameError.value = "";
      const response = await postNewUser(route.params.id as string, name.value);
      context.emit("add-new-user", response.name);
    }  

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        addNewUser();
      }
    }
    
    return {
      name,
      nameError,
      addNewUser,
      handleKeyDown, 
    };
  },
};
</script>
