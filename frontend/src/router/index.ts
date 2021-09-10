import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Create from "../views/Create.vue";
import Meeting from "../views/Meeting.vue";
import About from "../views/About.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Create",
    component: Create,
  },
  {
    path: "/:id",
    name: "Meeting",
    component: Meeting,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
