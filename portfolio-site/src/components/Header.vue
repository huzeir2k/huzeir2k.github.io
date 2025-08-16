<template>
  <header class="header">
    <nav class="nav">
      <!-- Logo -->
      <router-link to="/" class="logo">Huzeir Kurpejovic</router-link>

      <!-- Navigation Links -->
      <ul class="nav-links">
        <li><router-link to="/" class="nav-link" active-class="active">Home</router-link></li>
        <li><router-link to="/about" class="nav-link" active-class="active">About</router-link></li>
        <li><router-link to="/projects" class="nav-link" active-class="active">Projects</router-link></li>
        <li><router-link to="/contact" class="nav-link" active-class="active">Contact</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
// no logic yet, purely presentational
</script>

<style scoped>
.header {
  width: 100%;
  background-color: black;
  border-bottom: 2px solid red;
}

.nav {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: red;
  text-decoration: none;
  transition: color 0.3s ease;
}
.logo:hover {
  color: white;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 2rem;
  margin: 0;
  padding: 0;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease, border-bottom 0.3s ease;
}

.nav-link:hover {
  color: red;
}

.active {
  border-bottom: 2px solid red;
  color: red;
}
</style>
