<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import MovieCard from '@/components/MovieCard.vue'
import { searchMoviesByGenre,GenreMovies } from '@/services/tmbd'
import type { Movie } from '@/types/movie'

const route = useRoute()
const movies = ref<Movie[]>([])
const genreName = ref('')

onMounted(async () => {
  const genreId = Number(route.params.genreId)
  movies.value = await searchMoviesByGenre(genreId)
  const allGenres = await GenreMovies()
  const genre = allGenres.find((g: any) => g.id === genreId)
  genreName.value = genre ? genre.name : ''
})
</script>
<template>
  <div class="similar-movies">
    <h1>Films du genre : {{ genreName }}</h1>
    <div v-if="movies.length > 0" class="movie-list">
      <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
    </div>
    <div v-else>
      <p>Aucun film trouvé pour ce genre.</p>
    </div>
  </div>
  <button class="voir-plus-btn" >
    Voir plus de 
  </button>
</template>
<style scoped>
.similar-movies {
  max-width: 1100px;
  width: 100%;
  margin: 2rem auto;
  padding: 2rem 1rem;
  background: rgba(18, 34, 51, 0.95);
  border-radius: 18px;
  box-shadow: 0 8px 32px #0005;
  color: #fff;
  box-sizing: border-box;
}

.similar-movies h1 {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 2.2rem;
  letter-spacing: 2px;
  margin-bottom: 2rem;
  text-align: center;
  color: #fafafa;
  text-shadow: 0 2px 8px #0004;
}

.movie-list {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
}

p {
  text-align: center;
  font-size: 1.1rem;
  color: #cfd8dc;
  margin-top: 2rem;
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

@media (max-width: 700px) {
  .similar-movies {
    padding: 1rem 0.5rem;
    margin: 1rem auto;
    max-width: calc(100vw - 2rem);
  }
  .movie-list {
    gap: 1rem;
  }
  .similar-movies h1 {
    font-size: 1.3rem;
  }
}
</style>