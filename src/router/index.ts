import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/HomeView.vue"),
    },
    {
      path: "/video",
      name: "video",
      component: () => import("@/views/VideoView.vue"),
    }
  ],
});

export default router;
