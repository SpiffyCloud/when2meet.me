<template>
    <span v-if="serverError">{{ serverError }}</span>
    <NameInput v-model:title="title" />

    <CalendarInput v-model:date="by_end_date" />

    <Button
        id="create-meeting"
        label="Create Meeting"
        :disabled="!formValid"
        @click="submitMeeting"
        class="p-button-raised p-button-success p-button-lg"
    />
</template>

<script lang="ts">
import { computed, defineComponent, ref, Ref } from "vue";

import Button from "primevue/button";

import NameInput from "../components/NameInput.vue";
import CalendarInput from "../components/CalendarInput.vue";

export default defineComponent({
    name: "MeetingForm",
    components: {
        Button,
        NameInput,
        CalendarInput,
    },
    props: {
        serverError: {
            type: String,
            default: "",
        },
    },
    emits: ["submit-meeting"],
    setup(_, { emit }) {
        const title = ref("");
        const by_end_date = ref("");
        const formValid: Ref<boolean> = computed(
            () =>
                title.value.length > 0 &&
                new Date(by_end_date.value).setHours(0) >=
                    new Date().setHours(0)
        );

        const submitMeeting = () => {
            emit("submit-meeting", { title, by_end_date });
        };

        return {
            title,
            by_end_date,
            formValid,
            submitMeeting,
        };
    },
});
</script>

<style></style>
