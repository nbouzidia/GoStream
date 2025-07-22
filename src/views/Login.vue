<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const authStore = useAuthStore()
const router = useRouter()

const handleLogin = async () => {
  const success = await authStore.login(email.value, password.value)
  if (success) {
    router.push('/home')
  }
}
</script>
<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-header">
        <h2>Connexion</h2>
        <p>Connectez-vous pour découvrir des films</p>
      </div>
      
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="input-group">
          <input 
            v-model="email" 
            type="email" 
            placeholder="Email" 
            required
            class="form-input"
          />
          <i class="input-icon">✉</i>
        </div>
        
        <div class="input-group">
          <input 
            v-model="password" 
            type="password" 
            placeholder="Mot de passe" 
            required
            class="form-input"
          />
          <i class="input-icon">🔒</i>
        </div>
        
        <button type="submit" :disabled="authStore.loading" class="login-btn">
          <span v-if="authStore.loading">Connexion...</span>
          <span v-else>Se connecter</span>
        </button>
        
        <div v-if="authStore.error" class="error-message">
          <i>⚠</i>
          {{ authStore.error }}
        </div>
      </form>
      
      <div class="divider">
        <span>ou</span>
      </div>
      
      <div class="register-section">
        <p>Pas encore de compte ?</p>
        <router-link to="/register" class="register-link">
          Créer un compte
        </router-link>
      </div>
    </div>
  </div>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Poppins:wght@300;400;500;600&display=swap');

.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0c1421 0%, #1a2a3a 50%, #2d3748 100%);
  padding: 2rem 1rem;
  position: relative;
}

.login-page::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('../assets/Picture.jpg') center/cover;
  opacity: 0.1;
  z-index: 1;
}

.login-container {
  background: rgba(26, 34, 51, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 3rem 2.5rem;
  max-width: 420px;
  width: 100%;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  z-index: 2;
  margin-top: 40px;
}

.login-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.login-header h2 {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 2.5rem;
  color: #fbbd61;
  margin-bottom: 0.5rem;
  letter-spacing: 2px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.login-header p {
  color: #a0aec0;
  font-family: 'Poppins', sans-serif;
  font-size: 0.95rem;
  margin: 0;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.input-group {
  position: relative;
}

.form-input {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  font-size: 1rem;
  font-family: 'Poppins', sans-serif;
  transition: all 0.3s ease;
  outline: none;
  box-sizing: border-box;
}

.form-input:focus {
  border-color: #fbbd61;
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(251, 189, 97, 0.2);
}

.form-input::placeholder {
  color: #718096;
}

.input-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #fbbd61;
  font-size: 1.2rem;
  pointer-events: none;
}

.login-btn {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-family: 'Bebas Neue', sans-serif;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  position: relative;
  overflow: hidden;
}

.login-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #764ba2, #667eea);
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
}

.login-btn:disabled {
  background: #4a5568;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.error-message {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 8px;
  padding: 1rem;
  color: #feb2b2;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

.error-message i {
  color: #f56565;
}

.divider {
  display: flex;
  align-items: center;
  margin: 2rem 0;
  color: #718096;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
}

.divider span {
  padding: 0 1rem;
  font-size: 0.9rem;
  font-family: 'Poppins', sans-serif;
}

.register-section {
  text-align: center;
}

.register-section p {
  color: #a0aec0;
  margin-bottom: 1rem;
  font-family: 'Poppins', sans-serif;
}

.register-link {
  background: linear-gradient(135deg, #48bb78, #38a169);
  color: white;
  text-decoration: none;
  padding: 0.8rem 2rem;
  border-radius: 10px;
  font-family: 'Bebas Neue', sans-serif;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  display: inline-block;
}

.register-link:hover {
  background: linear-gradient(135deg, #38a169, #48bb78);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(72, 187, 120, 0.3);
}

@media (max-width: 480px) {
  .login-container {
    padding: 2rem 1.5rem;
    margin: 1rem;
  }
  
  .login-header h2 {
    font-size: 2rem;
  }
  
  .form-input {
    padding: 0.9rem 0.9rem 0.9rem 2.5rem;
  }
  
  .input-icon {
    left: 0.8rem;
    font-size: 1rem;
  }
}
</style>