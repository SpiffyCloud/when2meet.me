<template>
  <div class="home">
    <div class="form">
      <div class="heading">
        <p id="title" class="title">When 2 Meet Me</p>
      </div>
      <div id="meeting-name" class="name-form">
        <label for="name" class="input-label">What's its name?</label>
        <p class="hint">Type the meeting name you want here.</p>
        <input
          id="name"
          class="name-input"
          type="text"
          v-model="meetingName"
          placeholder="The Grandiose Meeting"
        />
      </div>
      <div id="meeting-date" class="date-form">
        <label for="date" class="input-label">When are you meeting?</label>
        <p class="placeholder">This is optional</p>
      </div>
      <div id="date-options" class="date-options">
        <button
          class="date-option"
          :class="{ 'date-selected': selectedOption === date }"
          v-for="(date, index) in dateOptions"
          v-on:click="setDate(date)"
          :key="index"
        >
          {{ date }}
        </button>
      </div>
      <div class="submit">
        <button id="create-meeting" class="submit-btn">Create Meeting</button>
      </div>
    </div>
    <transition name="section">
      <div v-if="shouldShowDatePicker" id="mobile-date-picker" class="mobile-date-picker">
        <button v-on:click="closeDatePicker()" class="close-btn">
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
        <div class="date-heading">
          <p id="date-title" class="date-title">When are you meeting?</p>
          <p id="date-hint" class="placeholder date-hint">
            Select the date you need to meet by
          </p>
          <div id="weekdays" class="weekdays">
            <div class="day">S</div>
            <div class="day">M</div>
            <div class="day">T</div>
            <div class="day">W</div>
            <div class="day">R</div>
            <div class="day">F</div>
            <div class="day">S</div>
          </div>
        </div>
        <div class="calendar">
          <div class="month-name">July 2021</div>
          <div class="month">
            <ol class="day-grid">
              <li class="month-prev"></li>
              <li class="month-prev"></li>
              <li class="month-prev"></li>
              <li class="month-prev"></li>
              <li class="past-date">1</li>
              <li class="past-date">2</li>
              <li class="past-date">3</li>
              <li class="past-date">4</li>
              <li class="past-date">5</li>
              <li class="past-date">6</li>
              <li class="past-date">7</li>
              <li class="past-date">8</li>
              <li class="past-date">9</li>
              <li class="past-date">10</li>
              <li class="past-date">11</li>
              <li class="past-date">12</li>
              <li class="past-date">13</li>
              <li class="past-date">14</li>
              <li class="past-date">15</li>
              <li class="past-date">16</li>
              <li class="past-date">17</li>
              <li class="past-date">18</li>
              <li class="past-date">19</li>
              <li class="past-date">20</li>
              <li><div class="active">21</div></li>
              <li>22</li>
              <li>23</li>
              <li>24</li>
              <li>25</li>
              <li>26</li>
              <li>27</li>
              <li>28</li>
              <li>29</li>
              <li>30</li>
              <li>31</li>
            </ol>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({})
export default class Home extends Vue {
  meetingName = "";
  meetingDate = "";
  dateOptions: string[] = [
    "Today",
    "Tomorrow",
    "This week",
    "Next week",
    "In the next 2 weeks",
    "Sometime before X",
  ];
  selectedOption = "";
  shouldShowDatePicker = false;

  setDate(date: string) {
    this.selectedOption = date;
    if (date !== "Sometime before X") {
      this.shouldShowDatePicker = false;
      console.log("calculating date");
    } else {
      console.log("showing datepicker");
      this.shouldShowDatePicker = true;
    }
  }

  closeDatePicker() {
    console.log("hiding datepicker");
    this.shouldShowDatePicker = false;
  }
}
</script>

<style lang="css">
@import url(https://fonts.googleapis.com/css?family=Open+Sans);

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.calendar {
  padding: 2rem;
}

ul,
ol {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 1rem;
  margin: 0 auto;
  max-width: 64rem;
}

li {
  display: flex;
  align-items: center;
  justify-content: center;
  list-style: none;
  margin-left: 0;
  /* font-size: calc(16px + (21 - 16) * ((100vw - 300px) / (1600 - 300))); */
  font-size: 1.5rem;
  color: #707070;
}

ol.day-grid li {
  border-top: 1px solid rgba(0, 0, 0, 0.25);
  height: 5rem;
}

ol.day-grid li.month-prev,
ol.day-grid li.month-next {
  border-top: 0px;
}

ol.day-grid li.past-date {
  border-top: 1px solid rgba(0, 0, 0, 1);
  opacity: 0.25;
}

.active {
  border-radius: 50%;
  /* width: 4rem; */
  /* height: 4rem; */
  padding: 0.75rem;
  border: 2px solid #707070;
  text-align: center;
}

@media all and (max-width: 800px) {
  ul,
  ol {
    grid-gap: 0rem;
  }
}

.month {
  margin-top: 1rem;
}
.month-name {
  font-size: 1.5em;
  font-weight: bold;
  color: #707070;
  width: 100%;
  position: sticky;
  top: 0;
  text-align: center;
}
.weekdays {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  margin-top: 1rem;
}

.day {
  font-size: 1.5rem;
  color: #707070;
}
.close-btn {
  background-color: white;
  border: none;
  position: sticky;
  top: 0;
  width: 2rem;
  height: 2rem;
  margin: 1rem;
}

.date-heading {
  position: sticky;
  top: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  padding: 0 3rem 0 3rem;
}

.date-title {
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: #707070;
}

.date-hint {
  text-align: center;
  font-size: 1.25rem;
}
.mobile-date-picker {
  /* cover the screen */
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 1rem;
}

.date-picker-presented {
  display: block;
}

.form {
  background: #ffffff;
  color: #707070;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  display: inherit;
  font-family: "Open Sans", sans-serif;
  height: 100vh;
}

.heading {
  display: flex;
  width: 100%;
  justify-content: center;
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
  opacity: 0.4;
  margin: 0.5rem 0;
}

.name-input {
  line-height: 2;
  border: none;
  width: 100%;
  border-bottom: 2px solid #707070;
  font-size: 1.25rem;
  border-radius: 0;
}

.date-options {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.date-option {
  transition: background-color 0.2s ease;

  display: inline-flex;
  height: 56px;
  align-items: center;
  background-color: white;
  white-space: nowrap;
  border: 1px solid #707070;
  font-size: 1.25rem;
  color: #707070;
  padding: 1.5rem;
  margin: 0.25rem;
}

.date-selected {
  background-color: #707070;
  color: white;
}

.submit {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 3rem;
}

.submit-btn {
  background-color: #707070;
  color: white;
  height: 64px;
  width: 100%;
  font-size: 1.5rem;
  border: none;
}

.section-enter {
  top: 100vh;
}
.section-enter-to {
  top: 0;
}
.section-enter-active {
  transition: 0.5s; /* MISSING RULE */
}

.section-leave {
  top: 0;
}
.section-leave-to {
  top: -100vh;
}
.section-leave-active {
  transition: 0.5s; /* MISSING RULE */
}
</style>
