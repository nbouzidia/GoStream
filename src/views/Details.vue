<script lang="ts" setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useMoviesStore } from '@/stores/movies'
import { useFavoritesStore } from '@/stores/favorites'
import MovieCard from '@/components/MovieCard.vue'
import axios from 'axios'

const route = useRoute()
const store = useMoviesStore()
const favoritesStore = useFavoritesStore()

const trailerKey = ref<string | null>(null)

const isFavorite = computed(() => 
  store.movieDetails ? favoritesStore.isFavorite(store.movieDetails.id) : false
)

const fetchData = async () => {
  const id = Number(route.params.id)
  await store.fetchMovieDetails(id)
  await store.fetchRecommendations(id)

  try {
    const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos`, {
      params: {
        api_key: 'd09afaa763de60066107386a9848e1cd', // Clé API mise à jour
      },
    })
    const video = res.data.results.find(
      (v: any) => v.site === 'YouTube' && v.type === 'Trailer'
    )
    trailerKey.value = video ? video.key : null
  } catch (err) {
    console.error('Erreur vidéo trailer :', err)
  }
}

onMounted(fetchData)

watch(() => route.params.id, fetchData)

const toggleFavorite = () => {
  if (store.movieDetails) {
    favoritesStore.toggleFavorite(store.movieDetails)
  }
}

const formatRuntime = (minutes: number) => {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hours}h ${mins}min`
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}
</script>

<template>
  <div
    id="content_hero"
    class="center-content hero-ontop"
    :style="store.movieDetails?.backdrop_path
      ? `background-image: url(https://image.tmdb.org/t/p/original${store.movieDetails.backdrop_path})`
      : ''"
  >
    <div class="hero-overlay"></div>
    <div class="container">
      <div class="row blurb">
        <div class="col-md-9">
          <div class="movie-badges">
            <span class="genre-badge">{{ store.movieDetails?.genres.map(g => g.name).join(', ') }}</span>
            <span v-if="store.movieDetails?.runtime" class="runtime-badge">
              {{ formatRuntime(store.movieDetails.runtime) }}
            </span>
            <span v-if="store.movieDetails?.release_date" class="year-badge">
              {{ new Date(store.movieDetails.release_date).getFullYear() }}
            </span>
          </div>
          
          <h1 class="movie-title">{{ store.movieDetails?.title }}</h1>
          
          <div class="movie-meta">
            <div class="rating-info">
              <div class="star-rating">
                <i class="material-icons">star_rate</i>
                <span>{{ store.movieDetails?.vote_average.toFixed(1) }}</span>
                <span class="rating-count">({{ store.movieDetails?.vote_count }} votes)</span>
              </div>
            </div>
            <div v-if="store.movieDetails?.release_date" class="release-date">
              <i class="material-icons">event</i>
              <span>{{ formatDate(store.movieDetails.release_date) }}</span>
            </div>
          </div>
          
          <p class="movie-overview">{{ store.movieDetails?.overview }}</p>
          
          <div class="buttons">
            <a
              v-if="trailerKey"
              :href="`https://www.youtube.com/watch?v=${trailerKey}`"
              class="btn btn-primary"
              target="_blank"
            >
              <i class="material-icons">play_arrow</i>
              <span>Voir la bande-annonce</span>
            </a>

            <button 
              class="btn btn-favorite" 
              :class="{ active: isFavorite }"
              @click="toggleFavorite"
            >
              <i class="fa fa-heart" aria-hidden="true"></i>
              <span>{{ isFavorite ? 'Retiré des favoris' : 'Ajouter aux favoris' }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="recommendations-section">
    <div class="section-header">
      <h2>Films similaires</h2>
      <p>Découvrez d'autres films qui pourraient vous plaire</p>
    </div>
    
    <div v-if="store.recommendations.length > 0" class="movie-list">
      <MovieCard v-for="movie in store.recommendations" :key="movie.id" :movie="movie" />
    </div>
    
    <div v-else class="no-recommendations">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M9 11H5a2 2 0 0 0-2 2v3c0 1.1.9 2 2 2h4m6-6h4a2 2 0 0 1 2 2v3c0 1.1-.9 2-2 2h-4m-6 0V9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-1"/>
      </svg>
      <p>Aucune recommandation trouvée pour ce film.</p>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Poppins:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');

#content_hero {
  position: relative;
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(26, 32, 46, 0.7) 50%,
    rgba(0, 0, 0, 0.9) 100%
  );
  backdrop-filter: blur(2px);
  z-index: 1;
}

.container {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  padding: 2rem;
  color: #fff;
}

.movie-badges {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.genre-badge,
.runtime-badge,
.year-badge {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
  letter-spacing: 0.5px;
}

.genre-badge {
  background: linear-gradient(135deg, #fbbd61, #ec7532);
  color: #1a1a2e;
}

.runtime-badge {
  background: rgba(99, 102, 241, 0.9);
  color: white;
  border: 1px solid rgba(99, 102, 241, 0.3);
}

.year-badge {
  background: rgba(34, 197, 94, 0.9);
  color: white;
  border: 1px solid rgba(34, 197, 94, 0.3);
}

.movie-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 4rem;
  font-weight: 700;
  letter-spacing: 3px;
  margin: 0 0 1.5rem 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  line-height: 1.1;
  color: #fff;
}

.movie-meta {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  align-items: center;
  flex-wrap: wrap;
}

.rating-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.star-rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(251, 189, 97, 0.2);
  padding: 0.8rem 1.2rem;
  border-radius: 25px;
  border: 1px solid rgba(251, 189, 97, 0.3);
  backdrop-filter: blur(10px);
}

.star-rating i {
  color: #fbbd61;
  font-size: 1.5rem;
}

.star-rating span {
  color: #fbbd61;
  font-weight: 700;
  font-size: 1.1rem;
  font-family: 'Poppins', sans-serif;
}

.rating-count {
  color: #a0aec0 !important;
  font-size: 0.9rem !important;
  font-weight: 500 !important;
}

.release-date {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #e2e8f0;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
}

.release-date i {
  color: #6366f1;
  font-size: 1.2rem;
}

.movie-overview {
  font-family: 'Poppins', sans-serif;
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 2.5rem;
  max-width: 800px;
  color: #e2e8f0;
  font-weight: 400;
}

.buttons {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  align-items: center;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1rem 2rem;
  border: none;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  text-decoration: none;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
}

.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.btn:hover::before {
  left: 100%;
}

.btn-primary {
  background: linear-gradient(135deg, #fbbd61, #ec7532);
  color: #1a1a2e;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #ec7532, #fbbd61);
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(251, 189, 97, 0.4);
}

.btn-favorite {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border: 2px solid rgba(239, 68, 68, 0.3);
}

.btn-favorite:hover {
  background: rgba(239, 68, 68, 0.2);
  border-color: rgba(239, 68, 68, 0.5);
  transform: translateY(-3px);
}

.btn-favorite.active {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
  border-color: #ef4444;
}

.btn-favorite.active:hover {
  background: linear-gradient(135deg, #dc2626, #ef4444);
}

.btn i {
  font-size: 1.2rem;
}

.recommendations-section {
  margin: 4rem 2rem;
  color: #fff;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header h2 {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 2.5rem;
  color: #fbbd61;
  margin-bottom: 0.5rem;
  letter-spacing: 2px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.section-header p {
  color: #a0aec0;
  font-family: 'Poppins', sans-serif;
  font-size: 1.1rem;
  margin: 0;
}

.movie-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
  margin-top: 2rem;
}

.no-recommendations {
  text-align: center;
  color: #64748b;
  padding: 3rem;
  font-family: 'Poppins', sans-serif;
}

.no-recommendations svg {
  width: 80px;
  height: 80px;
  margin-bottom: 1rem;
  stroke: #64748b;
}

.no-recommendations p {
  font-size: 1.1rem;
  margin: 0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .movie-title {
    font-size: 2.5rem;
  }
  
  .movie-meta {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
  
  .buttons {
    flex-direction: column;
    width: 100%;
  }
  
  .btn {
    width: 100%;
    justify-content: center;
  }
  
  .recommendations-section {
    margin: 2rem 1rem;
  }
  
  .section-header h2 {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 1rem;
  }
  
  .movie-title {
    font-size: 2rem;
  }
  
  .movie-badges {
    gap: 0.5rem;
  }
  
  .genre-badge,
  .runtime-badge,
  .year-badge {
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
  }
  
  .movie-overview {
    font-size: 1rem;
  }
  
  .btn {
    padding: 0.8rem 1.5rem;
    font-size: 0.9rem;
  }
}
</style>
