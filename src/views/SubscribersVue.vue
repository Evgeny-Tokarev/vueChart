<script lang="ts" setup>
import * as Highcharts from "highcharts";
import { onMounted, reactive, onBeforeUnmount, watch, computed } from "vue";
import { useStore } from "@/stores/store";
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();

interface State {
  [key: string]: any;
}
const group = useStore();
const state: State = reactive({
  isUpdated: false,
  subscribersText: computed(() => t("chart.subs")),
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
              y = group.getSubscribersCount;
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
        text: state.subscribersText,
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
                plotOptions: {
                series: {
                    animation: false
                }
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
              y: group.getSubscribersCount,
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
  interval = window.setInterval(() => {
    if (group.getGroupName && group.getSubscribersCount) {
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
      group.getSubscribersCount - 5,
      group.getSubscribersCount + 5
    );
  }
);
watch(
  () => group.getSubscribersCount,
  () => {
    if (!!state.chart) {
      state.chart.yAxis[0].setExtremes(
        group.getSubscribersCount - 5,
        group.getSubscribersCount + 5
      );
    }
  }
);
watch(
  () => locale.value,
  () => {
    state.chart.yAxis[0].setTitle({ text: state.subscribersText });
  }
);
</script>

<template>
  <div class="group">
    <h2 class="group__name" v-if="group.getGroupName">
      {{ group.getGroupName }}
    </h2>
    <img
      class="group__image"
      :src="group.getGroupAvatar"
      alt="avatar"
      width="50"
      height="50"
      v-if="group.getGroupAvatar && group.getGroupAvatar.length"
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
  color: white;
  * {
    caret-color: transparent;
  }
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
