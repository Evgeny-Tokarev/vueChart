<template>
  <form class="groupForm" @submit="submitHandler">
    <input class="groupForm__input" v-model="state.groupID" :placeholder="state.inputIdText" required />
    <input class="groupForm__input" v-model="state.accesseKey" :placeholder="state.inputKeyText" />
    <Button class="groupForm__button custom-button_type_elevated" @click="submitHandler">
      {{ state.buttonText }}
    </Button>
  </form>
  <p class="utility-text" v-if="state.isFailed">{{ state.utilityText }}</p>
</template>
<script lang="ts" setup>
import Button from "@/components/reusable/Button.vue"
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

function submitHandler() {
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
