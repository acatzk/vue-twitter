import Vue from "vue";
import VueRouter from "vue-router";
import { fb } from '@/firebase'

Vue.use(VueRouter);
// import 'nprogress/nprogress.css';
import '../../node_modules/nprogress/nprogress.css';

const routes = [
  {
    path: '/',
    component: () => import('@/views/home/Home.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'explore',
        component: () => import('@/views/explore/Explore.vue')
      },
      {
        path: 'notifications',
        component: () => import('@/views/notifications/Notifications.vue')
      },
      {
        path: 'messages',
        component: () => import('@/views/messages/Messages.vue')
      },
      {
        path: 'bookmarks',
        component: () => import('@/views/bookmarks/Bookmarks.vue')
      },
      {
        path: 'profile/:id',
        component: () => import('@/views/profile/Profile.vue')
      },
      {
        path: 'post/:id',
        component: () => import('@/views/posts/UserPost.vue')
      },
      {
        path: 'logout',
        component: () => import('@/views/Logout.vue')
      }
    ]
  },
  {
    path: '/login',
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
  NProgress.configure({ easing: 'ease', speed: 2000, showSpinner: false })
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