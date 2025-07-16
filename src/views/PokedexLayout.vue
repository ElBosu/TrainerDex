<template>
  <div class="pokedex-layout">
    <aside class="sidebar">
      <div class="sidebar-content">
        <!-- Encabezado de la Pokédex -->
        <header class="header">
          <h2>Pokédex</h2>
          <p class="subtitle">Selecciona un juego para ver su Pokédex correspondiente.</p>
        </header>

        <!-- Controles: selector de juego y barra de búsqueda -->
        <section class="controls">
          <GameSelector @gameSelected="handleGameSelected" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Buscar por nombre, tipo o número"
            class="search-bar"
            aria-label="Buscar Pokémon"
          />
        </section>

        <!-- Navegación lateral -->
        <nav class="navigation">
          <router-link to="/pokedex" class="nav-button">📖 Pokédex</router-link>
          <router-link to="/favoritos" class="nav-button">⭐ Favoritos</router-link>
        </nav>
      </div>
    </aside>

    <!-- Área principal: lista de Pokémon -->
    <main class="content">
      <!-- Loader mientras se carga la Pokédex -->
      <div v-if="loading" class="loader">Cargando Pokédex...</div>
      <!-- Lista de Pokémon filtrada por juego y búsqueda -->
      <PokemonList
        v-if="selectedGame && !loading"
        :gameVersion="selectedGame"
        :search="searchQuery"
        :key="selectedGame + searchQuery"
      />
    </main>
  </div>
</template>

<script setup>
// Importa funciones reactivas y componentes
import { ref } from 'vue'
import GameSelector from '../components/GameSelector.vue'
import PokemonList from '../components/PokemonList.vue'

// Estado reactivo para el juego seleccionado y la búsqueda
const selectedGame = ref('')
const searchQuery = ref('')
const loading = ref(false)

// Maneja el evento de selección de juego
const handleGameSelected = (game) => {
  selectedGame.value = game
}
</script>

<style scoped>
/* Layout principal de la Pokédex */
.pokedex-layout {
  display: flex;
  height: 100vh;
  background-image: url('/fondo.png');
  background-size: 100% 100%;
}

/* Panel lateral izquierdo */
.sidebar {
  width: 320px;
  background-color: #d1d1d16b;
  border-left: 2px solid #333;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 1rem;
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Encabezado de la Pokédex */
.header {
  text-align: center;
  border-radius: 10px;
  padding: 1rem;
  background-color: #fff3e0c7;
}

.subtitle {
  font-size: 0.95rem;
  color: #555;
}

/* Controles de búsqueda y selección */
.controls {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  background-color: #e0f7fa;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.search-bar {
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
}

/* Navegación lateral */
.navigation {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-button {
  background-color: #e74c3c;
  color: white;
  padding: 0.5rem;
  text-align: center;
  border-radius: 6px;
  text-decoration: none;
  font-weight: bold;
}

/* Área principal de contenido */
.content {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
}

/* Loader de carga */
.loader {
  text-align: center;
  font-size: 1.2rem;
  color: #888;
  margin-top: 2rem;
}
</style>
