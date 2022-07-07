<template>
  <div class="locale">
    <span class="locale__description locale__description_type_ru">Ру</span>
    <label class="locale__switcher">
      <input type="checkbox" @click="togleLanguage" checked />
      <span class="locale__checkbox"></span>
    </label>
    <span class="locale__description locale__description_type_en">En</span>
  </div>
</template>
<script lang="ts" setup>
import { useI18n } from "vue-i18n";
const { locale } = useI18n();

function togleLanguage(e: MouseEvent) {
  const target = e.target as HTMLInputElement;
  locale.value = target.checked ? "en" : "ru";
}
</script>
<style lang="scss" scoped>
.locale {
  position: relative;
  width: 100px;
  display: flex;
  align-items: center;
  * {
    caret-color: transparent;
  }
  .locale__description {
    position: absolute;
    top: 50%;
    color: black;
    transform: translateY(-50%);
  }
  .locale__description_type_ru {
    left: -10px;
  }
  .locale__description_type_en {
    right: 10px;
  }
  &__switcher {
    position: relative;
    cursor: pointer;
    input {
      height: 20px;
      left: 20px;
      top: -9px;
      width: 40px;
      position: absolute;
      opacity: 0;
      caret-color: transparent;
    }
    input + .locale__checkbox {
      position: absolute;
      left: 20px;
      top: -9px;
      height: 20px;
      width: 40px;
      transition: all 0.5s;
      border: 1px solid black;
      border-radius: 10px;
    }
    input + .locale__checkbox:after {
      content: "";
      position: absolute;
      left: 3px;
      top: 3px;
      height: 12px;
      width: 12px;
      border-radius: 50%;
      background: black;
      transition: all 0.2s;
    }
    input:checked + .locale__checkbox:after {
      transform: translateX(20px);
    }
  }
}
</style>
