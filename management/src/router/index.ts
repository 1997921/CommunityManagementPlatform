import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/userLogin.vue'),
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/index/message',
    name: 'message',
    component: () => import('../views/message/messagelist.vue'),
  },
  {
    path: '/sentiment',
    name: 'sentiment',
    component: () => import('../views/sentiment/sentiment-index.vue'),
  },
  {
    path: '/groupDynamics',
    name: 'groupDynamics',
    component: () => import('../views/groupDynamics/dynamics-index.vue'),
  },
  {
    path: '/groupAdmin',
    name: 'groupAdmin',
    component: () => import('../views/groupAdmin/admin-index.vue'),
  },
  // {
  //   path: '/projectShow',
  //   name: "projectShow",
  //   component: () => import('../components/projectShow')
  // },
  // {
  //   path: '/showProjectPage',
  //   name: "showProjectPage",
  //   component: () => import('../components/showProjectPage')
  // },
  { path: '/', redirect: '/login' },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
