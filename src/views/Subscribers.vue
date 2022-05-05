<script lang="ts" setup>
import * as Highcharts from "highcharts";
import { onMounted, reactive, onBeforeUnmount, watch } from "vue";
import makeRequest from "@/components/vkRequests";

interface State {
  [key: string]: any;
}
const state: State = reactive({
  group: {},
  subscribersCount: 0,
  isUpdated: false,
  avatarUrl: "",
  groupName: "",
});
function graph() {
  state.chart = Highcharts.chart({
    chart: {
      renderTo: "graph",
      type: "spline",
      marginRight: 10,
      events: {
        load: function () {
          var series = this.series[0];
          setInterval(function () {
            var x = new Date().getTime(),
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
      text: "",
    },

    xAxis: {
      type: "datetime",
      tickPixelInterval: 50,
    },

    yAxis: {
      title: {
        text: "Subscribers",
      },
      tickInterval: 1,
    },

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
  let tries = 0;
  interval = window.setInterval(() => setsubscribersCount(), 1000);
  function setsubscribersCount() {
    makeRequest().then((groups) => {
      if (groups && groups.response) {
        const group = groups.response[0];
        state.subscribersCount = group.members_count;
        state.avatarUrl = group.photo_200;
        state.groupName = group.name;
        state.isUpdated = true;
      } else {
        tries++;
        if (tries > 10) {
          window.clearInterval(interval);
        }
      }
    });
  }
});

watch(
  () => state.isUpdated,
  () => {
    graph();
    state.chart.yAxis[0].setExtremes(
      state.subscribersCount - 10,
      state.subscribersCount + 10
    );
  }
);
watch(
  () => state.subscribersCount,
  () => {
    if (!!state.chart) {
      state.chart.yAxis[0].setExtremes(
        state.subscribersCount - 10,
        state.subscribersCount + 10
      );
    }
  }
);
onBeforeUnmount(() => {
  window.clearInterval(interval);
});
</script>

<template>
  <div class="group">
    <h2 class="group__name">{{ state.groupName || "Group" }}</h2>
    <img
      class="group__image"
      :src="state.avatarUrl"
      alt="avatar"
      width="200"
      height="200"
      v-if="state.avatarUrl.length"
    />
    <img
      class="group__image"
      v-else
      src="@/assets/images/group-image.svg"
      alt="avatar"
      width="200"
      height="200"
    />
    <div id="graph"></div>
    <div class="locale">{{ $t("hello") }}</div>
    <button @click="$i18n.locale = 'ja'">change language</button>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/base.css";

.group {
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  gap: 2rem;
  padding: 1rem;
  #graph {
    width: 90%;
  }
}
</style>
