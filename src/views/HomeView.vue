<script lang="ts" setup>
import { ref, onMounted, nextTick } from 'vue'
import { useMoviesStore } from '@/stores/movies'
import SearchBar from '@/components/SearchBar.vue'
import ListGenre from '@/components/ListGenre.vue'
import Welcome from '@/components/Welcome.vue'
import MovieSection from '@/components/MovieSection.vue'

const query = ref('')
const hasSearched = ref(false)
const store = useMoviesStore()

const resultsSection = ref<HTMLElement | null>(null)

const handleSearch = async () => {
  if (!query.value.trim()) return
  hasSearched.value = true
  await store.fetchSearch(query.value)

  await nextTick()
  resultsSection.value?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  store.fetchPopular()
  store.fetchTopRated()
  store.fetchUpcoming()
  store.fetchTrends()
})
</script>

<template>
  <div class="home">
    <Welcome />
    <SearchBar
      class="search-bar"
      :query="query"
      @update:query="query = $event"
      @search="handleSearch"
    />
    <ListGenre />

    <div v-if="store.loading">Chargement...</div>

    <div v-else ref="resultsSection">
      <MovieSection
        :title="hasSearched ? 'Résultats de recherche 🎬' : 'Films populaires'"
        :movies="hasSearched ? store.searchResults : store.popular"
      />
      <MovieSection title="Trend de la semaine" :movies="store.trends" />
      <MovieSection title="Films les mieux notés ⭐" :movies="store.topRated" />
      <MovieSection title="Films à venir" :movies="store.upcoming" />
    </div>
  </div>
</template>

<style scoped>
.home {
  padding: 2rem;
  margin-top: 50px;
}

.search-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem auto;
}
</style>