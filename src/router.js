import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
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
    }
  ]
})
