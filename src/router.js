import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: '/basic/dashboard',
      children: [
        {
          path: 'basic',
          component: () => import('./views/basic/Home.vue'),
          children: [
            {
              path: 'dashboard',
              component: () => import('./views/basic/Dashboard.vue')
            },
            {
              path: 'views',
              component: () => import('./views/basic/View.vue')
            }
          ]
        },
        {
          path: 'management',
          component: () => import('./views/management/Home.vue'),
          children: [
            {
              path: 'list-items',
              component: () => import('./views/management/ListItem.vue')
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      component: () => import('./views/login.vue'),
      name: 'login',
      meta: { isPublic: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !localStorage.token) {
    return next('/login')
  } else if (localStorage && !to.meta.isPublic) {
    Vue.prototype.$http
      .post('login/auth', { token: localStorage.token })
      .then(res => {
        if (res.data.code === 200) {
          return next()
        } else {
          Vue.prototype.$message.error(res.data.msg)
          return next('/login')
        }
      })
  }
  next()
})
export default router
