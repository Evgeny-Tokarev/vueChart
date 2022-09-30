<template>
  <form class="groupForm" @submit="submitHandler">
    <div class="input-wrapper">
      <input class="groupForm__input" ref="input1" v-model="state.groupID" :placeholder="$t('input.id')" required />
      <div class="focus-helper"></div>
    </div>
    <div class="input-wrapper">
      <input class="groupForm__input" v-model="state.accesseKey" :placeholder="$t('input.key')" />
      <div class="focus-helper"></div>
    </div>
    <Button class="groupForm__button custom-button_type_elevated" @click="submitHandler">
      {{ $t("button.search") }}
    </Button>
  </form>
  <p class="utility-text" v-if="store.hasFailed">{{ $t("utility.findFail") }}</p>
</template>
<script lang="ts" setup>
import Button from "@/components/reusable/Button.vue"
import { onActivated, reactive, ref } from "vue";
import { useStore } from "@/stores/store";

const store = useStore();
const input1 = ref<HTMLInputElement | null>(null)

const state = reactive({
  groupID: "",
  accesseKey: ""
});


async function submitHandler() {
  if (!!state.groupID) {
    if (await store.setGroup(state.groupID, state.accesseKey) && input1.value) {
      input1.value.value = ""
    }
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

  .input-wrapper {
    position: relative;
    display: flex;
    margin: 1rem;
  }

  &__input {
    width: 250px;
    height: 2rem;
    padding: 0 1rem;
    outline: none;
    border: 0;
    border-radius: 3px;
  }

  &__input:focus {
    margin-top: -3px;
    margin-bottom: 3px;
  }

  &__input:focus+.focus-helper {
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
    transition: all 0.2s
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
