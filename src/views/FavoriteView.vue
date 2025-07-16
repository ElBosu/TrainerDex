<!-- Copia este código en src/views/FavoriteView.vue -->
<template>
  <div class="pokedex-layout">
    <aside class="sidebar">
      <div class="sidebar-content">
        <!-- Encabezado de la sección de favoritos -->
        <header class="header">
          <h2>Favoritos</h2>
          <p class="subtitle">Tus Pokémon favoritos guardados localmente.</p>
        </header>

        <!-- Barra de búsqueda -->
        <div class="controls">
          <input
            v-model="searchQuery"
            class="search-bar"
            type="text"
            placeholder="Buscar por nombre, tipo o número..."
          />
        </div>

        <!-- Navegación lateral -->
        <nav class="navigation">
          <router-link to="/pokedex" class="nav-button">📖 Pokédex</router-link>
          <router-link to="/favoritos" class="nav-button">⭐ Favoritos</router-link>
        </nav>
      </div>
    </aside>

    <!-- Área principal: lista de favoritos -->
    <main class="content">
      <FavoriteList :search="searchQuery" />
    </main>
  </div>
</template>

<script setup>
// Importa funciones reactivas de Vue y el componente de la lista de favoritos
import { ref } from 'vue'
import FavoriteList from '../components/FavoriteList.vue'

// Estado reactivo para la barra de búsqueda
const searchQuery = ref('')
</script>

<style scoped>
/* Layout principal de la vista de favoritos */
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

/* Encabezado de la sección */
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

/* Controles de búsqueda */
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
</style>
