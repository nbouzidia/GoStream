<script lang="ts" setup>
  import { defineProps, defineEmits } from 'vue'
  
  defineProps({
    query: String
  })
  
  const emit = defineEmits(['update:query', 'search'])
  
  const handleInput = (event: Event) => {
    emit('update:query', (event.target as HTMLInputElement).value)
  }
  
  const handleSearch = () => {
    emit('search')
  }
</script>
<template>
    <div class="group">
      <svg viewBox="0 0 24 24" aria-hidden="true" class="search-icon" @click="handleSearch">
        <g>
          <path
            d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 
               4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 
               5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 
               11c0-4.135 3.365-7.5 7.5-7.5s7.5 
               3.365 7.5 7.5-3.365 7.5-7.5 
               7.5-7.5-3.365-7.5-7.5z"
          ></path>
        </g>
      </svg>
  
      <input
        id="query"
        class="input"
        type="search"
        :value="query"
        @input="handleInput"
        @keyup.enter="handleSearch"
        placeholder="Rechercher vos films..."
        name="searchbar"
      />
    </div>
</template>
  
  
<style scoped>
  .group {
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 400px;
    background-color: rgb(31, 42, 64);
    border-radius: 8px;
    padding: 5px 5px;
    position: relative;
    box-shadow: 0 0 12px rgba(64, 63, 63, 0.4);
  }
  
  .search-icon {
    width: 20px;
    height: 20px;
    fill: white;
    cursor: pointer;
    margin-right: 8px;
  }
  
  .input {
    border: none;
    outline: none;
    background: transparent;
    font-size: 13px;
    color: white;
    width: 80%;
    letter-spacing: 1px;
  }
  
  .input::placeholder {
    color: #bbb;
  }
  @media (max-width: 768px) {
  .group {
    max-width: 90%;
    padding: 8px 10px;
    border-radius: 10px;
  }

  .search-icon {
    width: 24px;
    height: 24px;
    margin-right: 12px;
  }

  .input {
    font-size: 16px;
    width: 100%;
  }
}
</style>