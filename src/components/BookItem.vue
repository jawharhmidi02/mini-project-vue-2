<template>
  <router-link v-bind:to="'/book/' + id" class="book-card">
    <div class="image-container">
      <img :src="book.img" alt="Book Cover" class="book-cover" />
    </div>
    <div class="book-info">
      <p><strong>Title:</strong> {{ book.title }}</p>
      <p><strong>Author:</strong> {{ book.author }}</p>
      <p><strong>Category:</strong> {{ book.category }}</p>
      <p><strong>Date:</strong> {{ book.date }}</p>
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
.image-container {
  overflow: hidden;
}

.book-card {
  background-color: white;
  border-radius: 8px;
  width: calc(100%);
  height: 100%;
  text-align: left;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  align-self: center;
  overflow: hidden;
  flex-direction: column;
}

.book-card img {
  transition: all 0.4s;
}

.book-card img:hover {
  scale: 1.05;
}

.book-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}

.book-cover {
  width: 100%;
  height: 450px;
  margin: auto;
  object-fit: cover;
  border-radius: 4px;
}

.book-info {
  padding: 14px;
  /* margin-top: auto; */
  margin-bottom: auto;
  font-size: 14px;
  line-height: 1.5;
}

.book-info p {
  margin: 5px 0;
}
</style>
