<template>
  <div class="window-frame p-shadow-5 p-my-2">
    <div class="window-date">
      <span class="month">Aug</span>
      <span class="day">12</span>
      <span class="weekday">Thu</span>
    </div>
    <div class="window-time">
      <div class="time">
        <span>at</span>
        <span class="p-text-bold">9:30 AM</span>
      </div>
      <div class="duration">
        <span>for</span>
        <span class="p-text-bold">30 minutes</span>
      </div>
    </div>
  </div>
</template>

<script></script>

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
