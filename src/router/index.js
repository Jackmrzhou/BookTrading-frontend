import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/view/HomeMain'
import sso from '@/view/sso'
import Profile from '@/view/Profile'
import Register from '@/view/Register'
import BookDetail from '@/view/BookDetail'
import SellBook from '@/view/SellBook'
import RequestBook from '@/view/RequestBook'
import Records from '@/view/Records'
import Message from '@/view/Message'
import Order from '@/view/Order'
import RequestHome from '@/view/RequestHome'
import Logout from '@/view/Logout'

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
      path: '/center/profile',
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
    }, {
      path: '/center/sell',
      name: 'sellBook',
      component: SellBook
    }, {
      path: '/center/request',
      name: 'requestBook',
      component: RequestBook
    }, {
      path: '/center/records',
      name: 'records',
      component: Records
    }, {
      path: '/message',
      name: 'message',
      component: Message
    }, {
      path: '/order',
      name: 'order',
      component: Order
    }, {
      path: '/request',
      name: 'RequestHome',
      component: RequestHome
    }, {
      path: '/logout',
      name: 'Logout',
      component: Logout
    }
  ]
})
