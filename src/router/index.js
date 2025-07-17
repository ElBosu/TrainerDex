import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  { path: '/', name: 'home', component: () => import('../views/HomeView.vue') },
  { path: '/pokedex', name: 'pokedex', component: () => import('../views/PokedexLayout.vue') },
  { path: '/favoritos', name: 'favoritos', component: () => import('../views/FavoriteView.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
