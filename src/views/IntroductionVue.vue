<template>
    <div class="introduction container">
        <h1>{{$t("introduction.title")}}</h1>
        <Button class="custom-button_type_elevated introduction-button" :button-text="$t('introduction.button')"
            @click="store.currentTab='/'" />
    </div>
</template>
<script lang="ts" setup>
import Button from "@/components/reusable/Button.vue"
import { useStore } from "@/stores/store"

const store = useStore()
</script>
<style lang="scss" scoped>
@import "@/assets/style/base.scss";

.introduction {
    color: var(--text-color);
    padding-top: 5rem;

    &-button {
        color: var(--text-color);
        background: var(--primary);
        caret-color: transparent;
    }
}
</style>