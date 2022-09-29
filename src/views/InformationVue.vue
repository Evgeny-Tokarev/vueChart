<template>
  <div class="info container">
    <h2 class="info__title">{{ store.getGroupName }}</h2>
    <a :href="store.getGroupUrl" target="_blank">
      <img class="info__image" :src="store.getGroupAvatar" alt="avatar" width="200" height="200"
        v-if="store.getGroupAvatar && store.getGroupAvatar.length" />
      <img class="info__image" v-else src="@/assets/images/group-image.svg" alt="avatar" width="200" height="200" />
    </a>
    <div class="info__subscribers" v-if="store.getSubscribersCount">
      {{ store.getSubscribersCount }} {{ $t("info.members", store.getSubscribersCount) }}
    </div>
    <div class="info__isClosed" v-if="store.getGroupIsClosed">
      {{
      store.getGroupIsClosed ? $t("info.closed") : $t("info.opened")
      }}
    </div>
    <div class="info__description">{{ store.getGroupDescription }}</div>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from "@/stores/store";

const store = useStore();

</script>

<style lang="scss" scoped>
@import "@/assets/style/base.scss";

.info {
  padding: 2rem 0;
  text-align: center;
  color: white;

  * {
    margin: 1rem auto;
  }


  &__image {
    border-radius: 10px;
    box-shadow: 0px 10px 20px 0px rgba(31, 32, 65, 0.2);
  }

  &__description {
    text-align: justify;
  }
}
</style>
