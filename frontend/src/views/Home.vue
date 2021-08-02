<template>
    <div class="home">
        <p id="title" class="title">When 2 Meet Me</p>
        <div id="meeting-name" class="name-form">
            <label for="name" class="input-label">What's its name?</label>
            <p class="hint">Type the meeting name you want here.</p>
            <input id="name" class="name-input" type="text" v-model="meetingName" placeholder="The Grandiose Meeting" />
        </div>
        <div id="meeting-date" class="date-form">
            <label for="date" class="input-label">When are you meeting?</label>
            <p class="placeholder">This is optional</p>
        </div>
        <div id="date-options" class="date-options">
            <button class="date-option">Today</button>
            <button class="date-option">Tomorrow</button>
            <button class="date-option">This week</button>
            <button class="date-option">Next week</button>
            <button class="date-option">In the next 2 weeks</button>
            <button class="date-option">Sometime before X</button>
        </div>

    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({})
export default class Home extends Vue {}
</script>

<style lang="css">
@import url(https://fonts.googleapis.com/css?family=Open+Sans);
.home {
    background: #ffffff;
    color: #707070;
    display: flex;
    flex-direction: column;
    font-family: 'Open Sans', sans-serif;
    padding: 1rem;
}
.title {
    font-weight: bold;
    align-self: center;
    margin: 3rem 0;
}

.name-form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 1rem 0;
}
.date-form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 2rem 0;
}
.input-label {
    font-weight: bold;
}
.placeholder {
    opacity:0.4;
    margin: 0.5rem 0;
}

.name-input {
    line-height: 2;
    border: none;
    width: 100%;
    border-bottom: 2px solid #707070;
    font-size: 1.25rem;
}

.date-options {
    display: flex;
    flex-direction: row;
    justify-content:flex-start;
    flex-wrap: wrap;
}

.date-option {
    display: inline-flex;
    height: 56px;
    align-items: center;
    background-color: white;
    white-space: nowrap;
    border: 1px solid #707070;
    font-size: 1.25rem;
    color: #707070;
    margin: 0.25rem;
    padding: 1.5rem;
}




</style>
