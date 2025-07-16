<template>
  <!-- Icono de favorito, cambia de color si está activo -->
  <div
    class="favorite-icon"
    :class="{ active: isFavorite }"
    @click="toggle"
    :title="isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'"
  >
    <span>★</span>
  </div>
</template>

<script setup>
// Importa funciones reactivas de Vue
import { ref, watch } from 'vue'

// Recibe el Pokémon como prop
const props = defineProps({
  pokemon: Object
})

// Emite evento cuando se actualiza la lista de favoritos
const emit = defineEmits(['updated'])

// Estado reactivo para saber si el Pokémon es favorito
const isFavorite = ref(false)

// Obtiene la lista de favoritos desde localStorage
const getFavorites = () => JSON.parse(localStorage.getItem('favorites')) || []

// Verifica si el Pokémon actual está en favoritos
const checkFavorite = () => {
  const stored = getFavorites()
  isFavorite.value = stored.some(p => p.id === props.pokemon.id)
}

// Observa cambios en el Pokémon y actualiza el estado favorito
watch(() => props.pokemon?.id, checkFavorite, { immediate: true })

// Agrega o quita el Pokémon de favoritos
const toggle = () => {
  let stored = getFavorites()
  const exists = stored.some(p => p.id === props.pokemon.id)

  if (exists) {
    // Si ya es favorito, lo elimina
    stored = stored.filter(p => p.id !== props.pokemon.id)
    isFavorite.value = false
  } else {
    // Si no es favorito, lo agrega
    stored.push({ ...props.pokemon })
    isFavorite.value = true
  }

  // Guarda la lista actualizada en localStorage
  localStorage.setItem('favorites', JSON.stringify(stored))
  // Emite evento para actualizar la lista en el componente padre
  emit('updated')
}
</script>

<style scoped>
.favorite-icon {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-color: #ccc;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  z-index: 1;
  line-height: 1;
}

.favorite-icon span {
  display: block;
  transform: translateY(-1px);
}

.favorite-icon:hover {
  background-color: #999;
}

.favorite-icon.active {
  background-color: #2ecc71;
}
</style>
