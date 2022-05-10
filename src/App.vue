<template>
  <div id="menu">
    <nav class="navbar">
      <router-link class="navbar__link" to="/Information">{{
        state.info
      }}</router-link>
      <router-link class="navbar__link" to="/">{{ state.reg }}</router-link>
      <router-link class="navbar__link" to="/Subscribers">{{
        state.subs
      }}</router-link>
    </nav>
    <LocaleSwitcher />
  </div>
  <router-view></router-view>
</template>

<script setup lang="ts">
import LocaleSwitcher from "@/views/LocaleSwitcher.vue";
import { reactive, computed } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const state = reactive({
  group: {},
  info: computed(() => t("button.info")),
  subs: computed(() => t("button.subs")),
  reg: computed(() => t("button.reg")),
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
