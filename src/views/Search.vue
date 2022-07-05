<template>
  <form class="groupForm" @submit="submitHandler">
    <input
      class="groupForm__input"
      v-model="state.groupID"
      :placeholder="state.inputIdText"
      required
    />
    <input
      class="groupForm__input"
      v-model="state.accesseKey"
      :placeholder="state.inputKeyText"
    />
    <button class="groupForm__button" type="submit">
      {{ state.buttonText }}
    </button>
  </form>
  <p class="utility-text" v-if="state.isFailed">{{ state.utilityText }}</p>
</template>
<script lang="ts" setup>
import { reactive, computed } from "vue";
import { useStore } from "@/stores/store";
import router from "@/router/index";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const store = useStore();
const state = reactive({
  groupID: "",
  accesseKey: "",
  isFailed: false,
  buttonText: computed(() => t("button.search")),
  inputIdText: computed(() => t("input.id")),
  inputKeyText: computed(() => t("input.key")),
  utilityText: computed(() => t("utility.findFail")),
});
store.$subscribe(
  () => {
    if (!!store.getGroupName) {
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
  if (!!state.groupID) {
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
    padding: 0 1rem;
    border: 1px solid black;
    border-radius: 3px;
  }
  &__button {
    caret-color: transparent;
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
  color: rgb(216, 90, 40);
  text-align: center;
}
</style>
