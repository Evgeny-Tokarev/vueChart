<script lang="ts" setup>
import * as Highcharts from "highcharts";
import { onMounted, reactive, onBeforeUnmount, watch } from "vue";
import makeRequest from "@/components/vkRequests";

const state = reactive({
  group: {},
  subscribersCount: 0,
});
function graph() {
  Highcharts.chart({
    chart: {
      renderTo: "graph",
      type: "spline",
      marginRight: 10,
      events: {
        load: function () {
          // set up the updating of the chart each second
          var series = this.series[0];
          setInterval(function () {
            var x = new Date().getTime(), // current time
              y = state.subscribersCount;
            series.addPoint([x, y], true, true);
          }, 1000);
        },
      },
    },

    time: {
      useUTC: false,
    },

    title: {
      text: `Subscribers in the group ${state.subscribersCount}`,
    },

    xAxis: {
      type: "datetime",
      tickPixelInterval: 150,
    },

    yAxis: {
      // max: state.subscribersCount + 100,
      // min: state.subscribersCount - 100,
      title: {
        text: "Subscribers",
      },
      plotLines: [
        {
          value: 0,
          width: 1,
          color: "#808080",
        },
      ],
    },

    // tooltip: {
    //   headerFormat: "<b>{series.name}</b><br/>",
    //   pointFormat: "{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}",
    // },

    legend: {
      enabled: false,
    },

    exporting: {
      enabled: false,
    },

    series: [
      {
        name: "Subscribers",
        type: "spline",
        data: (function () {
          var data = [],
            time = new Date().getTime(),
            i;

          for (i = -19; i <= 0; i += 1) {
            data.push({
              x: time + i * 1000,
              y: state.subscribersCount,
            });
          }
          return data;
        })(),
      },
    ],
  });
}
let interval: number;
onMounted(() => {
  interval = window.setInterval(() => setsubscribersCount(), 1000);
  function setsubscribersCount() {
    makeRequest().then((group) => {
      state.subscribersCount = group?.response.count || 0;
    });
  }
  graph();
});
// watch(
//   () => state.subscribersCount,
//   () => {
//     graph();
//   }
// );
onBeforeUnmount(() => {
  window.clearInterval(interval);
});
</script>

<template>
  <div id="graph"></div>
  <div class="locale">{{ $t("hello") }}</div>
  <button @click="$i18n.locale = 'ja'">change language</button>
  <div class="header">
    <h3>{{ state.group }}</h3>
  </div>
</template>

<style lang="scss" scoped>
/* @import "@/assets/base.css"; */
</style>
