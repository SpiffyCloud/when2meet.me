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
</style>
