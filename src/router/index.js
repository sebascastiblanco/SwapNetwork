import { createRouter, createWebHistory } from '@ionic/vue-router';
import Login from '../views/Login.vue'
import Inicio from '../views/Inicio.vue'
import ZonaSwap from '../views/ZonaSwap.vue'

const routes = [
  {
    path: '/',
    redirect: '/login', 
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },

  {
    path:'/inicio',
    name: 'Inicio',
    component: Inicio
  },

  {
    path: '/zonaswap',
    name: 'ZonaSwap',
    component: ZonaSwap
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
