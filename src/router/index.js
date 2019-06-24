import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/view/HomeMain'
import sso from '@/view/sso'
import Profile from '@/view/Profile'
import Register from '@/view/Register'
import BookDetail from '@/view/BookDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }, {
      path: '/sso',
      name: 'sso',
      component: sso
    }, {
      path: '/profile',
      name: 'profile',
      component: Profile
    }, {
      path: '/register',
      name: 'register',
      component: Register
    }, {
      path: '/book',
      name: 'BookDetail',
      component: BookDetail
    }
  ]
})
