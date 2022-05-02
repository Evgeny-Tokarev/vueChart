<template>
  <input v-model="state.message1" placeholder="Enter group Id" />
  <input v-model="state.message2" placeholder="Enter accesse key" />
  <button @click="submitHandler">search</button>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
const state = reactive({
  message1: "",
  message2: "",
});

function submitHandler() {
  console.log(state.message1, state.message2);
}
</script>
<style lang="scss" scoped></style>
