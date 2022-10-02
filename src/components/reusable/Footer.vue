<template>
    <div class="footer">
        <h2>{{ $t("footer.title")}}</h2>
        <a href="https://github.com/Evgeny-Tokarev/vueChart" target="_blank">{{$t("footer.repository_link")}}</a>
    </div>
</template>
<script lang="ts" setup>
import { useStore } from "@/stores/store"

const store = useStore()
</script>
<style lang="scss" scoped>
@import "@/assets/style/base.scss";

.footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    color: var(--text-color);
    padding: 1rem 0;
    background-color: var(--primary);
    gap: 1rem;

    h2 {
        @include text-700-20-100;
    }

    a {
        text-decoration: none;
        color: var(--text-color);
        border: 1px solid var(--text-color);
        padding: 3px 5px;
        border-radius: 10px;
    }
}
</style>