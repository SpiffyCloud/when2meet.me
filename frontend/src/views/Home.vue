<template>
    <div class="home">
        <h1 id="title" class="title">When 2 Meet Me</h1>
        <div id="meeting-name" class="name-form">
            <label for="name" class="input-label">What's its name?</label>
            <p class="hint">Type the meeting name you want here.</p>
            <input id="name" class="name-input" type="text" v-model="meetingName" placeholder="The Grandiose Meeting" />
        </div>
        <div id="meeting-date" class="date-form">
            <label for="date" class="input-label">When are you meeting?</label>
            <p class="placeholder">This is optional</p>
            <div id="date-options" class="date-options"></div>

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
    font-size: 14pt;
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
    font-size: 12pt;
    font-weight: bold;
}
.placeholder {
    font-size: 12pt;
    opacity:0.4;
    margin: 0.5rem 0;
}

.name-input {
    font-size: 14pt;
    line-height: 2;
    border: none;
    width: 100%;
    border-bottom: 2px solid #707070;
}




</style>
