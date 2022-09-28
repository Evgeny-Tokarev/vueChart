<template>
  <div class="wrapper" :class="state.wrapperClass">
    <div id="menu">
      <nav v-if="store.hasGroup" class="navbar">
        <Button :button-text="$t('button.info')" @click="store.currentTab = 'information'" />
        <Button :button-text="$t('button.subs')" @click="store.currentTab = 'subscribers'" />
        <Button :button-text="$t('button.reg')" @click="store.currentTab = '/'" />
      </nav>
      <LocaleSwitcher />
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
