<template>
  <div id="app">
    <nav class="navbar">
      <div class="search-bar">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search by title or author"
          class="search-input"
        />
        <select v-model="searchCategory" class="category-select">
          <option value="">All Categories</option>
          <option>Roman</option>
          <option>Science-Fiction</option>
          <option>Biographie</option>
          <option>Fantasy</option>
          <option>Historical</option>
          <option>Horror</option>
          <option>Thriller</option>
        </select>
      </div>
    </nav>
    <div class="book-list">
      <AllBooks :search-query="searchQuery" :search-category="searchCategory" />
    </div>
  </div>
</template>

<script>
import AllBooks from "../components/AllBooks.vue";

export default {
  name: "Home",
  components: {
    AllBooks,
  },
  data() {
    return {
      searchQuery: "",
      searchCategory: "",
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap");

#app {
  font-family: "Roboto", sans-serif;
  background-color: #f9f9f9;
  min-height: calc(100dvh - 40px);
  padding: 20px 100px;
}

.navbar {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.search-bar {
  display: flex;
  gap: 10px;
}

.search-input,
.category-select,
.search-button {
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.search-input {
  width: 300px;
}

.category-select {
  width: 200px;
}

.search-button {
  background-color: black;
  color: white;
  cursor: pointer;
  transition: background 0.3s;
}

.search-button:hover {
  background-color: gray;
}
</style>
