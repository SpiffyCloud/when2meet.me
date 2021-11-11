<template>
    <div class="container">
        <div id="title" class="p-d-flex p-ai-center p-flex-column p-my-5">
            <i class="pi pi-clock logo p-mb-4"></i>
            <h1 id="heading">When 2 Meet Me</h1>
        </div>

        <h2>What is When2Meet.Me?</h2>
        <p class="text p-px-5 p-pt-2 p-pb-5">
            When2Meet.Me is a quick and easy availability survey tool that helps
            you find the best times you and your group can meet.
        </p>

        <template v-if="showFeedbackBlock">
            <h2>We'd love your feedback!</h2>
            <p class="assistive p-pb-2">The good, the bad, and the ugly.</p>

            <div class="p-pb-4 p-px-2" id="quick-feedback-actions">
                <div class="p-d-flex p-flex-wrap p-jc-center">
                    <button
                        :key="index"
                        v-for="(selected, message, index) in quickFeedback"
                        class="button"
                        @click="selectQuickFeedback(message)"
                        style="
                            width: auto;
                            padding-inline: 1rem;
                            margin: 0.25rem;
                        "
                    >
                        {{ message }}
                        <i class="pi pi-check" v-if="selected"></i>
                    </button>
                </div>
            </div>

            <h2>Would you like to say something?</h2>
            <p class="assistive p-pb-3">
                Share your thoughts and ideas. <span>(optional)</span>
            </p>
            <Textarea
                v-model="feedbackMessage"
                rows="5"
                cols="30"
                placeholder="This is cool!"
                :autoResize="true"
            />
            <div class="button-container">
                <button class="button p-my-4" @click="onSubmitFeedback">
                    Submit My Feedback
                </button>
            </div>
        </template>

        <template v-else>
            <i class="pi pi-bell logo"></i>
            <h2>We appreciate your feedback!</h2>
            <div class="button-container">
                <button @click="showFeedbackBlock = true" class="button p-my-4">
                    Give More Feedback
                </button>
            </div>
        </template>

        <h2>Like our style?</h2>
        <p class="text p-px-5 p-pt-2 p-pb-5">
            When2Meet.Me is designed, developed, and maintained by a stellar
            group of people who love to make great products.
        </p>
        <p class="text p-px-5 p-pt-2 p-pb-5">
            If you've got an idea and would like to hire us - just let us know!
        </p>
        <div class="button-container">
            <button class="button" @click="onOpenEmail">Hire Us</button>
        </div>

        <div class="footer">
            <router-link class="link" to="/">Create</router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, ref } from 'vue'
import Textarea from 'primevue/textarea'

export default {
    name: 'About',
    components: {
        Textarea
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

        const onOpenEmail = () => {
            window.open('mailto:hire@cliqteam.com?subject=Hire%20Request')
        }

        return {
            displayModalTerms,
            showFeedbackBlock,
            quickFeedback,
            selectQuickFeedback,
            feedbackMessage,
            submitFeedbackFormValid,
            onSubmitFeedback,
            onOpenEmail
        }
    }
}
</script>

<style lang="css">
.container {
    max-width: 750px;
    margin-inline: auto;
}
* {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}

.text {
    font-size: 1.5rem;
}
.button-container {
    width: 100%;
    padding-inline: 1.5rem;
}
</style>
