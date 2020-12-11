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
    path:'/user',
    component:Layout,
    meta:{
      title:'用户',
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

  { path: '*', redirect: '/404', hidden: true }
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
