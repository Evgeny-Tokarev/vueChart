<template>
    <button class="custom-button" ref="button" @click="clickHandler">
        <slot> {{ props.buttonText }}</slot>
    </button>
</template>
<script lang="ts" setup>
import { ref, reactive, computed } from "vue";
import { State } from "@/components/models";

const button = ref<HTMLButtonElement | null>(null);
defineExpose({ button });

interface Props {
    buttonText?: string;
}

const emit = defineEmits<{
    (e: "click", target: HTMLButtonElement): void

}>();
const props = defineProps<Props>();
const state: State = reactive({});

function clickHandler(e: MouseEvent | TouchEvent) {
    e.preventDefault();
    const target = e.target as HTMLButtonElement;
    emit("click", target);
}
</script>
<style lang="scss" scoped>
@import "@/assets/style/base.scss";

.custom-button {
    display: flex;
    justify-content: center;
    cursor: pointer;
    @include text-700-16-100;
    padding: 16px 32px;
    border-radius: 10px;
    border: 0;
    text-align: center;
    margin: 0;
    outline: none;
}

.custom-button_type_transparent {
    color: gray;
    border: 1px solid gray;
    background-color: transparent;
}

.custom-button_type_filled {
    color: #FFFFFF;
    border: 1px solid gray;
    background-color: gray;
}

.custom-button:active {
    box-shadow: inset 1px 1px 10px #333;
}

.custom-button_type_elevated {
    position: relative;
    transition: all 0.2s;
}

.custom-button_type_elevated::after {
    content: '';
    position: absolute;
    width: 80%;
    height: 70%;
    left: 15%;
    bottom: -10px;
    z-index: -1;
    background: black;
    opacity: 0.7;
    filter: blur(9px);
    border-radius: 10px;
    transition: all 0.2s;

}

.custom-button_type_elevated:active::after {
    bottom: 0;
    transition: all 0.2s;
}

.custom-button_type_elevated:active {
    box-shadow: none;
    margin-top: 3px;
    margin-bottom: -3px;
    transition: all 0.2s;
}

@media screen and (min-width: 600px) {
    .custom-button_type_transparent {
        color: #FFFFFF;
    }
}
</style>
  