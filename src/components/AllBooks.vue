<template>
  <div class="all-books">
    <router-link to="/newbook" class="add-book-card">
      <div class="add-book-content">
        <span class="add-icon">+</span>
        <p>Publish Book</p>
      </div>
    </router-link>

    <div v-if="filteredBooks.length === 0" class="empty-state">
      <p>No results found for your search.</p>
    </div>

    <BookItem
      class="book-card"
      v-for="(book, index) in filteredBooks"
      :key="index"
      :book="book"
      :id="book.id"
    />

    <div v-if="toastVisible" class="toast">
      <p>{{ toastMessage }}</p>
    </div>
  </div>
</template>

<script>
import BookItem from "./BookItem.vue";

export default {
  name: "AllBooks",
  components: {
    BookItem,
  },
  props: {
    searchQuery: String,
    searchCategory: String,
  },
  data() {
    return {
      books: localStorage.getItem("books")
        ? JSON.parse(localStorage.getItem("books"))
        : [],
      filteredBooks: [],
      toastVisible: false,
      toastMessage: "",
    };
  },
  watch: {
    searchQuery: "filterBooks",
    searchCategory: "filterBooks",
  },
  methods: {
    filterBooks() {
      const query = this.searchQuery.toLowerCase();
      this.filteredBooks = this.books.filter((book) => {
        const matchesTitleOrAuthor =
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query);
        const matchesCategory =
          !this.searchCategory || book.category === this.searchCategory;
        return matchesTitleOrAuthor && matchesCategory;
      });
    },
    showToast(message) {
      this.toastMessage = message;
      this.toastVisible = true;
      setTimeout(() => {
        this.toastVisible = false;
      }, 3000);
    },
  },
  mounted() {
    this.filteredBooks = this.books;
  },
};
</script>

<style scoped>
.all-books {
  display: grid;
  gap: 25px;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-auto-columns: minmax(0, 1fr);
  grid-auto-rows: minmax(0, 1fr);
  /* place-items: center; */
  margin-top: 20px;
}

.empty-state {
  text-align: center;
  color: #666;
  font-size: 18px;
  font-weight: bold;
  margin-top: 50px;
  grid-column: span 3 / span 3;
}

.toast {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: black;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 14px;
}

.add-book-card {
  background: #e0e0e0;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  text-align: center;
  color: black;
  text-decoration: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.add-book-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}

.add-book-content {
  font-size: 16px;
}

.add-icon {
  font-size: 50px;
  font-weight: bold;
  display: block;
}
</style>
