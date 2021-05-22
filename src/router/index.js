import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";

Vue.use(VueRouter);

const Meals = () => import(/* webpackChunkName: "meals" */ "@/views/Meals.vue");

const Restaurants = () =>
  import(/* webpackChunkName: "restaurants" */ "@/views/Restaurants.vue");

const ShowRecipeInfo = () =>
  import(/* webpackChunkName: "receipe-info" */ "@/views/ShowRecipeInfo.vue");

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/meals",
    name: "Meals",
    component: Meals,
  },
  {
    path: "/restaurants",
    name: "Restaurants",
    component: Restaurants,
  },
  {
    path: "/recipe-info",
    name: "RecipeInfo",
    component: ShowRecipeInfo,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
