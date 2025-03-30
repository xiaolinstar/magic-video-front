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
      component: () => import("@/views/pages/VideoView.vue"),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/LoginView.vue'),
      meta: { hideHeader: true, hideSidebar: true, hideFooter: true }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/auth/RegisterView.vue'),
      meta: { hideHeader: true, hideSidebar: true, hideFooter: true }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/pages/AboutView.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('@/views/pages/ContactView.vue')
    },
    {
      path: '/upload',
      name: 'upload',
      component: () => import('@/views/pages/UploadView.vue'),
      meta: { requiresAuth: true }
    }
  ],
});

export default router;
