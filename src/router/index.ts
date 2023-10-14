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
      children: [
        {
          path: 'activity',
          component: () => import('@/pages/adminFrame/activityAdmin.vue'),
        },
        {
          path: 'add-edit-activity',
          component: () => import('@/pages/adminFrame/addOrEditActivity.vue'),
        },
        {
          path: 'registration',
          component: () => import('@/pages/adminFrame/registrationAdmin.vue'),
        },
        {
          path: 'feedback',
          component: () => import('@/pages/adminFrame/feedbackAdmin.vue'),
        },
      ],
    },
    {
      path: '/userLogin',
      component: () => import('@/pages/userLogin.vue'),
    },
    {
      path: '/userRegister',
      component: () => import('@/pages/userRegister.vue'),
    },
    {
      path: '/check-in',
      component: () => import('@/pages/checkInPage.vue'),
    },
    {
      path: '/userCheckmsg',
      component: () => import('@/pages/userCheckmsg.vue'),
    },
    {
      path: '/signedActivities',
      component: () => import('@/pages/signedActivities.vue'),
    },
    {
      path: '/checkedActivities',
      component: () => import('@/pages/checkedActivities.vue'),
    },
  ],
});

export default router;
