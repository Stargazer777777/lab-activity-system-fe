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
      children: [
        {
          path: 'somePage',
          component: () => import('@/pages/homeFrame/somePage.vue'),
        },
      ],
    },
    {
      path: '/admin',
      component: () => import('@/pages/adminFrame.vue'),
    },
  ],
});

export default router;
