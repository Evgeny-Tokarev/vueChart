<script lang="ts" setup>
import * as Highcharts from "highcharts";
import { onMounted } from "vue";

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
});
</script>

<template>
  <div id="nav">
    <router-link to="/Information">Information</router-link> |
    <router-link to="/Registration">Registration</router-link> |
    <router-link to="/Subscribers">Subscribers</router-link>
  </div>
  <div id="graph"></div>
  <div class="locale">{{ $t("hello") }}</div>
  <button @click="$i18n.locale = 'ja'">change language</button>
</template>

<style lang="scss" scoped>
/* @import "@/assets/base.css"; */
</style>
