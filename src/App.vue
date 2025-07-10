<script lang="ts" setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>

<template>
  <div id="app" class="app-container">
    <div v-if="!authStore.initialized" class="loading-screen">
      <div class="loading-spinner">
        <div class="spinner"></div>
        <p>Chargement...</p>
      </div>
    </div>

    <template v-else>
      <Header />
      <main class="main-content">
        <RouterView />
      </main>
      <Footer />
    </template>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Poppins:wght@300;400&display=swap');

body {
  margin: 0;
  padding: 0;
  background-color: #123;
  color: #fff;
  font-family: 'Poppins', sans-serif;
  line-height: 1.5;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding: 1rem;
}

h1,
h2,
h3,
h4,
li,
p,
button {
  font-family: 'Bebas Neue', sans-serif;
  letter-spacing: 1px;
  text-transform: uppercase;
}

h1 {
  font-size: clamp(1.5rem, 5vw, 2.5rem);
}
p,
li {
  font-size: clamp(1rem, 2.5vw, 1.2rem);
}

.container {
  width: 100%;
  max-width: 1200px;
  padding: 1rem;
  margin: 0 auto;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

@media (max-width: 768px) {
  .main-content {
    padding: 0.5rem;
  }
}

/* Écran de chargement */
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loading-spinner {
  text-align: center;
  color: #fff;
}

.spinner {
  width: 60px;
  height: 60px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top: 3px solid #e50914;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading-spinner p {
  font-size: 1.1rem;
  margin: 0;
  opacity: 0.8;
}
</style>
