<script setup lang="ts">
import MovieCard from './MovieCard.vue'
import type { Movie } from '@/types/movie'
import '@/assets/styles/globals.css'

defineProps<{
  title: string
  movies: Movie[]
}>()
</script>
<template>
  <section v-if="movies.length > 0" class="movie-section">
    <h1>{{ title }}</h1>
    <div class="movie-carousel">
      <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
    </div>
  </section>
</template>

<style scoped>
</style>
