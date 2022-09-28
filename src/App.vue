<template>
  <div class="wrapper" :class="state.wrapperClass">
    <div class="menu">
      <nav v-if="store.hasGroup" class="navbar">
        <Button class="custom-button_type_elevated menu-button" :button-text="$t('button.info')"
          @click="store.currentTab = 'information'" />
        <Button class="custom-button_type_elevated menu-button" :button-text="$t('button.subs')"
          @click="store.currentTab = 'subscribers'" />
        <Button class="custom-button_type_elevated menu-button" :button-text="$t('button.reg')"
          @click="store.currentTab = '/'" />
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
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const store = useStore();

const tabs = {
  "/": Search,
  "information": Information,
  "subscribers": Subscribers
} as { [path: string]: Component }

const state = reactive({
  wrapperClass: computed(() => (store.currentTab === "subscribers" || store.currentTab === "information") ? "wrapper_dark" : "")
});

</script>

<style lang="scss" scoped>
.wrapper_dark {
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 68.7%);
}

.menu {
  display: flex;
  justify-content: space-between;
  padding: 0 10%;
  align-items: stretch;
  min-height: 5rem;
  background-color: rgb(200, 221, 210);
  position: relative;
  z-index: 0;

  .navbar {
    display: flex;
    gap: 1rem;
    padding: 1rem;
  }

  .menu-button {
    background: #FFF;
    caret-color: transparent;
  }

  .locale-switcher {
    margin-left: auto;
  }
}
</style>
