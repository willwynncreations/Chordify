import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
//views
import Home from '../views/Home.vue'
import Register from '../views/Register'
import Login from '../views/Login'


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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  //checkLogin We want to check for a valid token, if there is a valid auth token, and the isLoggedIn===false we need to log back in.
  //This catches a refresh that clears out store.
  if(store.getters.token !== '' && !store.getters.isLoggedIn){
    store.dispatch("LoginWithToken", store.getters.token)
    .next(next());
  }else{
    next();
  }
})


export default router
