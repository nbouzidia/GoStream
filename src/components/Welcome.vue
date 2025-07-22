<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { getTrend } from '@/services/tmbd'
import type { Movie } from '@/types/movie'

const trends = ref<Movie[]>([])
const currentIndex = ref(0)

const fetchTrends = async () => {
  try {
    trends.value = await getTrend()
  } catch (error) {
    console.error('Erreur chargement tendances :', error)
  }
}

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % trends.value.length
}
const prevSlide = () => {
  currentIndex.value =
    (currentIndex.value - 1 + trends.value.length) % trends.value.length
}

onMounted(() => {
  fetchTrends()
  setInterval(() => {
    nextSlide()
  }, 5000)
})
</script>
<template>
  <section class="welcome-carousel" v-if="trends.length > 0">
    <div class="carousel">
      <div
        class="slide"
        v-for="(movie, index) in trends"
        :key="movie.id"
        :class="{ active: index === currentIndex }"
      >
        <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.title" />
      </div>
      <div class="controls">
        <button @click="prevSlide">‹</button>
        <button @click="nextSlide">›</button>
      </div>
    </div>

    <div class="welcome-content">
      <h1>Bienvenue sur Go Stream</h1>
      <p>
        Découvrez les films populaires, les tendances du moment, les meilleures notes et les sorties à venir.<br>
        Utilisez la barre de recherche pour trouver un film précis ou explorez par genre.<br>
        Ajoutez vos films préférés à vos favoris pour les retrouver facilement !
      </p>
      <RouterLink :to="`/film/${trends[currentIndex].id}`">
        <button class="cta">Voir Plus</button>
      </RouterLink>
    </div>
  </section>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

.welcome-carousel {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 4rem;
  padding: 2rem;
  border-radius: 12px;
  background-color: #0f172a;
  color: white;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
  max-width: 1200px;
  margin: auto;
  min-height: 80vh;
}

.carousel {
  position: relative;
  width: 300px;
  height: 450px;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
  flex-shrink: 0;
}

.slide {
  position: absolute;
  opacity: 0;
  transition: opacity 0.6s ease-in-out;
  width: 100%;
  height: 100%;
}
.slide.active {
  opacity: 1;
  z-index: 2;
}
.slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
}

.controls {
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  display: flex;
  gap: 1rem;
}
.controls button {
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  border: none;
  font-size: 1.5rem;
  padding: 0.3rem 0.8rem;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.controls button:hover {
  background-color: #fbbd61;
  color: #000;
}

.welcome-content {
  max-width: 500px;
  text-align: center;
}
.welcome-content h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-family: 'Montserrat', sans-serif;
  color: #fbbd61;
}
.welcome-content p {
  font-size: 1rem;
  color: #cbd5e1;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}
.cta {
  background-color: #fbbd61;
  padding: 0.6rem 1.5rem;
  border-radius: 30px;
  color: #000;
  font-weight: bold;
  text-decoration: none;
  transition: background-color 0.3s ease-in-out;
}
.cta:hover {
  background-color: #ec7532;
  color: #fff;
}

@media (max-width: 768px) {
  .welcome-carousel {
    flex-direction: column;
    padding: 1rem;
  }
  .welcome-content {
    max-width: 90%;
  }
}
</style>