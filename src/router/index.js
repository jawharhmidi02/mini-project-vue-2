import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import CreateBook from "../views/CreateBook.vue";
import Book from "../views/Book.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: { transition: "slide" },
    },
    {
      path: "/newbook",
      name: "newbook",
      component: CreateBook,
      meta: { transition: "fade" },
    },
    {
      path: "/book/:id",
      name: "book",
      component: Book,
      meta: { transition: "fade" },
    },
  ],
});

export default router;
