<template>
  <header id="header">
    <div class="header-content">
      <img src="../assets/logo.png" alt="Logo" class="logo" />

      <button class="burger" :class="{ active: isOpen }" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav v-if="authStore.isAuthenticated" :class="['links', { open: isOpen }]">
        <RouterLink to="/" @click="closeMenu">Accueil</RouterLink>
        <RouterLink to="/popular" @click="closeMenu">Populaires</RouterLink>
        <RouterLink to="/genres" @click="closeMenu">Genres</RouterLink>
        <RouterLink to="/favoris" @click="closeMenu">Favoris</RouterLink>
        <span class="line"></span>
      </nav>

      <div class="auth-section">
        <div v-if="authStore.isAuthenticated" class="user-info">
          <div class="user-avatar">
            <i class="fa fa-user"></i>
          </div>
          <div class="user-details">
            <span class="user-name">{{ authStore.user?.email }}</span>
            <button @click="logout" class="logout-btn">
              <i class="fa fa-sign-out-alt"></i>
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
        
        <div v-else class="auth-buttons">
          <RouterLink to="/login" class="btn btn-login" @click="closeMenu">
            <i class="fa fa-sign-in-alt"></i>
            <span>Connexion</span>
          </RouterLink>
          <RouterLink to="/register" class="btn btn-register" @click="closeMenu">
            <i class="fa fa-user-plus"></i>
            <span>S'inscrire</span>
          </RouterLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()

const isOpen = ref(false)
const toggleMenu = () => {
  isOpen.value = !isOpen.value
}
const closeMenu = () => {
  isOpen.value = false
}

const logout = async () => {
  await authStore.logout()
  closeMenu()
  router.push('/')
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Poppins:wght@300;400&display=swap');

#header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: linear-gradient(135deg, rgba(18, 34, 51, 0.85), rgba(26, 32, 46, 0.85));
  backdrop-filter: blur(15px);
  border-bottom: 1px solid rgba(251, 189, 97, 0.15);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
  padding: 0.3rem 1rem;
  transition: all 0.3s ease;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1400px;
  margin: 0 auto;
  gap: 1.5rem;
  height: 50px;
}

.logo {
  height: 35px;
  width: 70px;
  transition: all 0.3s ease;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
}

.logo:hover {
  transform: scale(1.03);
  filter: drop-shadow(0 2px 4px rgba(251, 189, 97, 0.2));
}

.burger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 3px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.3rem;
  width: 35px;
  height: 35px;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.burger:hover {
  background: rgba(251, 189, 97, 0.08);
}

.burger span {
  width: 20px;
  height: 2px;
  background: #fff;
  border-radius: 1px;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transform-origin: center;
}

.burger.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
  background: #fbbd61;
}

.burger.active span:nth-child(2) {
  opacity: 0;
  transform: scale(0);
}

.burger.active span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
  background: #fbbd61;
}

.auth-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.3rem 0.8rem;
  background: rgba(251, 189, 97, 0.08);
  border-radius: 20px;
  border: 1px solid rgba(251, 189, 97, 0.15);
}

.user-avatar {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #fbbd61, #ec7532);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1a1a2e;
  font-size: 0.9rem;
  font-weight: bold;
}

.user-details {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.user-name {
  font-family: 'Poppins', sans-serif;
  font-size: 0.8rem;
  color: #fbbd61;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 130px;
}

.logout-btn {
  background: none;
  border: none;
  color: #a0aec0;
  cursor: pointer;
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  gap: 0.2rem;
  padding: 0.1rem 0;
  transition: all 0.3s ease;
  font-family: 'Poppins', sans-serif;
}

.logout-btn:hover {
  color: #ef4444;
}

.auth-buttons {
  display: flex;
  gap: 0.8rem;
  align-items: center;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 1rem;
  border: none;
  border-radius: 18px;
  font-size: 0.8rem;
  font-weight: 500;
  font-family: 'Poppins', sans-serif;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  text-decoration: none;
  white-space: nowrap;
}

.btn i {
  font-size: 0.8rem;
}

.btn-login {
  background: rgba(99, 102, 241, 0.1);
  color: #6366f1;
  border: 1px solid rgba(99, 102, 241, 0.3);
}

.btn-login:hover {
  background: rgba(99, 102, 241, 0.2);
  border-color: rgba(99, 102, 241, 0.5);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
}

.btn-register {
  background: linear-gradient(135deg, #fbbd61, #ec7532);
  color: #1a1a2e;
  border: 1px solid transparent;
}

.btn-register:hover {
  background: linear-gradient(135deg, #ec7532, #fbbd61);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(251, 189, 97, 0.3);
}

.links {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  font-size: 1rem;
  font-weight: 400;
  position: relative;
  transition: all 0.3s ease;
}

.links > a {
  color: #9ab;
  padding: 0.4rem 0.8rem;
  text-decoration: none;
  transition: all 0.3s ease;
  font-family: 'Bebas Neue', sans-serif;
  letter-spacing: 0.5px;
  font-size: 1rem;
  border-radius: 6px;
  position: relative;
  overflow: hidden;
}

.links > a::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(251, 189, 97, 0.1), transparent);
  transition: left 0.5s;
}

.links > a:hover::before {
  left: 100%;
}

.links > a:hover {
  background: rgba(251, 189, 97, 0.08);
  color: #fbbd61;
  transform: translateY(-1px);
}

.links > a.router-link-active {
  color: #fbbd61;
  background: rgba(251, 189, 97, 0.15);
  border: 1px solid rgba(251, 189, 97, 0.2);
}

.links > .line {
  background: linear-gradient(90deg, #fbbd61, #ec7532);
  height: 2px;
  pointer-events: none;
  opacity: 0;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 0;
  border-radius: 1px;
}

.links > a:hover ~ .line {
  opacity: 1;
}

.links > a:nth-of-type(1):hover ~ .line { 
  left: 0; 
  width: var(--link-1-width, 80px);
}
.links > a:nth-of-type(2):hover ~ .line { 
  left: var(--link-2-left, 100px); 
  width: var(--link-2-width, 90px);
}
.links > a:nth-of-type(3):hover ~ .line { 
  left: var(--link-3-left, 210px); 
  width: var(--link-3-width, 80px);
}
.links > a:nth-of-type(4):hover ~ .line { 
  left: var(--link-4-left, 310px); 
  width: var(--link-4-width, 80px);
}

@media (max-width: 768px) {
  .burger {
    display: flex;
    order: 2;
  }

  .header-content {
    flex-wrap: wrap;
    position: relative;
  }

  .auth-section {
    order: 1;
    margin-left: auto;
  }

  .user-info {
    padding: 0.2rem 0.5rem;
    gap: 0.4rem;
  }

  .user-avatar {
    width: 30px;
    height: 30px;
    font-size: 0.9rem;
  }

  .user-name {
    font-size: 0.7rem;
    max-width: 100px;
  }

  .logout-btn {
    font-size: 0.6rem;
  }

  .auth-buttons {
    gap: 0.4rem;
  }

  .btn {
    padding: 0.4rem 0.8rem;
    font-size: 0.7rem;
  }

  .btn span {
    display: none;
  }

  .btn i {
    font-size: 0.9rem;
  }

  .links {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: linear-gradient(135deg, rgba(18, 34, 51, 0.98), rgba(26, 32, 46, 0.98));
    backdrop-filter: blur(10px);
    flex-direction: column;
    padding: 1.5rem;
    gap: 1rem;
    border-top: 1px solid rgba(251, 189, 97, 0.2);
    border-radius: 0 0 15px 15px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    z-index: 999;
    order: 3;
    width: 100%;
  }

  .links.open {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }

  .links > a {
    width: 100%;
    padding: 1rem 1.5rem;
    text-align: center;
    border-radius: 12px;
    font-size: 1.2rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #e2e8f0;
    transition: all 0.3s ease;
  }

  .links > a:hover {
    background: rgba(251, 189, 97, 0.2);
    color: #fbbd61;
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(251, 189, 97, 0.3);
  }

  .links > a.router-link-active {
    background: linear-gradient(135deg, rgba(251, 189, 97, 0.3), rgba(236, 117, 50, 0.3));
    color: #fbbd61;
    border-color: rgba(251, 189, 97, 0.5);
  }

  .links > .line {
    display: none;
  }
}

@media (max-width: 480px) {
  #header {
    padding: 0.2rem 0.8rem;
  }

  .header-content {
    gap: 0.8rem;
    height: 45px;
  }

  .logo {
    height: 28px;
    width: 56px;
  }

  .auth-section {
    gap: 0.4rem;
  }

  .user-info {
    padding: 0.2rem 0.5rem;
    gap: 0.3rem;
  }

  .user-avatar {
    width: 28px;
    height: 28px;
    font-size: 0.8rem;
  }

  .user-name {
    font-size: 0.65rem;
    max-width: 80px;
  }

  .logout-btn {
    font-size: 0.55rem;
  }

  .btn {
    padding: 0.3rem 0.6rem;
    font-size: 0.65rem;
  }

  .btn i {
    font-size: 0.8rem;
  }

  .links {
    padding: 1rem;
    gap: 0.6rem;
  }

  .links > a {
    padding: 0.8rem 1rem;
    font-size: 1rem;
  }
}
</style>
