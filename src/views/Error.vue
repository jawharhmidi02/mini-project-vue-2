<template>
  <div class="error-page">
    <div class="error-content">
      <h1 class="error-title">404</h1>
      <p class="error-message">Page not found</p>
      <p class="error-description">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <router-link to="/" class="home-link"> Go Back Home </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Error",
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;500&display=swap");

.error-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #000;
  color: #fff;
  font-family: "Roboto", sans-serif;
  text-align: center;
  animation: fadeIn 1s ease-in-out;
}

.error-content {
  animation: slideIn 0.8s ease-out;
}

.error-title {
  font-size: 8rem;
  font-weight: 500;
  margin: 0;
}

.error-message {
  font-size: 2rem;
  font-weight: 300;
  margin: 0;
}

.error-description {
  font-size: 1.2rem;
  font-weight: 300;
  margin: 20px 0;
}

.home-link {
  text-decoration: none;
  color: #fff;
  background-color: #444;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.home-link:hover {
  background-color: #666;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
