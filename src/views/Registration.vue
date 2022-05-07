<template>
  <input v-model="state.groupID" placeholder="Enter group Id" />
  <input v-model="state.accesseKey" placeholder="Enter accesse key" />
  <button @click="submitHandler">search</button>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import { useStore } from "@/stores/store";
import router from "@/router/index";

const group = useStore();
const state = reactive({
  groupID: "",
  accesseKey: "",
});
group.$subscribe(
  () => {
    console.log(group.group);
    router.push("/Subscribers");
  },
  { deep: true }
);

function submitHandler() {
  if (!!state.groupID) {
    console.log(state.groupID, state.accesseKey);
    group.setGroup(state.groupID);
  }
}
</script>
<style lang="scss" scoped></style>
