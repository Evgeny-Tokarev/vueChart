<template>
  <form class="groupForm" @submit="submitHandler">
    <div class="input-wrapper">
      <input class="groupForm__input" @focus="state.focused = true" @blur="state.focused = false" ref="input1"
        v-model="state.groupID" :placeholder="$t('input.id')" required />
      <div class="focus-helper"></div>
      <p class="tooltip" :class="state.showTooltip ? 'tooltip_shown' : ''" v-if="state.tooltipText">
        {{$t('input.tooltip')}}</p>
      <p class="utility-text" v-if="state.utilityText">{{ state.utilityText }}</p>
    </div>
    <Button class="groupForm__button custom-button_type_elevated" @click="submitHandler">
      {{ $t("button.search") }}
    </Button>

  </form>
</template>
<script lang="ts" setup>
import Button from "@/components/reusable/Button.vue"
import { onActivated, reactive, ref, watch } from "vue";
import { useStore } from "@/stores/store";
import { computed } from "@vue/reactivity";
import { useI18n } from "vue-i18n";
import { getWidth } from "@/composables/resizeController";
import { State } from "@/components/models"

const width = getWidth()
const { t } = useI18n()
const store = useStore();
const input1 = ref<HTMLInputElement | null>(null)

const state: State = reactive({
  groupID: "",
  accesseKey: "",
  focused: false,
  emptyError: false,
  showTooltip: computed(() => (state.focused && width.value < 800) || (width.value >= 800)),
  tooltipText: computed(() => {
    if (state.showTooltip) return t("input.tooltip")
    return null
  }),
  utilityText: computed(() => {
    if (store.hasFailed) return t("utility.noGroup")
    if (state.emptyError) return t("input.tooltip")
    return null
  })
});


async function submitHandler() {
  console.log(state.groupID)
  if (!!state.groupID) {
    if (await store.setGroup(state.groupID, state.accesseKey) && input1.value) {
      state.groupID = ""
    }
  } else {
    state.emptyError = true
    window.setTimeout(() => {
      state.emptyError = false
    }, 4000)
  }
}

onActivated(() => {
  input1.value?.focus()
  state.focused = true
})
</script>
<style lang="scss" scoped>
.groupForm {
  background: var(--overlay-gradient);
  background-size: cover;
  background-position-y: bottom;
  min-height: calc(100vh - 5rem);
  display: flex;
  margin: 0 auto;
  padding-top: 5rem;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  .input-wrapper {
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 1rem;
  }

  &__input {
    width: 250px;
    height: 3rem;
    padding: 0 1rem;
    outline: none;
    border: 0;
    border-radius: 3px;
    border: 1px solid var(--text-color);
    font-size: 16px;
  }

  &__input::placeholder {
    font-size: 16px;
  }

  &__input:focus {
    margin-top: -3px;
    margin-bottom: 3px;
  }

  &__input:focus+.focus-helper {
    position: absolute;
    width: 200px;
    height: 70%;
    left: 50%;
    transform: translateX(-50%);
    bottom: -10px;
    z-index: -1;
    background: var(--text-color);
    opacity: 0.7;
    filter: blur(9px);
    border-radius: 10px;
    transition: bottom 0.2s
  }

  .tooltip {
    position: absolute;
    top: -120%;
    color: var(--text-color);
    border: 1px solid var(--text-color);
    border-radius: 3px;
    background-color: var(--primary);
    padding: 0.5rem 1rem;
  }


  &__button {
    background: var(--primary);
    color: var(--text-color);
    caret-color: transparent;
  }

  .utility-text {
    position: absolute;
    bottom: -80%;
    color: var(--varning-text);
    font-size: 20px;
    font-weight: 700;
  }

  @media screen and (min-width: 800px) {
    &__input {
      font-size: 20px;
    }

    .tooltip {
      display: none;
    }

    &__input:hover~.tooltip {
      display: block;
    }

    &__input::placeholder {
      font-size: 20px;
    }
  }
}
</style>
