<template>
  <div class="wrapper" :class="state.wrapperClass">
    <div id="menu">
      <nav v-if="store.hasGroup" class="navbar">
        <router-link class="navbar__link" to="/">{{ state.reg }}</router-link>
        <router-link class="navbar__link" to="/information">{{
        state.info
        }}</router-link>
        <router-link class="navbar__link" to="/subscribers">{{
        state.subs
        }}</router-link>
      </nav>
      <LocaleSwitcher />
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import LocaleSwitcher from "@/views/LocaleSwitcher.vue";
import { reactive, computed, onMounted, ref } from "vue";
import { useStore } from '@/stores/store'
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router"

const route = useRoute()
const { t } = useI18n();
const store = useStore();
const state = reactive({
  info: computed(() => t("button.info")),
  subs: computed(() => t("button.subs")),
  reg: computed(() => t("button.reg")),
  wrapperClass: computed(() => (route.path === "/subscribers" || route.path === "/information") ? "wrapper_dark" : "")
});

</script>

<style lang="scss" scoped>
.wrapper_dark {
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 68.7%);
}

#menu {
  display: flex;
  justify-content: space-evenly;
  align-items: stretch;
  min-height: 4rem;
  background-color: rgb(200, 221, 210);

  .navbar {
    display: flex;
    gap: 1rem;
    padding: 1rem;

    .navbar__link {
      text-align: center;
      text-decoration: none;
      color: black;
      min-width: 7rem;
    }

    .navbar__link:hover {
      background-color: #ccc;
    }

    .navbar__link:active {
      background-color: black;
      color: white;
    }
  }
}
</style>
