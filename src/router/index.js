import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Profile from '@/components/User/Profile'
import Signup from '@/components/User/Signup'
import Signin from '@/components/User/Signin'
import Services from '@/components/Service/Services'
import CreateService from '@/components/Service/CreateService'
import Service from '@/components/Service/Service'
import RegisterDialog from '@/components/Service/Registration/RegisterDialog'
import Administrator from '@/components/Administrator/Administrator/'
import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/administrator',
      name: 'Administrator',
      component: Administrator
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: AuthGuard
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/services',
      name: 'Services',
      component: Services
    },
    {
      path: '/service/new',
      name: 'CreateService',
      component: CreateService,
      beforeEnter: AuthGuard
    },
    {
      path: '/services/:id',
      name: 'Service',
      props: true,
      component: Service
    },
    {
      path: '/register/:id',
      name: 'RegisterDialog',
      props: true,
      component: RegisterDialog,
      beforeEnter: AuthGuard
    }
  ]
})
