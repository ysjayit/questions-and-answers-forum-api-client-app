import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import DashboardView from '../views/DashboardView.vue'
import PostView from '../views/PostView.vue'
import PostCreateView from '../views/PostCreateView.vue'
import UserPostView from '../views/UserPostView.vue'
import ManagePostView from '../views/ManagePostView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
      meta: {
        requiresGuest: true
      },
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {
        requiresGuest: true
      },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: '/post/view',
      name: 'post',
      props: true,
      component: PostView,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: '/post/create',
      name: 'postcreate',
      component: PostCreateView,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: '/posts/user',
      name: 'postsbyuser',
      component: UserPostView,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: '/posts/manage',
      name: 'postsmanage',
      component: ManagePostView,
      meta: {
        requiresAuth: true
      },
    },
  ]
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);
  const requiresGuest = to.matched.some((x) => x.meta.requiresGuest);
  const isLoggedin = localStorage.getItem('user-token');
  console.log(router);
  if (requiresAuth && !isLoggedin) {
    next("/");
  } else if (requiresGuest && isLoggedin) {
    next("/dashboard");
  }  else {
    next();
  }
});

export default router
