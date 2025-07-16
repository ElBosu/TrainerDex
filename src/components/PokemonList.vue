<template>
  <div v-if="loading">Cargando Pokédex...</div>
  <div v-else>
    <h3>Pokémon en {{ gameVersion }}</h3>
    <div class="pokemon-grid">
      <div
        class="pokemon-card"
        v-for="pokemon in filteredPokemon"
        :key="pokemon.name"
      >
        <!-- Botón para agregar/quitar de favoritos -->
        <FavoriteToggle :pokemon="pokemon" />

        <!-- Imagen del Pokémon -->
        <img
          :src="getPokemonImage(pokemon.id)"
          :alt="pokemon.name"
          @error="handleImageError"
        />
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
// Importa funciones reactivas de Vue y el componente de favoritos
import { ref, watchEffect, computed } from 'vue'
import FavoriteToggle from './FavoriteToggle.vue'

// Props para la versión del juego y búsqueda
const props = defineProps({
  gameVersion: String,
  search: String
})

// Lista reactiva de Pokémon y estado de carga
const pokemonList = ref([])
const loading = ref(false)

// Imagen por defecto si no se encuentra el sprite
const defaultSprite = 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Gray_circles.svg'

// Efecto reactivo para cargar la Pokédex según la versión seleccionada
watchEffect(async () => {
  if (!props.gameVersion) return
  loading.value = true
  try {
    // Obtiene la versión y el grupo de la Pokédex
    const versionRes = await fetch(`https://pokeapi.co/api/v2/version/${props.gameVersion}`)
    const versionData = await versionRes.json()
    const pokedexUrl = versionData.version_group.url

    // Obtiene los pokédexes del grupo
    const groupRes = await fetch(pokedexUrl)
    const groupData = await groupRes.json()
    const pokedexes = groupData.pokedexes

    if (pokedexes.length > 0) {
      // Obtiene las entradas de la Pokédex
      const pokedexRes = await fetch(pokedexes[0].url)
      const pokedexData = await pokedexRes.json()

      // Descarga los datos de cada Pokémon
      const entries = await Promise.all(
        pokedexData.pokemon_entries.map(async (entry) => {
          try {
            // Obtiene datos de especie y detalles del Pokémon
            const speciesRes = await fetch(entry.pokemon_species.url)
            const speciesData = await speciesRes.json()
            const pokemonRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${speciesData.id}`)
            const pokemonData = await pokemonRes.json()

            return {
              name: entry.pokemon_species.name,
              id: speciesData.id,
              entryNumber: entry.entry_number,
              types: pokemonData.types
            }
          } catch (err) {
            console.error('Error al obtener especie:', entry.pokemon_species.name, err)
            return null
          }
        })
      )

      // Filtra los Pokémon válidos
      pokemonList.value = entries.filter(p => p !== null)
    } else {
      pokemonList.value = []
    }
  } catch (error) {
    console.error('Error al cargar la Pokédex:', error)
    pokemonList.value = []
  } finally {
    loading.value = false
  }
})

// Utilidad para obtener la imagen del Pokémon
const getPokemonImage = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

// Utilidad para obtener el ícono del tipo
const getTypeIcon = (typeName) =>
  `https://veekun.com/dex/media/types/en/${typeName}.png`

// Maneja el error de imagen y muestra el sprite por defecto
const handleImageError = (event) => {
  event.target.src = defaultSprite
}

// Formatea el número de Pokédex
const formatId = (id) => id?.toString().padStart(3, '0')

// Capitaliza el nombre del Pokémon
const capitalize = (name) => name ? name.charAt(0).toUpperCase() + name.slice(1) : ''

// Computed para filtrar Pokémon según la búsqueda
const filteredPokemon = computed(() => {
  const query = (props.search ?? '').trim().toLowerCase().replace('#', '')
  if (!query) return pokemonList.value

  return pokemonList.value.filter(pokemon => {
    const nameMatch = pokemon.name.toLowerCase().includes(query)
    const number = pokemon.entryNumber?.toString() ?? ''
    const numberMatch = [number, number.padStart(2, '0'), number.padStart(3, '0')]
      .some(n => n === query)
    const typeMatch = pokemon.types?.some(type =>
      type.type.name.toLowerCase().includes(query)
    )
    return nameMatch || numberMatch || typeMatch
  })
})
</script>

<style scoped>
.search-bar {
  width: 100%;
  max-width: 400px;
  padding: 0.5rem;
  margin: 1rem auto;
  display: block;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
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
</style>
