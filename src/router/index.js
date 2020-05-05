import Vue from "vue";
import VueRouter from "vue-router";
import { fb } from '@/firebase'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/Home.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '', 
        component: () => import('@/views/home/UserPosts.vue')
      },
      {
        path: 'explore',
        name: 'explore',
        component: () => import('@/views/explore/Explore.vue')
      },
      {
        path: 'notifications',
        name: 'notifications',
        component: () => import('@/views/notifications/Notifications.vue')
      },
      {
        path: 'messages',
        name: 'messages',
        component: () => import('@/views/messages/Messages.vue')
      },
      {
        path: 'bookmarks',
        name: 'bookmarks',
        component: () => import('@/views/bookmarks/Bookmarks.vue')
      },
      {
        path: 'profile/:id',
        name: 'profile',
        component: () => import('@/views/profile/Profile.vue')
      },
      {
        path: 'logout',
        name: 'logout',
        component: () => import('@/views/Logout.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue')
  }
];

const router = new VueRouter({
  routes,
  mode: 'history'
});


router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const currentUser = fb.auth().currentUser

  if (requiresAuth && !currentUser) {
    next('/login')
  } else if (!requiresAuth && currentUser) {
    next('/')
  } else {
    next()
  }
})


router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
    NProgress.start()
  }
  next()
})

router.afterEach((to, from) => {
  // Complete the animation of the route progress bar.
  NProgress.done()
})

export default router;