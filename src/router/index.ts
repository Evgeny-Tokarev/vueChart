import { createRouter, createWebHistory } from "vue-router";
import Information from "@/views/Information.vue";
import Registration from "@/views/Registration.vue";
import Subscribers from "@/views/Subscribers.vue";
import Home from "@/views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/information",
    name: "Information",
    component: Information,
  },
  {
    path: "/subscribers",
    name: "Subscribers",
    component: Subscribers,
  },
  {
    path: "/subscribers",
    name: "Subscribers",
    component: Subscribers,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
