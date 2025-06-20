import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/HomeView.vue"),
      meta: { hideFooter: true,  hideSidebar: false }
    },
    {
      path: "/popular",
      name: "popular",
      component: () => import("@/views/pages/PopularView.vue"),
      meta: { hideFooter: true } 
    },
    {
      path: "/video",
      name: "video",
      component: () => import("@/views/pages/VideoView.vue"),
      meta: { hideFooter: true, hideSidebar: false}
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
      component: () => import('@/views/pages/AboutView.vue'),
      meta: { hideFooter: true } 
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('@/views/pages/ContactView.vue'),
      meta: { hideFooter: true } 
    },
    {
      path: '/upload',
      name: 'upload',
      component: () => import('@/views/pages/UnderDevelopment.vue'), // 改为开发中页面
      // 或者保持原组件但添加重定向
      // component: () => import('@/views/pages/UploadView.vue'),
      // redirect: '/',
      meta: { requiresAuth: true, hideFooter: true }
    },
    // 添加未实现的路由
    {
      path: '/search',
      name: 'search',
      component: () => import('@/views/pages/UnderDevelopment.vue'),
      meta: { hideFooter: true }
    },
    {
      path: '/category/movie',
      name: 'categoryMovie',
      component: () => import('@/views/pages/UnderDevelopment.vue'),
      meta: { hideFooter: true } 
    },
    {
      path: '/category/tv',
      name: 'categoryTV',
      component: () => import('@/views/pages/UnderDevelopment.vue'),
      meta: { hideFooter: true }
    },
    {
      path: '/category/animation',
      name: 'categoryAnimation',
      component: () => import('@/views/pages/UnderDevelopment.vue'),
      meta: { hideFooter: true }
    },
    {
      path: '/category/documentary',
      name: 'categoryDocumentary',
      component: () => import('@/views/pages/UnderDevelopment.vue'),
      meta: { hideFooter: true }
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: () => import('@/views/pages/UnderDevelopment.vue'),
      meta: { hideFooter: true }
    },
    {
      path: '/history',
      name: 'history',
      component: () => import('@/views/pages/UnderDevelopment.vue'),
      meta: { hideFooter: true } 
    }
  ],
});

export default router;
