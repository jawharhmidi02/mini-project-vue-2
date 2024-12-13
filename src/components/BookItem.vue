<template>
  <router-link v-bind:to="'/book/' + id" class="full-height">
    <div class="book-card">
      <img :src="book.img" alt="Book Cover" class="book-cover" />
      <div class="book-info">
        <p><strong>Title:</strong> {{ book.title }}</p>
        <p><strong>Author:</strong> {{ book.author }}</p>
        <p><strong>Category:</strong> {{ book.category }}</p>
        <p><strong>Date:</strong> {{ book.date }}</p>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "BookItem",
  props: {
    book: Object,
    id: Number,
  },
};
</script>

<style scoped>
.book-card {
  background-color: white;
  border-radius: 8px;
  padding: 15px;
  text-align: left;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.book-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}

.book-cover {
  width: 300px;
  height: 450px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 10px;
}

.book-info {
  margin-top: auto;
  font-size: 14px;
  line-height: 1.5;
}

.book-info p {
  margin: 5px 0;
}
</style>
