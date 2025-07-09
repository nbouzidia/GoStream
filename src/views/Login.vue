<template>
  <div class="login-container">
    <h2>Connexion</h2>
    <input v-model="email" type="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Mot de passe" />
    <button @click="login">Se connecter</button>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { getAuth } from 'firebase/auth'
import router from '@/router'

const email = ref('')
const password = ref('')
const error = ref('')

const auth = getAuth()

const login = async () => {
  error.value = ''
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value)
    router.push('/')
  } catch (e: any) {
    error.value = e.message
  }
}
</script>

<style scoped>
.login-container {
  max-width: 350px;
  margin: 3rem auto;
  padding: 2rem;
  background: #1a2233;
  border-radius: 10px;
  box-shadow: 0 4px 16px #0004;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: #fff;
}
input {
  padding: 0.5rem;
  border-radius: 5px;
  border: none;
  font-size: 1rem;
}
button {
  background: #2c73df;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 0.7rem;
  cursor: pointer;
  font-size: 1rem;
}
.error {
  color: #ff5252;
  font-size: 0.95rem;
}
</style>