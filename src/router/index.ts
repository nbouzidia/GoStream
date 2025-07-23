import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Details from '../views/Details.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import SimilarMovies from '../views/SimilarMovies.vue'
import Favoris from '@/views/Favoris.vue'
import Genres from '@/views/Genres.vue'
import { useAuthStore } from '@/stores/auth'
import Populaires from '@/views/Populaires.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView, meta: { requiresAuth: true } },
  { path: '/film/:id', name: 'DetailsFilm', component: Details, meta: { requiresAuth: true } },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/genres/:genreId', name: 'SimilarMovies', component: SimilarMovies, meta: { requiresAuth: true }},
  { path: '/genres', name: 'Genres', component: Genres, meta: { requiresAuth: true } },
  { path: '/favoris', name: 'Favoris', component: Favoris, meta: { requiresAuth: true } },
  { path:'/popular', name: 'Popular', component: Populaires, meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  
  if (!authStore.initialized) {
    await new Promise<void>((resolve) => {
      const checkInitialized = () => {
        if (authStore.initialized) {
          resolve()
        } else {
          setTimeout(checkInitialized, 50)
        }
      }
      checkInitialized()
    })
  }
  
  const isAuthenticated = authStore.isAuthenticated
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  
  if (requiresAuth && !isAuthenticated) {
    next({ name: 'Login' })
    return
  }
  
  if (isAuthenticated && (to.name === 'Login' || to.name === 'Register')) {
    next({ name: 'Home' })
    return
  }
  
  next()
})

export default router