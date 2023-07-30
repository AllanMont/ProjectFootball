import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios';
import HomeView from '../views/HomeView.vue'
import Compare from '../views/Compare.vue'
import Teams from '../views/Teams.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import EditTeam from '../views/EditTeam.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/compare',
      name: 'compare',
      component: Compare
    },
    {
      path: '/ajmequipes',
      name: 'teams',
      component: Teams,
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem('token')
        if (!token) {
          next('/login')
        } else {
          next()
        }
      }
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('../views/Account.vue'),
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem('token')
        if (!token) {
          next('/login')
        } else {
          next()
        }
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem('token')
        if (token) {
          next('/ajmequipes')
        } else {
          next()
        }
      }
    },
    {
      path: '/signin',
      name: 'register',
      component: Register,
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem('token')
        if (token) {
          next('/ajmequipes')
        } else {
          next()
        }
      }
    },
    {
      path: '/edit',
      name: 'edit',
      component: EditTeam,
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem('token')
        if (!token) {
          next('/ajmequipes')
        } else {
          next()
        }
      }
    },
  ]
})

export default router
