<template>
  <div class="wrapper" :class="state.wrapperClass">
    <Header />
    <KeepAlive>
      <component :is="tabs[store.currentTab]" />
    </KeepAlive>

  </div>
</template>

<script setup lang="ts">
import { reactive, computed, onMounted } from "vue";
import type { Component } from 'vue'
import Introduction from "@/views/IntroductionVue.vue";
import Information from "@/views/InformationVue.vue";
import Search from "@/views/SearchVue.vue";
import Subscribers from "@/views/SubscribersVue.vue";
import { useStore } from '@/stores/store'
import Header from "@/components/reusable/Header.vue"

const store = useStore();


const tabs = {
  "/": Search,
  "information": Information,
  "subscribers": Subscribers,
  "introduction": Introduction
} as { [path: string]: Component }
const state = reactive({
  wrapperClass: computed(() => store.currentTab === "/" ? "" : "wrapper_dark")
});
</script>

<style lang="scss" scoped>
.wrapper_dark {
  position: relative;
  background: var(--overlay-gradient);
  min-height: 100vh;
  z-index: 0;
}
</style>
