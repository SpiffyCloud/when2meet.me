<template>
  <router-view />
</template>

<style>
/* theming */
:root {
  --primary: #27284e;
  --secondary: #1a9399;
  --text: #ffffff;
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
}
</style>
