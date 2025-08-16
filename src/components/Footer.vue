<template>
  <footer class="footer">
    <div class="footer-container">
      <!-- Contact Info -->
      <div class="contact">
        <h3>Contact</h3>
        <p>Email: <a href="mailto:huzeir2k@gmail.com">huzeir2k@gmail.com</a></p>
        <p>Phone: <a href="tel:+2267247626">+1 (226) 724-7626</a></p>
      </div>

      <!-- Copyright -->
      <div class="copyright">
        <p>&copy; {{ new Date().getFullYear() }} Huzeir Kurpejovic; All rights reserved.</p>
      </div>

      <div class="powered-by-vue">
        Website powered by <a href="https://vuejs.org/">Vue</a>
      </div>
    </div>
  </footer>
</template>

<script setup>
// nothing dynamic except the date
</script>

<style scoped>
.footer {
  width: 100%;
  background-color: black;
  border-top: 2px solid red;
  padding: 2rem 1rem;
  color: white;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;
}

.contact h3 {
  color: red;
  margin-bottom: 0.5rem;
}

.contact a {
  color: white;
  text-decoration: none;
  transition: color 0.3s ease;
}

.contact a:hover {
  color: red;
}

copyright p {
  font-size: 0.9rem;
  color: #aaa;
}
</style>
