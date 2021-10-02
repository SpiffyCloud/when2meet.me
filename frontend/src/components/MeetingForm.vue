<template>
  <form @submit.prevent="submitMeeting">
    <span v-if="serverError">{{ serverError }}</span>
    <NameInput v-model:title="title" :error="titleError" />

    <CalendarInput v-model:date="by_end_date" :error="dateError" />

    <button type="submit" class="submit p-mt-2">Create Meeting</button>
  </form>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

import NameInput from '../components/NameInput.vue'
import CalendarInput from '../components/CalendarInput.vue'

export default defineComponent({
  name: 'MeetingForm',
  components: {
    NameInput,
    CalendarInput
  },
  props: {
    serverError: {
      type: String,
      default: ''
    }
  },
  emits: ['submit-meeting'],
  setup(_, { emit }) {
    const title = ref('')
    const titleError = ref('')
    const by_end_date = ref(new Date().toISOString())
    const dateError = computed(() => {
      // if date is before today, show error
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const endDate = new Date(
        by_end_date.value
          .concat('T00:00:00')
          .replace(/-/g, '/')
          .replace(/T.+/, '')
      )
      if (endDate < today) {
        return 'Date cannot be in theca past'
      }
      return ''
    })

    const submitMeeting = () => {
      // if title is empy, show error
      if (title.value === '') {
        titleError.value = 'Please enter a meeting name!'
      } else {
        titleError.value = ''
      }

      // if no errors, submit
      if (!titleError.value && !dateError.value) {
        emit('submit-meeting', {
          title,
          by_end_date
        })
      }
    }

    return {
      title,
      by_end_date,
      titleError,
      dateError,
      submitMeeting
    }
  }
})
</script>

<style>
.label {
  font-size: 1.5rem;
  font-weight: bold;
  display: block;
}

.assistive {
  font-size: 1.3rem;
  opacity: 0.5;
}

.submit {
  display: block;
  margin: 0 auto;
  width: 100%;
  height: 4rem;
  border: none;
  background-color: var(--secondary);
  color: var(--text);
  font-size: 1.75rem;
  font-weight: bold;
}
</style>
