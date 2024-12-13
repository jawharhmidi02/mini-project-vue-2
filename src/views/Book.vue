<template>
  <div class="book-page">
    <router-link to="/" class="back-button">
      <span class="icon">&larr;</span>
    </router-link>

    <div v-if="!book" class="error-state">
      <h2>Book Not Found</h2>
      <p>The requested book does not exist.</p>
      <router-link to="/" class="back-home">Go Back to Home</router-link>
    </div>

    <div v-else class="book-details">
      <div class="book-card">
        <img
          :src="editedBook.img || book.img"
          alt="Book Cover"
          class="book-cover"
        />
        <div class="book-info">
          <template v-if="!isEditing">
            <p>
              <strong style="">Title:</strong> <br />
              <span style="margin-left: 10px; font-size: 20px">{{
                book.title
              }}</span>
            </p>
            <p>
              <strong style="">Author:</strong> <br />
              <span style="margin-left: 10px; font-size: 20px">{{
                book.author
              }}</span>
            </p>
            <p>
              <strong style="">Category:</strong> <br />
              <span style="margin-left: 10px; font-size: 20px">{{
                book.category
              }}</span>
            </p>
            <p>
              <strong style="">Date:</strong> <br />
              <span style="margin-left: 10px; font-size: 20px">{{
                book.date
              }}</span>
            </p>
          </template>
          <template v-else>
            <input
              type="text"
              v-model="editedBook.title"
              placeholder="Title"
              class="edit-input"
            />
            <input
              type="text"
              v-model="editedBook.author"
              placeholder="Author"
              class="edit-input"
            />
            <select v-model="editedBook.category" class="edit-input">
              <option disabled value="">Select Category</option>
              <option>Roman</option>
              <option>Science-Fiction</option>
              <option>Biographie</option>
              <option>Fantasy</option>
              <option>Historical</option>
              <option>Horror</option>
              <option>Thriller</option>
            </select>
            <input type="date" v-model="editedBook.date" class="edit-input" />
            <button class="file-btn" @click="uploadImage">
              Upload New Cover
            </button>
            <input
              type="file"
              ref="fileInput"
              class="hidden"
              @change="onFileChange"
              accept="image/*"
            />
          </template>
        </div>
      </div>

      <div class="actions">
        <button v-if="!isEditing" class="edit-btn" @click="isEditing = true">
          Edit
        </button>
        <button
          v-if="!isEditing"
          class="delete-btn"
          @click="confirmDelete = true"
        >
          Delete
        </button>
        <button v-if="isEditing" class="save-btn" @click="updateBook">
          Save
        </button>
        <button v-if="isEditing" class="cancel-btn" @click="cancelEdit">
          Cancel
        </button>
      </div>

      <div v-if="confirmDelete" class="modal">
        <div class="modal-content">
          <p>Are you sure you want to delete this book?</p>
          <div class="modal-actions">
            <button class="confirm-btn" @click="deleteBook">Yes</button>
            <button class="cancel-btn" @click="confirmDelete = false">
              No
            </button>
          </div>
        </div>
      </div>

      <div v-if="toastVisible" class="toast">
        <p>{{ toastMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Book",
  data() {
    return {
      id: parseInt(this.$route.params.id),
      books: localStorage.getItem("books")
        ? JSON.parse(localStorage.getItem("books"))
        : [],
      book: null,
      isEditing: false,
      confirmDelete: false,
      toastVisible: false,
      toastMessage: "",
      editedBook: {
        title: "",
        author: "",
        category: "",
        date: "",
        img: "",
      },
    };
  },
  methods: {
    showToast(message) {
      this.toastMessage = message;
      this.toastVisible = true;
      setTimeout(() => {
        this.toastVisible = false;
      }, 3000);
    },
    cancelEdit() {
      this.isEditing = false;
      this.editedBook = { ...this.book };
    },
    updateBook() {
      if (
        !this.editedBook.title ||
        !this.editedBook.author ||
        !this.editedBook.category ||
        !this.editedBook.date
      ) {
        this.showToast("All fields must be filled.");
        return;
      }
      this.books = this.books.filter((item) => item.id !== this.id);
      this.books = [...this.books, this.editedBook];

      localStorage.setItem("books", JSON.stringify(this.books));
      this.book = { ...this.editedBook };
      this.isEditing = false;
      this.showToast("Book updated successfully.");
    },
    deleteBook() {
      this.books = this.books.filter((item) => item.id !== this.id);
      localStorage.setItem("books", JSON.stringify(this.books));
      this.confirmDelete = false;
      this.showToast("Book deleted successfully.");
      this.$router.push("/");
    },
    uploadImage() {
      this.$refs.fileInput.click();
    },
    onFileChange(event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.editedBook.img = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        this.showToast("Please upload a valid image file.");
      }
    },
  },
  mounted() {
    this.book = this.books.find((item) => item.id === this.id) || null;
    if (this.book) {
      this.editedBook = { ...this.book };
    }
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap");

.book-page {
  max-width: 800px;
  margin: 50px auto;
  font-family: "Roboto", sans-serif;
  color: #333;
  position: relative;
}

.book-card {
  display: flex;
  align-items: center;
  padding: 20px;
  gap: 20px;
  background: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-bottom: 20px;
}

.book-cover {
  height: 100%;
  width: 250px;
  object-fit: cover;
  border-radius: 4px;
}

.edit-input:not(select) {
  width: calc(100% - 20px);
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.edit-input:not(input) {
  width: calc(100%);
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.edit-btn,
.save-btn,
.cancel-btn,
.confirm-btn,
.delete-btn,
.file-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.edit-btn {
  background: #4caf50;
  color: white;
}

.edit-btn:hover {
  background: #45a049;
}

.save-btn {
  background: #2196f3;
  color: white;
}

.save-btn:hover {
  background: #1e88e5;
}

.delete-btn {
  background: #f44336;
  color: white;
}

.delete-btn:hover {
  background: #d32f2f;
}

.file-btn {
  background: #444;
  color: white;
  margin-top: 10px;
}

.file-btn:hover {
  background: #222;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
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

.back-button {
  /* position: absolute; */
  top: 20px;
  left: 20px;
  text-decoration: none;
  color: black;
  font-size: 32px;
}

.icon {
  margin-right: 5px;
}

.hidden {
  display: none;
}

.actions {
  margin-top: 20px;
  display: flex;
  gap: 15px;
  justify-content: center;
}

.modal-actions {
  margin-top: 20px;
  display: flex;
  justify-content: space-evenly;
  gap: 10px;
}
</style>
