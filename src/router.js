import { createRouter, createWebHistory } from "vue-router";
import Login from "./pages/Login.vue";
import About from "./components/About.vue";
import HomePage from "./pages/HomePage.vue";
import { nextTick } from "vue";
import { useAuthStore } from "./store/authStore";
import MainLayout from "./components/layouts/MainLayout.vue";
import DefaultLayout from "./components/layouts/DefaultLayout.vue";
import NotFound from "./components/layouts/NotFound.vue";


const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "",
        component: HomePage,
      },
      {
        path: "about",
        component: About,
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/login",
    component: DefaultLayout,
    children: [
      {
        path: "",
        component: Login,
      },
    ],
  },
  {
    path: "/:catchAll(.*)", 
    component: NotFound, 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  nextTick(() => {
    if (to.path === "/login" && authStore.isLoggedIn) {
      next("/");
    } else if (to.meta.requiresAuth && !authStore.isLoggedIn) {
      localStorage.setItem('redirectUrl', to.path);
      next("/login");
    } else {
      next();
    }
  });
});

export default router;
