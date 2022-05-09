<script lang="ts" setup>
import * as Highcharts from "highcharts";
import { onMounted, reactive, onBeforeUnmount, watch } from "vue";
import { useStore } from "@/stores/store";

interface State {
  [key: string]: any;
}
const group = useStore();
const state: State = reactive({
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
    accessibility: {
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
  interval = window.setInterval(() => {
    state.subscribersCount = group.getSubscribersCount || 0;
    if (state.subscribersCount) {
      state.avatarUrl = group.getGroupAvatar;
      state.groupName = group.getGroupName;
      state.isUpdated = true;
    } else {
      clearInterval(interval);
    }
  }, 1000);
});
watch(
  () => state.isUpdated,
  () => {
    graph();
    state.chart.yAxis[0].setExtremes(
      state.subscribersCount - 5,
      state.subscribersCount + 5
    );
  }
);
watch(
  () => state.subscribersCount,
  () => {
    if (!!state.chart) {
      state.chart.yAxis[0].setExtremes(
        state.subscribersCount - 5,
        state.subscribersCount + 5
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
    <h2 class="group__name" v-if="state.groupName">
      {{ state.groupName || "Group" }}
    </h2>
    <img
      class="group__image"
      :src="state.avatarUrl"
      alt="avatar"
      width="50"
      height="50"
      v-if="state.avatarUrl.length"
    />
    <img
      class="group__image"
      v-else
      src="@/assets/images/group-image.svg"
      alt="avatar"
      width="100"
      height="100"
    />
    <div id="graph"></div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/base.css";

.group {
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  #graph {
    width: 90%;
  }
  &__image {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    box-shadow: 0px 10px 20px 0px rgba(31, 32, 65, 0.2);
  }
}
</style>
