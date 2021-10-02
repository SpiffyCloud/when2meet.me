<template>
  <div id="new-user-group">
    <label class="label p-mb-2" for="new-user">Who are you?</label>
    <em class="assistive">Type your name here to enter your availability</em>

    <input
      class="input"
      :class="{ 'input-error': nameError?.length > 0 }"
      v-model="name"
    />
    <p v-if="nameError?.length > 0" id="name-help" class="error-text">
      {{ nameError }}
    </p>
    <button class="button p-mt-5" @click="addNewUser">
      Add my Availability
    </button>
  </div>
</template>

<script lang="ts">
import usePostNewUser from '@/composables/usePostNewUser'

export default {
  setup() {
    return {
      ...usePostNewUser()
    }
  }
}
</script>
