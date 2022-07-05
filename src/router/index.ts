import { createRouter, createWebHistory } from "vue-router";
import Information from "@/views/Information.vue";
import Search from "@/views/Search.vue";
import Subscribers from "@/views/Subscribers.vue";
import { useStore } from '@/stores/store'

const routes = [
  {
    path: "/",
    name: "Search",
    component: Search,
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
  
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
// router.beforeEach((to) => {
//   const store = useStore()
//   if (!store.hasGroup && to.path !== '/') {
//       return '/'
//   }
// })
export default router;
