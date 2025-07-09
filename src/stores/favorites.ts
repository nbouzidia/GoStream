import { defineStore } from 'pinia'
import type { MovieDetail } from '@/types/movieDetail'

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    favorites: [] as MovieDetail[]
  }),

  getters: {
    isFavorite: (state) => (movieId: number) => {
      return state.favorites.some(m => m.id === movieId)
    },
    favoritesCount: (state) => state.favorites.length
  },

  actions: {
    // Initialiser les favoris depuis le localStorage
    initializeFavorites() {
      const stored = localStorage.getItem('movie-favorites')
      if (stored) {
        try {
          this.favorites = JSON.parse(stored)
        } catch (error) {
          console.error('Error parsing favorites from localStorage:', error)
          this.favorites = []
        }
      }
    },

    // Sauvegarder dans le localStorage
    saveFavorites() {
      localStorage.setItem('movie-favorites', JSON.stringify(this.favorites))
    },

    addFavorite(movie: MovieDetail) {
      if (!this.favorites.find(m => m.id === movie.id)) {
        this.favorites.push(movie)
        this.saveFavorites()
      }
    },

    removeFavorite(movieId: number) {
      this.favorites = this.favorites.filter(m => m.id !== movieId)
      this.saveFavorites()
    },

    toggleFavorite(movie: MovieDetail) {
      if (this.isFavorite(movie.id)) {
        this.removeFavorite(movie.id)
      } else {
        this.addFavorite(movie)
      }
    },

    clearFavorites() {
      this.favorites = []
      localStorage.removeItem('movie-favorites')
    }
  }
})