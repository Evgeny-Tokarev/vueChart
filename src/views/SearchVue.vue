<template>
  <form class="groupForm" @submit="submitHandler">
    <input class="groupForm__input" ref="input1" v-model="state.groupID" :placeholder="$t('input.id')" required />
    <input class="groupForm__input" v-model="state.accesseKey" :placeholder="$t('input.key')" />
    <Button class="groupForm__button custom-button_type_elevated" @click="submitHandler">
      {{ $t("button.search") }}
    </Button>
  </form>
  <p class="utility-text" v-if="state.isFailed">{{ $t("utility.findFail") }}</p>
</template>
<script lang="ts" setup>
import Button from "@/components/reusable/Button.vue"
import { onActivated, reactive, ref } from "vue";
import { useStore } from "@/stores/store";

const store = useStore();
const input1 = ref<HTMLInputElement | null>(null)

const state = reactive({
  groupID: "",
  accesseKey: "",
  isFailed: false,
});
store.$subscribe(
  (mutation) => {
    if (checkMutationNewValue(mutation)) store.currentTab = "/"
    else if (!!store.getGroupName && store.currentTab === "/") {
      state.isFailed = false;
      state.groupID = ""
      state.accesseKey = ""
      store.currentTab = "subscribers"
    } else if (store.currentTab === "/") {
      state.isFailed = true;
      setTimeout(() => {
        state.isFailed = false;
      }, 3000);
    }
  },
  { deep: true }
);

function checkMutationNewValue(mutation: any) {
  return ((Array.isArray(mutation.events) && mutation.events.some((e: any) => e.newValue === "/")
    || (!Array.isArray(mutation.events) && mutation.events.newValue === "/")))
}

function submitHandler() {
  if (!!state.groupID) {
    store.setGroup(state.groupID, state.accesseKey);
  }
}

onActivated(() => {
  input1.value?.focus()
})
</script>
<style lang="scss" scoped>
.groupForm {
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  width: 80%;
  align-items: center;


  &__input {
    margin: 1rem;
    width: 80%;
    height: 2rem;
    padding: 0 1rem;
    border: 1px solid black;
    border-radius: 3px;
  }

  &__button {
    background: rgb(200, 221, 210);
    caret-color: transparent;

  }
}

.utility-text {
  color: rgb(216, 90, 40);
  text-align: center;
}
</style>
