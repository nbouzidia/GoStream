import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  searchPopularMovies,
  TopRatedMovies,
  getUpcomingMovies,
  getTrend,
  searchMovies,
  searchMoviesByGenre,
  getMovieDetails,
  getRecommendations
} from '@/services/tmbd'
import type { Movie } from '@/types/movie'
import type { MovieDetail } from '@/types/movieDetail'

export const useMoviesStore = defineStore('movies', () => {
  const popular = ref<Movie[]>([])
  const topRated = ref<Movie[]>([])
  const upcoming = ref<Movie[]>([])
  const trends = ref<Movie[]>([])
  const searchResults = ref<Movie[]>([])

  const movieDetails = ref<MovieDetail | null>(null)
  const recommendations = ref<Movie[]>([])

  const loading = ref(false)

  async function fetchPopular() {
    loading.value = true
    popular.value = await searchPopularMovies()
    loading.value = false
  }

  async function fetchTopRated() {
    loading.value = true
    topRated.value = await TopRatedMovies()
    loading.value = false
  }

  async function fetchUpcoming() {
    loading.value = true
    upcoming.value = await getUpcomingMovies()
    loading.value = false
  }

  async function fetchTrends() {
    loading.value = true
    trends.value = await getTrend()
    loading.value = false
  }

  async function fetchSearch(query: string) {
    loading.value = true
    searchResults.value = await searchMovies(query)
    loading.value = false
  }

  async function fetchByGenre(genreId: number) {
    loading.value = true
    searchResults.value = await searchMoviesByGenre(genreId)
    loading.value = false
  }


  async function fetchMovieDetails(id: number) {
    loading.value = true
    movieDetails.value = await getMovieDetails(id)
    loading.value = false
  }

  async function fetchRecommendations(id: number) {
    loading.value = true
    recommendations.value = await getRecommendations(id)
    loading.value = false
  }

  return {
    popular,
    topRated,
    upcoming,
    trends,
    searchResults,
    movieDetails,
    recommendations,
    loading,
    fetchPopular,
    fetchTopRated,
    fetchUpcoming,
    fetchTrends,
    fetchSearch,
    fetchByGenre,
    fetchMovieDetails,
    fetchRecommendations
  }
})