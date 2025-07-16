import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  { path: '/', name: 'home', component: () => import('../views/HomeView.vue') },
  { path: '/pokedex', name: 'pokedex', component: () => import('../views/PokedexLayout.vue') },
  { path: '/favoritos', name: 'favoritos', component: () => import('../views/FavoriteView.vue') },
  { path: '/equipo', name: 'Equipo', component: () => import('../views/TeamView.vue')}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
