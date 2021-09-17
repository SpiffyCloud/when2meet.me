<template>
  <div class="window-frame p-shadow-5 p-my-2">
    <div class="window-date">
      <span class="month">{{ month }}</span>
      <span class="day">{{ day }}</span>
      <span class="weekday"> {{ weekDay }}</span>
    </div>
    <div class="window-time">
      <div class="time">
        <span>at</span>
        <span class="p-text-bold">{{ timeString }}</span>
      </div>
      <div class="duration">
        <span>for</span>
        <span class="p-text-bold">{{ durationInMinutes }} minutes</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { toRefs } from "vue";
export default {
  name: "Window",
  props: {
    time: {
      type: Number,
    },
    duration: {
      type: Number,
    },
  },
  setup(props: any) {
    const { time, duration } = toRefs(props);
    console.log(time.value, duration.value);
    // convert time to a date
    const date = new Date(time.value * 15 * 60 * 1000);
    const month = date.toLocaleString("en-us", { month: "short" });
    const day = date.getDate();
    const weekDay = date.toLocaleString("en-us", { weekday: "short" });
    const timeString = date.toLocaleString("en-us", {
      hour: "numeric",
      minute: "numeric",
    });
    const durationInMinutes = duration.value * 15;
    return {
      month,
      day,
      weekDay,
      timeString,
      durationInMinutes,
    };
  },
};
</script>

<style>
.window-frame {
  width: 100%;
  height: 5rem;
  display: flex;
  background-color: white;
  border-radius: 5px;
}

.window-date {
  width: 20%;
  background-color: var(--green-600);
  height: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 0.25rem 0;
  color: white;
}

.window-time {
  color: black;
  display: flex;
  justify-content: space-around;
  text-align: center;
  flex-grow: 1;
}

.time,
.duration {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 1.25rem;
  color: var(--primary-color);
}
.month {
  font-size: 0.75rem;
}

.day {
  font-size: 1.25rem;
}
.weekday {
  font-weight: bold;
}
</style>
