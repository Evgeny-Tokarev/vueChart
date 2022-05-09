<script lang="ts" setup>
import { useStore } from "@/stores/store";
import { reactive } from "vue";

const store = useStore();
const state = reactive({});
</script>

<template>
  <div class="info">
    <h2 class="info__title">{{ store.getGroupName }}</h2>
    <a :href="store.getGroupUrl" target="_blank">
      <img
        class="info__image"
        :src="store.getGroupAvatar"
        alt="avatar"
        width="200"
        height="200"
        v-if="store.getGroupAvatar && store.getGroupAvatar.length"
      />
      <img
        class="info__image"
        v-else
        src="@/assets/images/group-image.svg"
        alt="avatar"
        width="100"
        height="100"
      />
    </a>
    <div class="info__subscribers" v-if="store.getSubscribersCount">
      {{ store.getSubscribersCount }} members in the group
    </div>
    <div class="info__isClosed" v-if="store.getGroupIsClosed">
      {{ store.getGroupIsClosed ? "The group is Closed" : "The group is Open" }}
    </div>
    <div class="info__description">{{ store.getGroupDescription }}</div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/base.css";
.info {
  padding: 2rem;
  text-align: center;
  * {
    margin: 1rem;
  }
  &__image {
    box-shadow: 0px 10px 20px 0px rgba(31, 32, 65, 0.2);
  }
  &__description {
    text-align: justify;
  }
}
</style>
