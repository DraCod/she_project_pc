import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/goods',
    component: Layout,
    meta: {
      title: '商品'
    },
    children: [
      {
        path: 'classify',
        component: () => import('@/views/classify/index'),
        name: 'classify',
        meta: { title: '商品分类', icon: '' }
      },
      {
        path: 'list',
        component: () => import('@/views/good/index.vue'),
        name: 'good',
        meta: { title: '商品管理', icon: '' }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    meta: {
      title: '用户',
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/user/index'),
        name: 'list',
        meta: { title: '用户列表', icon: '' }
      },
    ]
  },
  {
    path: '/order',
    component: Layout,
    meta: {
      title: '订单'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/order/index'),
        name: 'order-list',
        meta: { title: '订单列表', icon: '' }
      }
    ]
  },
  {
    path:'/avert',
    component: Layout,
    meta: {
      title: '广告'
    },
    children:[
      {
        path:'index',
        component: ()=>import('@/views/advert/index'),
        name: 'acert-list',
        meta: {title: '广告', icon:''}
      }
    ]
    // component: ()=>import('@/views/advert/advert')
  }

  // { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
