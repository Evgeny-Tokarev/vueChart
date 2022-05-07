<template>
  <div id="menu">
    <nav class="navbar">
      <router-link class="navbar__link" to="/Information"
        >Information</router-link
      >
      <router-link class="navbar__link" to="/">Registration</router-link>
      <router-link class="navbar__link" to="/Subscribers"
        >Subscribers</router-link
      >
    </nav>
    <LocaleSwitcher />
  </div>

  <!-- <button @click="$i18n.locale = 'ja'">change language</button> -->
  <router-view></router-view>
</template>

<script setup lang="ts">
import LocaleSwitcher from "@/views/LocaleSwitcher.vue";
import { reactive } from "vue";

const state = reactive({
  group: {},
});
</script>

<style lang="scss" scoped>
#menu {
  display: flex;
  justify-content: space-evenly;
  align-items: stretch;
  background-color: rgb(233, 233, 233);
  .navbar {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    &__link {
      text-decoration: none;
      color: black;
    }
    &__link:hover {
      background-color: #ccc;
    }
    &__link:active {
      background-color: black;
      color: white;
    }
  }
}
</style>
