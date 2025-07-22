
<script setup lang="ts">
import { computed } from 'vue'
import { useFavoritesStore } from '@/stores/favorites'
import MovieCard from '@/components/MovieCard.vue'

const favoritesStore = useFavoritesStore()
const favorites = computed(() => favoritesStore.favorites)
</script>
<template>
  <div class="favoris">
    <h1 class="title">Mes Films Favoris</h1>

    <div v-if="favorites.length > 0" class="movie-list">
      <MovieCard
        v-for="movie in favorites"
        :key="movie.id"
        :movie="movie"
      />
    </div>

    <div v-else class="empty-state">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="empty-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 
          5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 
          1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
      <p>Vous n'avez encore aucun film dans vos favoris.</p>
      <RouterLink to="/" class="btn-retour">← Retour à l'accueil</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.favoris {
  padding: 2rem;
  margin-top: 60px;
  text-align: center;
  color: #f1f5f9;
}

.title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #fbbd61;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.movie-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
}

.empty-state {
  margin-top: 3rem;
  color: #94a3b8;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.empty-icon {
  width: 80px;
  height: 80px;
  stroke: #64748b;
}

.btn-retour {
  margin-top: 1rem;
  display: inline-block;
  padding: 0.5rem 1.2rem;
  border-radius: 999px;
  background-color: #fbbd61;
  color: black;
  font-weight: bold;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn-retour:hover {
  background-color: #ec7532;
  color: white;
}
</style>