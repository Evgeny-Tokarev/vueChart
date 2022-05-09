<template>
  <form class="groupForm" @submit="submitHandler">
    <input
      class="groupForm__input"
      v-model="state.groupID"
      placeholder="Enter group Id"
      required
    />
    <input
      class="groupForm__input"
      v-model="state.accesseKey"
      placeholder="Enter accesse key"
      required
    />
    <button class="groupForm__button" type="submit">search</button>
  </form>
  <p class="utility-text" v-if="state.isFailed">Не удалось найти группу</p>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import { useStore } from "@/stores/store";
import router from "@/router/index";

const store = useStore();
const state = reactive({
  groupID: "",
  accesseKey: "",
  isFailed: false,
});
store.$subscribe(
  () => {
    console.log(store.getGroupName);
    console.log(!!store.getGroupName);
    if (!!store.getGroupName) {
      console.log("redirect");
      router.push("/subscribers");
    } else {
      state.isFailed = true;
      setTimeout(() => {
        state.isFailed = false;
      }, 3000);
    }
  },
  { deep: true }
);

function submitHandler(event: Event) {
  event.preventDefault();
  console.log("submit");
  if (!!state.groupID && !!state.accesseKey) {
    store.setGroup(state.groupID, state.accesseKey);
  }
}
</script>
<style lang="scss" scoped>
.groupForm {
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  width: 80%;
  align-items: center;
  * {
    margin-top: 1rem;
  }
  &__input {
    width: 80%;
    height: 2rem;
  }
  &__button {
    width: 5rem;
    height: 2rem;
    border: 1px solid black;
    border-radius: 3px;
    cursor: pointer;
    color: black;
    &:hover {
      background-color: #ccc;
    }
    &:active {
      background-color: black;
      color: white;
    }
  }
}
.utility-text {
  text-align: center;
}
</style>
