<template>
    <div class="list-genre">
      <div class="genres-container">
        <div
          v-for="genre in paginatedGenres"
          :key="genre.id"
          class="card"
        >
        <p class="card__title">{{ genre.name }}</p>
          <div class="card__content">
            <p class="card__description">
              <a>Les films similaires du genre {{ genre.name }} </a>
              <button class="button_card" @click="goToSimilar(genre.id)">Voir Plus</button>
            </p>
          </div>
        </div>
      </div>
  
      <div class="pagination">
        <button @click="previousPage" :disabled="currentPage === 0">Précédent</button>
        <button @click="nextPage" :disabled="(currentPage + 1) * itemsPerPage >= genres.length">Suivant</button>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, computed, onMounted } from 'vue'
  import { GenreMovies } from '@/services/tmbd'
  import type { Genre } from '@/types/genre'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  const genres = ref<Genre[]>([])
  const currentPage = ref(0)
  const itemsPerPage = 5
  
  const fetchGenres = async () => {
    try {
      genres.value = await GenreMovies()
    } catch (error) {
      console.error('Erreur lors de la récupération des genres:', error)
    }
  }
  
  onMounted(fetchGenres)
  
  const paginatedGenres = computed(() => {
    const start = currentPage.value * itemsPerPage
    const end = start + itemsPerPage
    return genres.value.slice(start, end)
  })
  
  const nextPage = () => {
    if ((currentPage.value + 1) * itemsPerPage < genres.value.length) {
      currentPage.value++
    }
  }
  
  const previousPage = () => {
    if (currentPage.value > 0) {
      currentPage.value--
    }
  }
  
  const goToSimilar = (genreId: number) => {
    router.push({ name: 'SimilarMovies', params: { genreId } })
  }
  </script>
<style scoped>
.list-genre {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2rem auto;
}

.genres-container {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  padding: 1rem 0;
}

.card {
  position: relative;
  width: 150px; 
  height: 100px; 
  background-color: #f2f2f2;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  perspective: 1000px;
  box-shadow: 0 0 0 5px #ffffff80;
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(255, 255, 255, 0.2);
}

.card__content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  background-color: #f2f2f2;
  transform: rotateX(-90deg);
  transform-origin: bottom;
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.card:hover .card__content {
  transform: rotateX(0deg);
}

.card__title {
  margin: 0;
  font-size: 18px; 
  color: #333;
  font-weight: 700;
}

.card__description {
  margin: 10px 0 0;
  font-size: 12px;
  color: #777;
  line-height: 1.4;
}

.pagination {
  margin-top: 2rem; 
  display: flex;
  gap: 1rem;
  justify-content: center;
}
.button_card{
  padding: 0.2rem 0.8rem;
  margin-top: 10px;
  background-color: #0d0d0e;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  position: center;
}

button {
  padding: 0.5rem 1rem;
  background-color: #7a7c7f;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
.slide-enter-active, .slide-leave-active {
  transition: transform 0.5s ease;
}

.slide-enter {
  transform: translateX(100%);
}

.slide-leave-to {
  transform: translateX(-100%);
}
</style>