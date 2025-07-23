<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useMoviesStore } from '@/stores/movies'
import { GenreMovies, searchMoviesByGenre } from '@/services/tmbd'
import MovieCard from '@/components/MovieCard.vue'
import MovieSection from '@/components/MovieSection.vue'
import type { Genre } from '@/types/genre'
import type { Movie } from '@/types/movie'
import '@/assets/styles/globals.css'

const moviesStore = useMoviesStore()
const genres = ref<Genre[]>([])
const genreMovies = ref<{ [key: number]: Movie[] }>({})
const loading = ref(false)
const loadingGenres = ref<{ [key: number]: boolean }>({})

const fetchGenres = async () => {
  loading.value = true
  try {
    genres.value = await GenreMovies()
    for (const genre of genres.value) {
      await fetchMoviesForGenre(genre.id)
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des genres:', error)
  } finally {
    loading.value = false
  }
}

const fetchMoviesForGenre = async (genreId: number) => {
  loadingGenres.value[genreId] = true
  try {
    const movies = await searchMoviesByGenre(genreId)
    genreMovies.value[genreId] = movies
  } catch (error) {
    console.error(`Erreur lors de la récupération des films pour le genre ${genreId}:`, error)
    genreMovies.value[genreId] = []
  } finally {
    loadingGenres.value[genreId] = false
  }
}

// Fonction pour scroller
const scrollToGenre = (genreId: number) => {
  const element = document.getElementById(`genre-${genreId}`)
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
    setTimeout(() => {
      element.style.backgroundColor = 'rgba(251, 189, 97, 0.1)'
      setTimeout(() => {
        element.style.backgroundColor = 'transparent'
      }, 1000)
    }, 500)
  }
}

onMounted(fetchGenres)
</script>

<template>
  <div class="genres-page">
    <div class="container">
      <h1 class="page-title">Genres de Films</h1>

      <div v-if="loading" class="loading">Chargement des genres...</div>

      <div v-else class="genres-content">
        <div class="preview-section">
          <div class="genres-carousel">
            <div
              v-for="genre in genres.slice(0, 8)"
              :key="`preview-${genre.id}`"
              class="genre-preview"
            >
              <MovieSection
                v-if="genreMovies[genre.id]?.[0]"
                :title="genre.name"
                :movies="[genreMovies[genre.id][0]]"
              />
              <button @click="scrollToGenre(genre.id)" class="voir-plus-btn">
                Voir plus de {{ genre.name }}
              </button>
            </div>
          </div>
        </div>

        <div class="full-lists-section">
          <div
            v-for="genre in genres"
            :key="`full-${genre.id}`"
            :id="`genre-${genre.id}`"
            class="genre-section"
          >
            <h3 class="genre-title">{{ genre.name }}</h3>

            <div v-if="genreMovies[genre.id]?.length > 0" class="movie-carousel">
              <MovieCard v-for="movie in genreMovies[genre.id]" :key="movie.id" :movie="movie" />
            </div>

            <div v-else-if="loadingGenres[genre.id]" class="genre-loading">
              Chargement des films {{ genre.name }}...
            </div>

            <div v-else class="no-movies">Aucun film trouvé pour ce genre</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.genres-page {
  padding: 2rem 1rem;
  margin-top: 80px;
  min-height: 100vh;
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 0 1rem;
}

.page-title {
  text-align: center;
  font-size: 3rem;
  font-family: 'Bebas Neue', sans-serif;
  color: #fbbd61;
  margin-bottom: 3rem;
  letter-spacing: 3px;
}

.loading {
  text-align: center;
  font-size: 1.5rem;
  color: #fff;
  padding: 3rem;
}

.genres-content {
  display: flex;
  flex-direction: column;
  gap: 5rem;
}

.preview-section {
  margin-bottom: 4rem;
}

.section-title {
  font-size: 2.5rem;
  font-family: 'Bebas Neue', sans-serif;
  color: #fbbd61;
  text-align: center;
  margin-bottom: 2rem;
  letter-spacing: 2px;
}

.genres-carousel {
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  padding: 1rem 0.5rem;
  scroll-behavior: smooth;
  margin-bottom: 2rem;
  width: 100%;
  max-width: calc(100vw - 2rem);
}

.genres-carousel::-webkit-scrollbar {
  height: 8px;
}

.genres-carousel::-webkit-scrollbar-track {
  background: #2a2a2a;
  border-radius: 4px;
}

.genres-carousel::-webkit-scrollbar-thumb {
  background: #fbbd61;
  border-radius: 4px;
}

.genres-carousel::-webkit-scrollbar-thumb:hover {
  background: #ec7532;
}

.genre-preview {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 1rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  min-width: 280px;
  max-width: 320px;
  flex-shrink: 0;
}

.genre-preview:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(251, 189, 97, 0.2);
}

.voir-plus-btn {
  width: 100%;
  background: linear-gradient(135deg, #fbbd61, #ec7532);
  color: white;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  font-family: 'Bebas Neue', sans-serif;
  letter-spacing: 1px;
  cursor: pointer;
  margin-top: 0.8rem;
  transition: all 0.3s ease;
}

.voir-plus-btn:hover {
  background: linear-gradient(135deg, #ec7532, #fbbd61);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(251, 189, 97, 0.4);
}

.full-lists-section {
  margin-top: 3rem;
}

.genre-section {
  width: 100%;
  margin-bottom: 4rem;
  scroll-margin-top: 100px;
}

.genre-title {
  font-size: 2.2rem;
  font-family: 'Bebas Neue', sans-serif;
  color: #fff;
  margin-bottom: 1.5rem;
  padding-left: 1rem;
  border-left: 4px solid #fbbd61;
  letter-spacing: 2px;
}

.movie-carousel {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding: 1rem 0.5rem;
  scroll-behavior: smooth;
  width: 100%;
  max-width: calc(100vw - 2rem);
}

.movie-carousel::-webkit-scrollbar {
  height: 8px;
}

.movie-carousel::-webkit-scrollbar-track {
  background: #2a2a2a;
  border-radius: 4px;
}

.movie-carousel::-webkit-scrollbar-thumb {
  background: #fbbd61;
  border-radius: 4px;
}

.movie-carousel::-webkit-scrollbar-thumb:hover {
  background: #ec7532;
}

.genre-loading {
  text-align: center;
  color: #bbb;
  font-style: italic;
  padding: 2rem;
}

.no-movies {
  text-align: center;
  color: #666;
  font-style: italic;
  padding: 2rem;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  .section-title {
    font-size: 1.8rem;
  }

  .genre-title {
    font-size: 1.6rem;
  }

  .genres-page {
    padding: 1rem 0.5rem;
    margin-top: 70px;
  }

  .container {
    padding: 0 0.5rem;
  }

  .genres-content {
    gap: 3rem;
  }

  .genres-carousel {
    gap: 1rem;
    padding: 0.5rem 0.25rem;
    max-width: calc(100vw - 1rem);
  }

  .genre-preview {
    min-width: 200px;
    max-width: 240px;
    padding: 0.8rem;
  }

  .movie-carousel {
    padding: 1rem 0.25rem;
    max-width: calc(100vw - 1rem);
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 1.5rem;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .genre-title {
    font-size: 1.3rem;
  }

  .genres-page {
    padding: 0.5rem 0.25rem;
    margin-top: 60px;
  }

  .container {
    padding: 0 0.25rem;
  }

  .genres-carousel {
    gap: 0.8rem;
    padding: 0.5rem 0.1rem;
    max-width: calc(100vw - 0.5rem);
  }

  .genre-preview {
    min-width: 160px;
    max-width: 180px;
    padding: 0.6rem;
  }

  .movie-carousel {
    padding: 1rem 0.1rem;
    max-width: calc(100vw - 0.5rem);
    gap: 0.8rem;
  }

  .voir-plus-btn {
    font-size: 0.8rem;
    padding: 0.5rem 0.8rem;
  }
}
</style>
