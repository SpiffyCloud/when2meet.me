<template>
    <div id="about-page" class="p-d-flex p-flex-column p-jc-between p-p-4">
        <h1 id="heading" class="p-text-center p-text-bold p-pb-3">
            When 2 Meet Me
        </h1>

        <div id="what-is" class="p-text-left p-d-flex p-flex-column p-pb-2">
            <h4 class="p-pb-2">What is When2Meet.Me?</h4>
            <p class="p-pb-2">
                When2Meet.Me is a quick and easy availability survey tool that
                helps you find the best times you and your group can meet.
            </p>
            <p class="p-pb-2">
                Please read our
                <a
                    href="#"
                    class="p-underline"
                    @click="displayModalTerms = true"
                    >terms and conditions</a
                >
                for details on what we track and use the data we collect.
            </p>
        </div>

        <Dialog
            header="Terms and Conditions"
            v-model:visible="displayModalTerms"
            :modal="true"
        >
            <p class="">A document that says legal stuff...</p>
        </Dialog>

        <div id="feedback-block" v-if="showFeedbackBlock">
            <div
                id="quick-feedback-group"
                class="p-text-left p-d-flex p-flex-column p-pb-2"
            >
                <h4 class="p-pb-2">We'd love your feedback!</h4>
                <p class="p-pb-2">The good, the bad, and the ugly.</p>

                <div
                    id="quick-feedback-actions"
                    class="p-d-flex p-jc-start p-flex-wrap"
                >
                    <Button
                        class="p-button p-bg-white p-m-1 p-button-lg p-shadow-2"
                        v-for="(selected, message, index) in quickFeedback"
                        :key="index"
                        :icon="`${selected ? 'pi pi-check' : ''}`"
                        :iconPos="`${selected ? 'right' : ''}`"
                        :label="message"
                        @click="selectQuickFeedback(message)"
                    >
                    </Button>
                </div>
            </div>

            <div
                id="feedback-message-group"
                class="p-text-left p-d-flex p-flex-column p-pb-2"
            >
                <h4 class="p-pb-2">Would you like to say something?</h4>
                <p class="p-pb-2">
                    Share your thoughts and ideas. <span>(optional)</span>
                </p>
                <Textarea
                    v-model="feedbackMessage"
                    rows="5"
                    cols="30"
                    placeholder="This is cool!"
                    :autoResize="true"
                />
                <Button
                    id="submit-feedback"
                    class="
                        p-button-raised
                        p-button-success
                        p-button-lg
                        p-mt-2
                        p-mb-2
                    "
                    label="Submit My Feedback"
                    :disabled="!submitFeedbackFormValid"
                    @click="onSubmitFeedback"
                />
            </div>
        </div>

        <div id="feedback-block-submmited" v-else>
            <div class="p-text-center p-d-flex p-flex-column p-pb-2">
                <i class="pi pi-bell"></i>
                <h1 class="p-mb-2">We appreciate your feedback!</h1>
                <Button
                    id="give-more-feedback"
                    class="p-button-raised p-button-success p-button-lg p-mb-2"
                    label="Give More Feedback"
                    @click="showFeedbackBlock = true"
                />
            </div>
        </div>

        <div
            id="hire-contact"
            class="p-text-left p-d-flex p-flex-column p-pb-2"
        >
            <h4 class="p-pb-2">Like our style?</h4>
            <p class="p-pb-2">
                When2Meet.Me is designed, developed, and maintained by a stellar
                group of people who love to make great products.
            </p>
            <p class="p-mb-2">
                If you've got an idea and would like to hire us - just let us
                know!
            </p>
            <Button
                id="hire-us"
                class="p-button-raised p-button-success p-button-lg"
                label="Hire Us"
                @click="displayModalHireUs = true"
            />

            <Dialog
                header="Hire Us"
                v-model:visible="displayModalHireUs"
                :modal="true"
            >
                <div id="hire-us-block" v-if="showHireUsBlock">
                    <Textarea
                        v-model="hireContactMessage"
                        :autoResize="true"
                        rows="5"
                        cols="30"
                        placeholder="You guys rock!"
                    />
                    <Button
                        id="submit-hire-contact"
                        class="p-button-raised p-button-success p-button-lg"
                        label="Hire Us"
                        :disabled="!submitHireUsFormValid"
                        @click="onSubmitHireUs"
                    />
                </div>
                <div id="hire-us-block-submmited" v-else>
                    <p>Thanks for contacting us.</p>
                </div>
            </Dialog>
        </div>

        <h3 id="footer" class="p-text-center p-text-bold p-pt-2">
            <router-link :to="{ name: 'Create' }">Home</router-link>
        </h3>
    </div>
</template>

<script lang="ts">
import { computed, ref } from 'vue'
import Button from 'primevue/button'
import Textarea from 'primevue/textarea'
import Dialog from 'primevue/dialog'

export default {
    name: 'About',
    components: {
        Button,
        Textarea,
        Dialog
    },
    setup() {
        const displayModalTerms = ref(false)

        const showFeedbackBlock = ref(true)

        const quickFeedback = ref({
            'I love it!': false,
            'I hate it!': false,
            Fast: false,
            'Great experience': false,
            'Easy to use': false,
            "It's confusing": false,
            Unintuitive: false
        } as any)

        const selectQuickFeedback = (message) => {
            quickFeedback.value[message] = !quickFeedback.value[message]
        }

        const feedbackMessage = ref('')

        const selectedQuickFeedback = computed(() => {
            return Object.keys(quickFeedback.value).filter(
                (message) => quickFeedback.value[message]
            )
        })

        const submitFeedbackFormValid = computed(
            () =>
                feedbackMessage.value || selectedQuickFeedback.value.length > 0
        )

        const onSubmitFeedback = () => {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    feedback_message: feedbackMessage.value,
                    feedback_quick: selectedQuickFeedback.value
                })
            }
            fetch(`/api/v1/feedback/`, requestOptions)
            showFeedbackBlock.value = false
        }

        const displayModalHireUs = ref(false)

        const showHireUsBlock = ref(true)

        const hireContactMessage = ref('')

        const submitHireUsFormValid = computed(() => hireContactMessage.value)

        const onSubmitHireUs = () => {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    hire_inquiry: hireContactMessage.value
                })
            }
            fetch(`/api/v1/hire-us/`, requestOptions)
            showHireUsBlock.value = false
        }

        return {
            displayModalTerms,
            showFeedbackBlock,
            quickFeedback,
            selectQuickFeedback,
            feedbackMessage,
            submitFeedbackFormValid,
            onSubmitFeedback,
            displayModalHireUs,
            showHireUsBlock,
            hireContactMessage,
            submitHireUsFormValid,
            onSubmitHireUs
        }
    }
}
</script>

<style lang="css">
* {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}

#about-page {
    background-color: var(--primary-color);
    color: var(--primary-color-text);
    font-family: var(--font-family);
}
</style>
