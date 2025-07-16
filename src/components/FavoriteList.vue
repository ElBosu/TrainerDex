<template>
  <div class="favorites-container">
    <h3>Mis Pokémon Favoritos</h3>
    <!-- Controles para ordenar la lista -->
    <div class="order-controls">
      <button @click="orderBy = 'number'">Ordenar por número</button>
      <button @click="orderBy = 'type'">Ordenar por tipo</button>
      <button @click="orderBy = 'default'">Orden original</button>
    </div>

    <!-- Mensaje si no hay favoritos -->
    <div v-if="filteredFavorites.length === 0" class="empty-message">
      No tienes Pokémon en favoritos aún.
    </div>

    <!-- Grid de tarjetas de Pokémon favoritos -->
    <div v-else class="pokemon-grid">
      <div v-for="pokemon in orderedFavorites" :key="pokemon.id" class="pokemon-card">
        <!-- Botón para agregar/quitar de favoritos -->
        <FavoriteToggle :pokemon="pokemon" @updated="refreshFavorites" />
        <!-- Imagen del Pokémon -->
        <img :src="getPokemonImage(pokemon.id)" :alt="pokemon.name" />
        <!-- Nombre del Pokémon -->
        <p class="pokemon-name">{{ capitalize(pokemon.name) }}</p>
        <!-- Tipos del Pokémon -->
        <div class="pokemon-types">
          <img
            v-for="type in pokemon.types"
            :key="type.type.name"
            :src="getTypeIcon(type.type.name)"
            :alt="type.type.name"
            class="type-icon"
            width="40"
            height="14"
          />
        </div>
        <!-- Número de Pokédex -->
        <p class="pokemon-number">#{{ formatId(pokemon.entryNumber) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Importaciones de Vue y componente de favoritos
import { ref, onMounted, computed, onUnmounted, watch } from 'vue'
import FavoriteToggle from './FavoriteToggle.vue'

// Prop para búsqueda
const props = defineProps({
  search: {
    type: String,
    default: ''
  }
})

// Lista reactiva de favoritos
const favorites = ref([])
// Variable para el tipo de orden actual
const orderBy = ref('number') // 'number', 'type', 'default'

// Función para cargar favoritos desde localStorage
const refreshFavorites = () => {
  favorites.value = JSON.parse(localStorage.getItem('favorites')) || []
}

// Carga favoritos al montar y escucha cambios en localStorage
onMounted(() => {
  refreshFavorites()
  window.addEventListener('storage', onStorage)
})

// Limpia el listener al desmontar
onUnmounted(() => {
  window.removeEventListener('storage', onStorage)
})

// Actualiza favoritos si cambian en otra pestaña
const onStorage = (e) => {
  if (e.key === 'favorites') refreshFavorites()
}

// Recarga favoritos si cambia la búsqueda
watch(() => props.search, () => {
  refreshFavorites()
})

// Computed para filtrar favoritos según búsqueda
const filteredFavorites = computed(() => {
  const query = (props.search ?? '').trim().toLowerCase().replace('#', '')
  let list = favorites.value

  if (query) {
    list = list.filter(pokemon => {
      const nameMatch = pokemon.name.toLowerCase().includes(query)
      const number = pokemon.entryNumber?.toString() ?? ''
      const numberMatch = [number, number.padStart(2, '0'), number.padStart(3, '0')]
        .some(n => n === query)
      const typeMatch = pokemon.types?.some(type =>
        type.type.name.toLowerCase().includes(query)
      )
      return nameMatch || numberMatch || typeMatch
    })
  }

  return list
})

// Computed para ordenar favoritos según el tipo de orden seleccionado
const orderedFavorites = computed(() => {
  if (orderBy.value === 'number') {
    // Ordena por número de Pokédex
    return [...filteredFavorites.value].sort((a, b) => (a.entryNumber ?? 0) - (b.entryNumber ?? 0))
  }
  if (orderBy.value === 'type') {
    // Ordena por tipo (alfabético del primer tipo)
    return [...filteredFavorites.value].sort((a, b) => {
      const typeA = a.types?.[0]?.type?.name ?? ''
      const typeB = b.types?.[0]?.type?.name ?? ''
      return typeA.localeCompare(typeB)
    })
  }
  // Orden original (como están en localStorage)
  return filteredFavorites.value
})

// Utilidad para obtener la imagen del Pokémon
const getPokemonImage = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

// Utilidad para obtener el ícono del tipo
const getTypeIcon = (typeName) =>
  `https://veekun.com/dex/media/types/en/${typeName}.png`

// Capitaliza el nombre
const capitalize = (name) => name ? name.charAt(0).toUpperCase() + name.slice(1) : ''

// Formatea el número de Pokédex
const formatId = (id) => id?.toString().padStart(3, '0')
</script>

<style scoped>
.favorites-container {
  padding: 2rem;
  text-align: center;
}

.empty-message {
  color: #777;
  font-style: italic;
  margin-top: 1rem;
}

.pokemon-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

.pokemon-card {
  position: relative;
  width: 140px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 0.75rem;
  background-color: #f9f9f9af;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.pokemon-card img {
  width: 96px;
  height: 96px;
}

.pokemon-name {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.pokemon-types {
  display: flex;
  justify-content: center;
  gap: 0.35rem;
  margin: -1.8rem 0;
}

.type-icon {
  width: 70px !important;
  height: 80px !important;
  object-fit: contain;
  display: inline-block;
}

.pokemon-number {
  color: #555;
  font-size: 0.9rem;
}

.order-controls {
  margin-bottom: 1rem;
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}
.order-controls button {
  padding: 0.4rem 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  background: #e0f7fa;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.2s;
}
.order-controls button:hover {
  background: #b2ebf2;
}
</style>
