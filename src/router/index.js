import { createRouter, createWebHistory } from '@ionic/vue-router';
import Login from '../views/Login.vue'
import Inicio from '../views/Inicio.vue'
import ZonaSwap from '../views/ZonaSwap.vue'
import MenuPrincipal from '../views/MenuPrincipal.vue'
import ConectaYCrea from '../views/ConectaYCrea.vue'
import Explora from '../views/Explora.vue'
import Archivos from '../views/Archivos.vue' // 👈 NUEVA IMPORTACIÓN

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
    path: '/inicio',
    name: 'Inicio',
    component: Inicio
  },
  {
    path: '/zonaswap',
    name: 'ZonaSwap',
    component: ZonaSwap
  },
  {
    path: '/menuprincipal',
    name: 'MenuPrincipal',
    component: MenuPrincipal
  },
  {
    path: '/conecta',
    name: 'ConectaYCrea',
    component: ConectaYCrea
  },
  {
    path: '/explora',
    name: 'Explora',
    component: Explora
  },
  {
    path: '/archivos', //  NUEVA RUTA
    name: 'Archivos',
    component: Archivos
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
