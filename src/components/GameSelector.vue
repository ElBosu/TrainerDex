<template>
  <div>
    <h2>Selecciona un juego</h2>
    <!-- Selector de versiones de juego -->
    <select @change="$emit('gameSelected', $event.target.value)">
      <option disabled selected>Elige una versión</option>
      <option
        v-for="version in filteredVersions"
        :key="version.name"
        :value="version.name"
      >
        {{ capitalize(version.name) }}
      </option>
    </select>
  </div>
</template>

<script setup>
// Importa funciones reactivas de Vue
import { ref, onMounted } from 'vue'

// Lista reactiva de versiones filtradas
const filteredVersions = ref([])
// Juegos que no se mostrarán en el selector
const excludedGames = ['colosseum', 'xd']

// Al montar el componente, obtiene las versiones desde la API y las filtra
onMounted(async () => {
  try {
    const res = await fetch('https://pokeapi.co/api/v2/version/')
    const data = await res.json()
    filteredVersions.value = (data.results || []).filter(
      v => !excludedGames.includes(v.name.toLowerCase())
    )
  } catch {
    // Si hay error, deja la lista vacía
    filteredVersions.value = []
  }
})

// Capitaliza el nombre de la versión para mostrarlo bonito
const capitalize = name => name.charAt(0).toUpperCase() + name.slice(1)
</script>

<style scoped>
select {
  padding: 0.5rem;
  font-size: 1rem;
  margin-top: 1rem;
}
</style>
