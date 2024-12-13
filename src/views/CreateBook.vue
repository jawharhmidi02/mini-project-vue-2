<template>
  <div class="form-container">
    <div class="card">
      <router-link to="/" class="back-button">
        <span class="icon">&larr;</span>
      </router-link>
      <h2>Publish Book</h2>
      <div class="form-group">
        <label for="title">Title:</label>
        <input
          type="text"
          v-model="title"
          id="title"
          class="form-control"
          :class="{ 'is-invalid': errors.title }"
        />
        <p v-if="errors.title" class="error-text">{{ errors.title }}</p>
      </div>

      <div class="form-group">
        <label for="author">Author:</label>
        <input
          type="text"
          v-model="author"
          id="author"
          class="form-control"
          :class="{ 'is-invalid': errors.author }"
        />
        <p v-if="errors.author" class="error-text">{{ errors.author }}</p>
      </div>

      <div class="form-group">
        <label for="date">Date:</label>
        <input
          type="date"
          v-model="date"
          id="date"
          class="form-control"
          :class="{ 'is-invalid': errors.date }"
        />
        <p v-if="errors.date" class="error-text">{{ errors.date }}</p>
      </div>

      <div class="form-group">
        <label for="category">Category:</label>
        <select
          v-model="category"
          id="category"
          class="form-control"
          :class="{ 'is-invalid': errors.category }"
        >
          <option disabled value="">Select a Category</option>
          <option>Roman</option>
          <option>Science-Fiction</option>
          <option>Biographie</option>
          <option>Fantasy</option>
          <option>Historical</option>
          <option>Horror</option>
          <option>Thriller</option>
        </select>
        <p v-if="errors.category" class="error-text">{{ errors.category }}</p>
      </div>

      <div class="form-group">
        <label for="img">Book Cover:</label>
        <button @click="triggerFileInput" class="btn-upload">
          Upload Book Cover
        </button>
        <input
          type="file"
          id="img"
          ref="fileInput"
          class="hidden"
          @change="onFileChange"
          accept="image/*"
        />
        <div v-if="img" class="img">
          <img :src="img" alt="Book Cover Preview" />
        </div>
        <p v-if="errors.img" class="error-text">{{ errors.img }}</p>
      </div>

      <div class="form-actions">
        <button @click="publishBook" class="btn-submit">Upload</button>
      </div>
    </div>

    <div v-if="toastVisible" class="toast">
      <p>Book uploaded successfully!</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreateBook",
  data() {
    return {
      title: "",
      author: "",
      date: "",
      category: "",
      img: null,
      errors: {},
      toastVisible: false,
    };
  },
  methods: {
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        if (!file.type.startsWith("image/")) {
          this.errors.img = "Please upload a valid image file.";
          return;
        }
        this.errors.img = null;
        const reader = new FileReader();
        reader.onload = (e) => {
          this.img = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    validateInputs() {
      this.errors = {};
      if (!this.title.trim()) this.errors.title = "Title is required.";
      if (!this.author.trim()) this.errors.author = "Author is required.";
      if (!this.date) this.errors.date = "Publication date is required.";
      if (!this.category.trim()) this.errors.category = "Category is required.";
      if (!this.img) this.errors.img = "Book cover image is required.";
      return Object.keys(this.errors).length === 0;
    },
    publishBook() {
      if (!this.validateInputs()) return;

      const newBook = {
        title: this.title,
        author: this.author,
        date: this.date,
        category: this.category,
        img: this.img,
        id: Date.now(),
      };

      const books = JSON.parse(localStorage.getItem("books")) || [];
      books.push(newBook);
      localStorage.setItem("books", JSON.stringify(books));

      this.showToast();
      this.resetForm();
    },
    resetForm() {
      this.title = "";
      this.author = "";
      this.date = "";
      this.category = "";
      this.img = null;
      this.errors = {};
    },
    showToast() {
      this.toastVisible = true;
      setTimeout(() => {
        this.toastVisible = false;
      }, 3000);
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap");

* {
  box-sizing: border-box;
}

.form-container {
  display: flex;
  font-family: "Roboto", sans-serif;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f9f9f9;
}

.card {
  position: relative;
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 400px;
}

.back-button {
  position: absolute;
  top: 0px;
  left: 20px;
  text-decoration: none;
  color: black;
  font-size: 32px;
  /* font-weight: 100; */
}

.icon {
  margin-right: 5px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: black;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  color: black;
  margin-bottom: 5px;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.is-invalid {
  border-color: red;
}

.error-text {
  color: red;
  font-size: 0.875em;
}

.img {
  text-align: center;
  margin: 15px 0;
}

.img img {
  max-width: 100%;
  height: auto;
  object-fit: cover;
  aspect-ratio: 1 / 1.5;
}

.form-actions {
  text-align: center;
}

.btn-submit,
.btn-upload {
  width: 100%;
  background: black;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
  font-size: 14px;
}

/* .btn-upload:hover,  */
.btn-submit:hover {
  background: gray;
}

.btn-submit {
  /* width: 100%; */
  background: black;
}

.btn-upload {
  /* width: 100%; */
  background: #e9e9ed;
  border: 1px solid #ccc;
  color: black;
  border-radius: 4px;
}

.hidden {
  display: none;
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
</style>
