<template>
  <div class="home-container">
    <!-- Título principal de la app -->
    <h1>Bienvenido a <span class="highlight">TrainerDex</span></h1>
    <!-- Subtítulo descriptivo -->
    <p class="subtitle">Explora los juegos de Pokémon.</p>
    <!-- Botón para ir a la Pokédex -->
    <router-link to="/pokedex" class="pokedex-link">Ir a la Pokédex</router-link>
  </div>
</template>

<script setup>
// No se necesita lógica por ahora
</script>

<style scoped>
/* Contenedor principal de la página de inicio */
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  text-align: center;
  min-height: 100vh;
  background-image: url('/fondo.png');
  background-size: 100% 100%;
  background-position: center;          
}

/* Título principal */
h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #202d3b;
}

/* Resalta el nombre de la app */
.highlight {
  color: #eb2a2a;
}

/* Subtítulo */
.subtitle {
  font-size: 1.2rem;
  color: #e6dfdf;
  margin-bottom: 2rem;
}

/* Botón Pokédex */
.pokedex-link {
  background-color: #3498db;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

/* Efecto hover en el botón */
.pokedex-link:hover {
  background-color: #2980b9;
}
</style>
