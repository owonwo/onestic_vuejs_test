<template>
  <div class="header">
    <div class="header__wrapper">
      <ul class="header__navigation">
        <li class="header__navigation-item">
          <router-link to="/" class="header__navigation-item-link"
            >Home</router-link
          >
        </li>
        <li class="header__navigation-item">
          <router-link to="/meals" class="header__navigation-item-link"
            >Carbonara Meals Calculator</router-link
          >
        </li>
        <li class="header__navigation-item">
          <router-link to="/restaurants" class="header__navigation-item-link"
            >Our Restaurants</router-link
          >
        </li>
      </ul>
      <button class="theme-toggler" @click="toggleTheme">
        <span><SunIcon /></span>
        <span><MoonIcon /></span>
      </button>
    </div>
  </div>
</template>
<style lang="scss">
@import "./Header.scss";
</style>
<script>
import { SunIcon, MoonIcon } from "vue-feather-icons";

export default {
  name: "Header",
  components: { SunIcon, MoonIcon },
  methods: {
    toggleTheme() {
      this.$parent.$el.classList.toggle("theme-dark");
    },
  },
};
</script>
