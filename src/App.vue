<template>
  <div class="wrapper" :class="state.wrapperClass">
    <div class="menu">
      <Button v-if="width < 800 && store.hasGroup && !state.showMenu" class="custom-button_type_elevated burger-button"
        @click="state.showMenu = true">
        <div class="burger-icon"></div>
      </Button>
      <nav v-if="store.hasGroup" class="navbar" :class="state.showMenu ? '': 'navbar_hidden'">
        <Button class="custom-button_type_elevated menu-button" :button-text="$t('button.info')"
          @click="goToPage('information')" />
        <Button class="custom-button_type_elevated menu-button" :button-text="$t('button.subs')"
          @click="goToPage('subscribers')" />
        <Button class="custom-button_type_elevated menu-button" :button-text="$t('button.reg')"
          @click="goToPage('/')" />
      </nav>
      <LocaleSwitcher class="locale-switcher" />
    </div>
    <KeepAlive>
      <component :is="tabs[store.currentTab]" />
    </KeepAlive>

  </div>
</template>

<script setup lang="ts">
import LocaleSwitcher from "@/views/LocaleSwitcher.vue";
import Information from "@/views/InformationVue.vue";
import Search from "@/views/SearchVue.vue";
import Subscribers from "@/views/SubscribersVue.vue";
import Button from "@/components/reusable/Button.vue"
import { reactive, computed } from "vue";
import type { Component } from 'vue'
import { useStore } from '@/stores/store'
import { useI18n } from "vue-i18n"
import { getWidth } from "@/composables/resizeController"

const { t } = useI18n();
const store = useStore();
const width = getWidth();
const tabs = {
  "/": Search,
  "information": Information,
  "subscribers": Subscribers
} as { [path: string]: Component }

const state = reactive({
  showMenu: false,
  wrapperClass: computed(() => (store.currentTab === "subscribers" || store.currentTab === "information") ? "wrapper_dark" : "")
});
function goToPage(page: string) {
  store.currentTab = page;
  state.showMenu = false;
}

</script>

<style lang="scss" scoped>
.wrapper_dark {
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 68.7%);
}

.menu {
  display: flex;
  justify-content: space-between;
  padding: 0 2.5%;
  align-items: stretch;
  min-height: 5rem;
  background-color: rgb(200, 221, 210);
  position: relative;
  z-index: 0;

  .navbar {
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }

  .navbar_hidden {
    display: none;
  }

  .menu-button {
    background: #FFF;
    caret-color: transparent;
  }

  .burger-button {
    align-self: center;
  }

  .burger-icon {
    position: relative;
    width: 30px;
    height: 20px;
    border-top: 2px solid black;
    border-bottom: 2px solid black;
  }

  .burger-icon::before {
    position: absolute;
    content: "";
    left: 0;
    right: 0;
    top: calc(50% - 1px);
    height: 2px;
    background-color: black;
  }

  .locale-switcher {
    margin-left: auto;
  }

  @media screen and (min-width: 800px) {
    padding: 0 10%;

    .navbar {
      position: static;
      flex-direction: row;
    }

    .navbar_hidden {
      display: flex;
    }
  }
}
</style>
