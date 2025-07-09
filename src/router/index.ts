import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Details from '../views/Details.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import SimilarMovies from '../views/SimilarMovies.vue'
import Favoris from '@/views/Favoris.vue'
import Genres from '@/views/Genres.vue'
import { useAuthStore } from '@/stores/auth'

const routes = [
  { path: '/', name: 'Home', component: HomeView, meta: { requiresAuth: true } },
  { path: '/film/:id', name: 'DetailsFilm', component: Details, meta: { requiresAuth: true } },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  {
    path: '/genres/:genreId',
    name: 'SimilarMovies',
    component: SimilarMovies,
    meta: { requiresAuth: true }
  },
  { path: '/genres', name: 'Genres', component: Genres, meta: { requiresAuth: true } },
  { path: '/favoris', name: 'Favoris', component: Favoris, meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Guard global pour protéger les routes
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  
  // Attendre que l'état d'authentification soit initialisé
  if (!authStore.initialized) {
    // Attendre que Firebase Auth soit initialisé
    await new Promise<void>((resolve) => {
      const unsubscribe = () => {
        if (authStore.initialized) {
          resolve()
        }
      }
      // Vérifier périodiquement si l'initialisation est terminée
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
  
  // Vérifier si la route nécessite une authentification
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!authStore.isAuthenticated()) {
      // Rediriger vers la page de connexion
      next({ name: 'Login' })
    } else {
      next()
    }
  } else {
    // Si l'utilisateur est déjà connecté et essaie d'accéder à login/register
    if ((to.name === 'Login' || to.name === 'Register') && authStore.isAuthenticated()) {
      next({ name: 'Home' })
    } else {
      next()
    }
  }
})

export default router