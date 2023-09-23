import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      component: () => import('@/pages/homeFrame.vue'),
      children: [],
    },
    {
      path: '/admin',
      component: () => import('@/pages/adminFrame.vue'),
    },
    {
      path: '/userLogin',
      component: () => import('@/pages/userLogin.vue'),
    },
    {
      path: '/userRegister',
      component: () => import('@/pages/userRegister.vue'),
    },
  ],
});

export default router;
