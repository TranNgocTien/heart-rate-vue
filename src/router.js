import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./page/HomePage.vue";
import HistoryPage from "./page/HistoryPage.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/home" },
    { path: "/home", component: HomePage },
    { path: "/historyPage", component: HistoryPage },
  ],
});

export default router;
