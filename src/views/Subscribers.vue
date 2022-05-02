<script lang="ts" setup>
import * as Highcharts from "highcharts";
import { onMounted } from "vue";
import makeRequest from "@/components/vkRequests";

function graph() {
  const chart = Highcharts.chart({
    chart: {
      renderTo: "graph",
      type: "bar",
    },
    title: {
      text: "Fruit Consumption",
    },
    xAxis: {
      categories: ["Apples", "Bananas", "Oranges"],
    },
    yAxis: {
      title: {
        text: "Fruit eaten",
      },
    },
    series: [
      {
        name: "Jane",
        data: [1, 0, 4],
        type: "bar",
      },
      {
        name: "John",
        data: [5, 7, 3],
        type: "bar",
      },
    ],
  });
}
onMounted(() => {
  graph();
  makeRequest();
});
</script>

<template>
  <div id="graph"></div>
  <div class="locale">{{ $t("hello") }}</div>
  <button @click="$i18n.locale = 'ja'">change language</button>
</template>

<style lang="scss" scoped>
/* @import "@/assets/base.css"; */
</style>
