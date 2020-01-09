import Vue from 'vue'
import VueRouter from 'vue-router'

//views
import Home from '../views/Home.vue'
import Register from '../views/Register'
import Login from '../views/Login'
import AddChild from '../views/AddChild'
import AssignChores from '../views/AssignChores'
import Dashboard from '../views/Dashboard'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/addchild',
    name: 'addChild',
    component: AddChild
  },
  {
    path: '/assignchores',
    name: 'assignchores',
    component: AssignChores
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})



export default router
