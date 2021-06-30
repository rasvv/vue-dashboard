import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../pages/PageDashboard.vue')
    },
    {
      path: '/dashboard/:page',
      name: 'dashboard',
      component: () => import('../pages/PageDashboard.vue')
    },
    {
      path: '/:command/:target/:category',
      name: 'dashboard',
      component: () => import('../pages/PageDashboard.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../pages/PageAbout.vue')
    },
    {
      path: '*',
      name: 'NotFound',
      component: () => import('../pages/Page404.vue')
    }
  ]
})

export default router
