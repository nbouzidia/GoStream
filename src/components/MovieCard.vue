<template>
  <div class="movie-card" @mouseenter="onHover" @mouseleave="onLeave">
    <div class="poster-container">
      <img
        v-if="movie.poster_path"
        :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
        :alt="movie.title"
        class="poster"
        loading="lazy"
      />

      <div v-else class="poster-placeholder">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21,15 16,10 5,21" />
        </svg>
        <span>{{ movie.title }}</span>
      </div>

      <button class="favorite-btn" @click.stop="toggleFavorite" :class="{ active: isFavorite }">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path
            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
          />
        </svg>
      </button>

      <div v-if="movie.vote_average" class="rating-badge">
        <span class="rating-score">{{ movie.vote_average.toFixed(1) }}</span>
        <span class="rating-icon">⭐</span>
      </div>

      <div class="overlay">
        <div class="overlay-header">
          <h3 class="movie-title">{{ movie.title }}</h3>
          <div class="movie-meta">
            <span v-if="movie.release_date" class="release-date">
              {{ formatDate(movie.release_date) }}
            </span>
            <span v-if="movie.original_language" class="language">
              {{ movie.original_language.toUpperCase() }}
            </span>
          </div>
        </div>

        <div class="overlay-content">
          <p v-if="movie.overview" class="overview">
            {{ movie.overview.slice(0, 120) }}{{ movie.overview.length > 120 ? '...' : '' }}
          </p>

          <div v-if="movie.genre_ids && movie.genre_ids.length > 0" class="genres">
            <span v-for="genreId in movie.genre_ids.slice(0, 3)" :key="genreId" class="genre-tag">
              {{ getGenreName(genreId) }}
            </span>
          </div>
        </div>

        <div class="overlay-actions">
          <RouterLink :to="`/film/${movie.id}`" class="details-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12,6 12,12 16,14" />
            </svg>
            <span>Voir les détails</span>
          </RouterLink>

          <button
            class="quick-favorite-btn"
            @click.stop="toggleFavorite"
            :class="{ active: isFavorite }"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path
                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
              />
            </svg>
          </button>
        </div>

        <div class="particles">
          <div class="particle" v-for="i in 6" :key="i"></div>
        </div>
      </div>

      <div class="gradient-overlay"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Movie } from '@/types/movie'
import { RouterLink } from 'vue-router'
import { useFavoritesStore } from '@/stores/favorites'
import { computed, ref } from 'vue'

const props = defineProps<{
  movie: Movie
}>()

const favoritesStore = useFavoritesStore()
const isHovered = ref(false)

const isFavorite = computed(() => favoritesStore.isFavorite(props.movie.id))

const toggleFavorite = () => {
  // Convertir Movie en MovieDetail pour le store
  const movieDetail = {
    ...props.movie,
    genres: [],
    runtime: 0,
    production_companies: [],
    production_countries: [],
    spoken_languages: [],
    budget: 0,
    revenue: 0,
    status: '',
    tagline: '',
    homepage: '',
    imdb_id: '',
    belongs_to_collection: null,
    origin_country: [],
  }

  favoritesStore.toggleFavorite(movieDetail)
}

const onHover = () => {
  isHovered.value = true
}

const onLeave = () => {
  isHovered.value = false
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.getFullYear().toString()
}

// Mapping des genres les plus courants
const genreMap: { [key: number]: string } = {
  28: 'Action',
  12: 'Aventure',
  16: 'Animation',
  35: 'Comédie',
  80: 'Crime',
  99: 'Documentaire',
  18: 'Drame',
  10751: 'Famille',
  14: 'Fantastique',
  36: 'Histoire',
  27: 'Horreur',
  10402: 'Musique',
  9648: 'Mystère',
  10749: 'Romance',
  878: 'Science-Fiction',
  10770: 'Téléfilm',
  53: 'Thriller',
  10752: 'Guerre',
  37: 'Western',
}

const getGenreName = (genreId: number) => {
  return genreMap[genreId] || 'Autre'
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Poppins:wght@300;400;500;600;700&display=swap');

.movie-card {
  width: 280px;
  height: 420px;
  border-radius: 20px;
  overflow: hidden;
  margin: 1rem;
  cursor: pointer;
  position: relative;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  background: linear-gradient(135deg, #1a1a2e, #16213e);
}

.movie-card:hover {
  transform: translateY(-12px) scale(1.02);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
}

.poster-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.poster {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  filter: brightness(0.9) contrast(1.1);
}

.movie-card:hover .poster {
  transform: scale(1.08);
  filter: brightness(0.7) contrast(1.2);
}

.poster-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #2d3748, #4a5568);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #a0aec0;
  font-family: 'Poppins', sans-serif;
  text-align: center;
  padding: 2rem;
}

.poster-placeholder svg {
  width: 60px;
  height: 60px;
  margin-bottom: 1rem;
  opacity: 0.6;
}

.poster-placeholder span {
  font-size: 1.1rem;
  font-weight: 500;
  line-height: 1.4;
}

.favorite-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  border: none;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  z-index: 20;
  opacity: 0;
  transform: scale(0.8);
}

.movie-card:hover .favorite-btn {
  opacity: 1;
  transform: scale(1);
}

.favorite-btn svg {
  width: 22px;
  height: 22px;
  stroke: white;
  fill: none;
  transition: all 0.3s ease;
}

.favorite-btn.active {
  background: rgba(239, 68, 68, 0.9);
  box-shadow: 0 4px 20px rgba(239, 68, 68, 0.4);
}

.favorite-btn.active svg {
  fill: white;
  stroke: white;
}

.favorite-btn:hover {
  background: rgba(239, 68, 68, 0.8);
  transform: scale(1.1);
  box-shadow: 0 6px 25px rgba(239, 68, 68, 0.5);
}

.rating-badge {
  position: absolute;
  top: 15px;
  left: 15px;
  background: rgba(251, 189, 97, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 25px;
  padding: 0.4rem 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 0.85rem;
  color: #1a1a2e;
  z-index: 15;
  box-shadow: 0 4px 15px rgba(251, 189, 97, 0.3);
  opacity: 0;
  transform: translateY(-10px);
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.movie-card:hover .rating-badge {
  opacity: 1;
  transform: translateY(0);
}

.rating-score {
  font-size: 0.9rem;
  font-weight: 700;
}

.rating-icon {
  font-size: 0.8rem;
}

.gradient-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60%;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.7) 30%,
    rgba(0, 0, 0, 0.4) 60%,
    transparent 100%
  );
  pointer-events: none;
  z-index: 5;
}

.overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(
    to top,
    rgba(26, 32, 46, 0.98) 0%,
    rgba(26, 32, 46, 0.95) 50%,
    rgba(26, 32, 46, 0.8) 100%
  );
  backdrop-filter: blur(20px);
  color: white;
  padding: 1.5rem;
  transform: translateY(100%);
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  z-index: 10;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.movie-card:hover .overlay {
  transform: translateY(0);
}

.overlay-header {
  margin-bottom: 1rem;
}

.movie-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.4rem;
  color: #fbbd61;
  margin: 0 0 0.5rem 0;
  letter-spacing: 1px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  line-height: 1.2;
}

.movie-meta {
  display: flex;
  gap: 1rem;
  align-items: center;
  font-family: 'Poppins', sans-serif;
  font-size: 0.85rem;
  color: #a0aec0;
  margin-bottom: 0.5rem;
}

.release-date {
  background: rgba(251, 189, 97, 0.2);
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  font-weight: 500;
  color: #fbbd61;
}

.language {
  background: rgba(99, 102, 241, 0.2);
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  font-weight: 500;
  color: #6366f1;
}

.overlay-content {
  margin-bottom: 1.5rem;
}

.overview {
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
  color: #e2e8f0;
  line-height: 1.5;
  margin: 0 0 1rem 0;
  font-weight: 400;
}

.genres {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.genre-tag {
  background: rgba(255, 255, 255, 0.1);
  color: #e2e8f0;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.75rem;
  font-weight: 500;
  font-family: 'Poppins', sans-serif;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.genre-tag:hover {
  background: rgba(251, 189, 97, 0.3);
  color: #fbbd61;
  border-color: rgba(251, 189, 97, 0.5);
}

.overlay-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.details-btn {
  flex: 1;
  background: linear-gradient(135deg, #fbbd61, #ec7532);
  color: white;
  border: none;
  border-radius: 25px;
  padding: 0.8rem 1.5rem;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  text-decoration: none;
  box-shadow: 0 4px 15px rgba(251, 189, 97, 0.3);
}

.details-btn:hover {
  background: linear-gradient(135deg, #ec7532, #fbbd61);
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(251, 189, 97, 0.5);
}

.details-btn svg {
  width: 16px;
  height: 16px;
  stroke: white;
  fill: none;
}

.quick-favorite-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  backdrop-filter: blur(5px);
}

.quick-favorite-btn svg {
  width: 20px;
  height: 20px;
  stroke: white;
  fill: none;
  transition: all 0.3s ease;
}

.quick-favorite-btn.active {
  background: rgba(239, 68, 68, 0.9);
  border-color: rgba(239, 68, 68, 0.5);
}

.quick-favorite-btn.active svg {
  fill: white;
  stroke: white;
}

.quick-favorite-btn:hover {
  background: rgba(239, 68, 68, 0.8);
  border-color: rgba(239, 68, 68, 0.5);
  transform: scale(1.1);
}

.particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(251, 189, 97, 0.8);
  border-radius: 50%;
  animation: float 6s ease-in-out infinite;
}

.particle:nth-child(1) {
  top: 20%;
  left: 20%;
  animation-delay: 0s;
}

.particle:nth-child(2) {
  top: 60%;
  left: 80%;
  animation-delay: 1s;
}

.particle:nth-child(3) {
  top: 40%;
  left: 60%;
  animation-delay: 2s;
}

.particle:nth-child(4) {
  top: 80%;
  left: 30%;
  animation-delay: 3s;
}

.particle:nth-child(5) {
  top: 10%;
  left: 70%;
  animation-delay: 4s;
}

.particle:nth-child(6) {
  top: 70%;
  left: 10%;
  animation-delay: 5s;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.7;
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
    opacity: 1;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .movie-card {
    width: 240px;
    height: 360px;
    margin: 0.5rem;
  }

  .overlay {
    padding: 1rem;
  }

  .movie-title {
    font-size: 1.2rem;
  }

  .overview {
    font-size: 0.85rem;
  }

  .details-btn {
    padding: 0.6rem 1rem;
    font-size: 0.8rem;
  }

  .favorite-btn,
  .quick-favorite-btn {
    width: 40px;
    height: 40px;
  }

  .rating-badge {
    font-size: 0.8rem;
    padding: 0.3rem 0.6rem;
  }
}

@media (max-width: 480px) {
  .movie-card {
    width: 200px;
    height: 300px;
    margin: 0.3rem;
  }

  .movie-title {
    font-size: 1rem;
  }

  .overview {
    font-size: 0.8rem;
  }

  .movie-meta {
    font-size: 0.75rem;
  }

  .genre-tag {
    font-size: 0.7rem;
    padding: 0.2rem 0.5rem;
  }

  .overlay-actions {
    flex-direction: column;
    gap: 0.8rem;
  }

  .details-btn {
    width: 100%;
  }
}
</style>
