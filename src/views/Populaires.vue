<template>
  <div class="populaires-page">
    <!-- Hero Section -->
    <section class="hero-section" v-if="moviesStore.popular.length > 0">
      <div class="hero-backdrop" :style="{ backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${moviesStore.popular[0].backdrop_path})` }">
        <div class="hero-overlay">
          <div class="hero-content">
            <div class="hero-badge">
              <i class="fas fa-fire"></i>
              <span>Le Plus Populaire</span>
            </div>
            <h1 class="hero-title">{{ moviesStore.popular[0].title }}</h1>
            <p class="hero-description">{{ moviesStore.popular[0].overview }}</p>
            <div class="hero-meta">
              <div class="rating">
                <i class="fas fa-star"></i>
                <span>{{ moviesStore.popular[0].vote_average.toFixed(1) }}</span>
              </div>
              <div class="year">
                <i class="fas fa-calendar"></i>
                <span>{{ new Date(moviesStore.popular[0].release_date).getFullYear() }}</span>
              </div>
            </div>
            <div class="hero-actions">
              <button class="btn btn-primary" @click="viewDetails(moviesStore.popular[0])">
                <i class="fas fa-play"></i>
                Voir les détails
              </button>
              <button class="btn btn-secondary" @click="addToFavorites(moviesStore.popular[0])">
                <i class="fas fa-heart"></i>
                Ajouter aux favoris
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Loading State -->
    <div v-if="moviesStore.loading" class="loading-container">
      <div class="loading-spinner">
        <i class="fas fa-spinner fa-spin"></i>
        <p>Chargement des films populaires...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-if="moviesStore.error" class="error-container">
      <div class="error-message">
        <i class="fas fa-exclamation-triangle"></i>
        <p>{{ moviesStore.error }}</p>
        <button @click="retry" class="retry-btn">
          <i class="fas fa-redo"></i>
          Réessayer
        </button>
      </div>
    </div>

    <!-- Content Sections -->
    <div class="content-sections" v-if="!moviesStore.loading && !moviesStore.error">
      
      <!-- Popular Movies Section -->
      <section class="movies-section">
        <div class="section-header">
          <h2>
            <i class="fas fa-fire"></i>
            Films Populaires
          </h2>
          <p>Les films les plus regardés en ce moment</p>
        </div>
        <div class="movies-grid">
          <div 
            v-for="movie in moviesStore.popular.slice(1, 13)" 
            :key="movie.id"
            class="movie-card"
            @click="viewDetails(movie)"
          >
            <div class="movie-poster">
              <img 
                :src="movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/placeholder-poster.jpg'" 
                :alt="movie.title"
                @error="handleImageError"
              />
              <div class="movie-overlay">
                <div class="movie-actions">
                  <button class="action-btn" @click.stop="addToFavorites(movie)">
                    <i class="fas fa-heart"></i>
                  </button>
                  <button class="action-btn" @click.stop="viewDetails(movie)">
                    <i class="fas fa-info"></i>
                  </button>
                </div>
              </div>
            </div>
            <div class="movie-info">
              <h3 class="movie-title">{{ movie.title }}</h3>
              <div class="movie-meta">
                <span class="rating">
                  <i class="fas fa-star"></i>
                  {{ movie.vote_average.toFixed(1) }}
                </span>
                <span class="year">{{ new Date(movie.release_date).getFullYear() }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Top Rated Movies Section -->
      <section class="movies-section">
        <div class="section-header">
          <h2>
            <i class="fas fa-crown"></i>
            Films les Mieux Notés
          </h2>
          <p>Les films avec les meilleures critiques</p>
        </div>
        <div class="movies-carousel">
          <div 
            v-for="movie in moviesStore.topRated.slice(0, 10)" 
            :key="movie.id"
            class="carousel-item"
            @click="viewDetails(movie)"
          >
            <div class="carousel-poster">
              <img 
                :src="movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : '/placeholder-poster.jpg'" 
                :alt="movie.title"
                @error="handleImageError"
              />
              <div class="carousel-overlay">
                <div class="rating-badge">
                  <i class="fas fa-star"></i>
                  {{ movie.vote_average.toFixed(1) }}
                </div>
              </div>
            </div>
            <p class="carousel-title">{{ movie.title }}</p>
          </div>
        </div>
      </section>

      <!-- Trending Movies Section -->
      <section class="movies-section">
        <div class="section-header">
          <h2>
            <i class="fas fa-trending-up"></i>
            Tendances de la Semaine
          </h2>
          <p>Les films qui font le buzz cette semaine</p>
        </div>
        <div class="trending-list">
          <div 
            v-for="(movie, index) in moviesStore.trends.slice(0, 5)" 
            :key="movie.id"
            class="trending-item"
            @click="viewDetails(movie)"
          >
            <div class="trending-rank">{{ index + 1 }}</div>
            <div class="trending-poster">
              <img 
                :src="movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : '/placeholder-poster.jpg'" 
                :alt="movie.title"
                @error="handleImageError"
              />
            </div>
            <div class="trending-info">
              <h3>{{ movie.title }}</h3>
              <p>{{ movie.overview?.substring(0, 100) }}...</p>
              <div class="trending-meta">
                <span class="rating">
                  <i class="fas fa-star"></i>
                  {{ movie.vote_average.toFixed(1) }}
                </span>
                <span class="popularity">
                  <i class="fas fa-eye"></i>
                  {{ Math.round(movie.popularity) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Upcoming Movies Section -->
      <section class="movies-section">
        <div class="section-header">
          <h2>
            <i class="fas fa-calendar-alt"></i>
            Prochainement
          </h2>
          <p>Les films à ne pas manquer</p>
        </div>
        <div class="upcoming-grid">
          <div 
            v-for="movie in moviesStore.upcoming.slice(0, 8)" 
            :key="movie.id"
            class="upcoming-card"
            @click="viewDetails(movie)"
          >
            <div class="upcoming-poster">
              <img 
                :src="movie.poster_path ? `https://image.tmdb.org/t/p/w400${movie.poster_path}` : '/placeholder-poster.jpg'" 
                :alt="movie.title"
                @error="handleImageError"
              />
              <div class="upcoming-date">
                <i class="fas fa-calendar"></i>
                {{ formatDate(movie.release_date) }}
              </div>
            </div>
            <div class="upcoming-info">
              <h3>{{ movie.title }}</h3>
              <p>{{ movie.overview?.substring(0, 120) }}...</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useMoviesStore } from '../stores/movies'
import { useRouter } from 'vue-router'
import type { Movie } from '../types/movie'

const moviesStore = useMoviesStore()
const router = useRouter()

onMounted(async () => {
  await loadMovies()
})

const loadMovies = async () => {
  try {
    await Promise.all([
      moviesStore.fetchPopular(),
      moviesStore.fetchTopRated(),
      moviesStore.fetchTrends(),
      moviesStore.fetchUpcoming()
    ])
  } catch (error) {
    console.error('Error loading movies:', error)
  }
}

const viewDetails = (movie: Movie) => {
  router.push(`/movie/${movie.id}`)
}

const addToFavorites = (movie: Movie) => {
  // TODO: Implement favorites functionality
  console.log('Adding to favorites:', movie.title)
}

const retry = () => {
  moviesStore.clearError()
  loadMovies()
}

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = '/placeholder-poster.jpg'
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Poppins:wght@300;400;500;600;700&display=swap');

.populaires-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0c1421 0%, #1a2a3a 50%, #2d3748 100%);
  padding-top: 60px;
}

/* Hero Section */
.hero-section {
  position: relative;
  height: 70vh;
  min-height: 500px;
  margin-bottom: 4rem;
}

.hero-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(12, 20, 33, 0.8) 0%,
    rgba(26, 42, 58, 0.6) 50%,
    rgba(45, 55, 72, 0.8) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.hero-content {
  max-width: 800px;
  text-align: center;
  color: white;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(251, 189, 97, 0.2);
  border: 1px solid rgba(251, 189, 97, 0.5);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  color: #fbbd61;
  margin-bottom: 1.5rem;
}

.hero-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  line-height: 1.1;
}

.hero-description {
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.hero-meta {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
}

.hero-meta > div {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  font-weight: 500;
}

.hero-meta i {
  color: #fbbd61;
}

.hero-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  font-family: 'Poppins', sans-serif;
}

.btn-primary {
  background: linear-gradient(135deg, #fbbd61, #ec7532);
  color: #1a1a2e;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(251, 189, 97, 0.4);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

/* Loading & Error States */
.loading-container, .error-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem 2rem;
  min-height: 300px;
}

.loading-spinner {
  text-align: center;
  color: #fbbd61;
}

.loading-spinner i {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.error-message {
  text-align: center;
  color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
  padding: 2rem;
  border-radius: 15px;
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.retry-btn {
  background: #ef4444;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

/* Content Sections */
.content-sections {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.movies-section {
  margin-bottom: 4rem;
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.section-header p {
  color: #a0aec0;
  font-size: 1.1rem;
}

/* Movies Grid */
.movies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 2rem;
}

.movie-card {
  background: rgba(26, 34, 51, 0.6);
  border-radius: 15px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.movie-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.movie-poster {
  position: relative;
  aspect-ratio: 2/3;
  overflow: hidden;
}

.movie-poster img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.movie-card:hover .movie-poster img {
  transform: scale(1.1);
}

.movie-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.movie-card:hover .movie-overlay {
  opacity: 1;
}

.movie-actions {
  display: flex;
  gap: 1rem;
}

.action-btn {
  background: rgba(251, 189, 97, 0.9);
  color: #1a1a2e;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.action-btn:hover {
  background: #fbbd61;
  transform: scale(1.1);
}

.movie-info {
  padding: 1.5rem;
}

.movie-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0.5rem;
  line-height: 1.3;
}

.movie-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: #a0aec0;
}

.rating {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: #fbbd61;
}

/* Movies Carousel */
.movies-carousel {
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  padding: 1rem 0;
  scrollbar-width: thin;
  scrollbar-color: #fbbd61 transparent;
}

.movies-carousel::-webkit-scrollbar {
  height: 8px;
}

.movies-carousel::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

.movies-carousel::-webkit-scrollbar-thumb {
  background: #fbbd61;
  border-radius: 10px;
}

.carousel-item {
  min-width: 180px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.carousel-item:hover {
  transform: scale(1.05);
}

.carousel-poster {
  position: relative;
  aspect-ratio: 2/3;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.carousel-poster img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  display: flex;
  align-items: flex-end;
  padding: 1rem;
}

.rating-badge {
  background: rgba(251, 189, 97, 0.9);
  color: #1a1a2e;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.carousel-title {
  color: white;
  font-size: 0.9rem;
  font-weight: 500;
  text-align: center;
  line-height: 1.3;
}

/* Trending List */
.trending-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.trending-item {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  background: rgba(26, 34, 51, 0.6);
  padding: 1.5rem;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.trending-item:hover {
  transform: translateX(10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.trending-rank {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 3rem;
  color: #fbbd61;
  font-weight: 700;
  min-width: 60px;
  text-align: center;
}

.trending-poster {
  width: 80px;
  height: 120px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
}

.trending-poster img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.trending-info {
  flex: 1;
}

.trending-info h3 {
  font-size: 1.3rem;
  color: white;
  margin-bottom: 0.5rem;
}

.trending-info p {
  color: #a0aec0;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.trending-meta {
  display: flex;
  gap: 2rem;
  font-size: 0.9rem;
}

.trending-meta > span {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.trending-meta i {
  color: #fbbd61;
}

/* Upcoming Grid */
.upcoming-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.upcoming-card {
  background: rgba(26, 34, 51, 0.6);
  border-radius: 15px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.upcoming-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
}

.upcoming-poster {
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
}

.upcoming-poster img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.upcoming-date {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(251, 189, 97, 0.9);
  color: #1a1a2e;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.upcoming-info {
  padding: 1.5rem;
}

.upcoming-info h3 {
  font-size: 1.2rem;
  color: white;
  margin-bottom: 0.8rem;
}

.upcoming-info p {
  color: #a0aec0;
  line-height: 1.5;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-description {
    font-size: 1rem;
  }
  
  .hero-meta {
    flex-direction: column;
    gap: 1rem;
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .movies-grid {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 1.5rem;
  }
  
  .trending-item {
    flex-direction: column;
    text-align: center;
  }
  
  .trending-rank {
    font-size: 2rem;
  }
  
  .upcoming-grid {
    grid-template-columns: 1fr;
  }
  
  .content-sections {
    padding: 0 1rem;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .section-header h2 {
    font-size: 2rem;
  }
  
  .movies-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
  
  .carousel-item {
    min-width: 140px;
  }
}
</style>