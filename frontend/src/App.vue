<template>
  <router-view />
</template>

<style>
/* theming */
:root {
  --primary: #27284e;
  --secondary: #1a9399;
  --text: #ffffff;
  --text-secondary: #f49729;
  --error: #d74c4c;
}

/* app styles */
#app {
  height: 100%;
}

html,
body {
  height: 100%;
  background-color: var(--primary);
  color: var(--text);
  font-family: 'Open Sans', sans-serif;
}

/* reset default margin and paddings */
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

/* Reused Component Styles */
.label {
  font-size: 1.5rem;
  font-weight: bold;
  display: block;
}

.assistive {
  font-size: 1.3rem;
  opacity: 0.5;
}

.button {
  display: block;
  margin: 0 auto;
  width: 100%;
  height: 4rem;
  border: none;
  background-color: var(--secondary);
  color: var(--text);
  font-size: 1.75rem;
  font-weight: bold;
  cursor: pointer;
}

.button-secondary {
  display: inline-block;
  margin: 0.5rem;
  padding: 1rem 1.5rem;
  height: fit-content;
  min-height: 3.5rem;
  border: none;
  background-color: white;
  font-size: 1.75rem;
  cursor: pointer;
}

/* button pressed effect */
.button:active,
.button-secondary:active {
  opacity: 0.9;
}

.button:hover,
.button-secondary:hover {
  opacity: 0.9;
}

.clickable {
  cursor: pointer;
}

.clickable:hover {
  opacity: 0.9;
}

.input {
  height: 2.5rem;
  width: 100%;
  background: none;
  color: var(--text);
  font-size: 1.5rem;
  outline: none;
  border: none;
  border-bottom: 2px solid var(--secondary);
  border-radius: 0 !important;
}

.input-error {
  border-bottom: 2px solid var(--error);
}

.error-text {
  color: var(--error);
  font-size: 1.5rem;
  margin-top: 0.5rem;
}

.footer {
  display: flex;
  width: 100%;
  height: 10rem;
  justify-content: space-evenly;
  align-items: center;
}
.link {
  color: var(--secondary);
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  margin-block: 1rem;
}
</style>
