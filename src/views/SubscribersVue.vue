<template>
  <div class="group container">
    <h1 class="group__name" v-if="store.getGroupName">
      {{ store.getGroupName }}
    </h1>
    <img class="group__image" :src="store.getGroupAvatar" alt="avatar" width="50" height="50"
      v-if="store.getGroupAvatar && store.getGroupAvatar.length" />
    <img class="group__image" v-else src="@/assets/images/group-image.svg" alt="avatar" width="100" height="100" />
    <div id="graph"></div>
  </div>
</template>

<script lang="ts" setup>
import * as Highcharts from "highcharts";
import { onMounted, reactive, watch, computed, onActivated, onDeactivated } from "vue";
import { useStore } from "@/stores/store";
import { useI18n } from "vue-i18n";
import { getWidth } from "@/composables/resizeController"

const width = getWidth();
const { t, locale } = useI18n();


interface State {
  [key: string]: any;
}
const store = useStore();
const state: State = reactive({
  isUpdated: false,
  subscribersText: computed(() => t("chart.subs")),
  chart: null
});
const graph = function () {
  state.chart = Highcharts.chart({
    chart: {
      backgroundColor: 'transparent',
      spacingLeft: 0,
      marginRight: 5,
      renderTo: "graph",
      type: "spline",
      events: {
        load: function () {
          const series = this.series[0];
          setInterval(() => {
            var x = new Date().getTime(),
              y = store.getSubscribersCount;
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
      labels: {
        style: {
          color: '#FFF',
          fontSize: width.value >= 800 ? '16px' : '12px'
        }
      }
    },

    yAxis: {
      title: {
        text: state.subscribersText,
        style: {
          color: '#FFF',
          fontSize: width.value >= 800 ? '18px' : '14px'
        }
      },
      labels: {
        style: {
          color: '#FFF',
          fontSize: width.value >= 800 ? '16px' : '12px'
        }
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
          const data = []
          let time = new Date().getTime(),
            i;

          for (i = width.value >= 800 ? -9 : -4; i <= 0; i += 1) {
            data.push({
              x: time + i * 1000,
              y: store.getSubscribersCount,
            });
          }
          return data;
        })(),
      },
    ]
  });
}

onMounted(() => {
  let interval: number;
  let counter = 0;
  interval = window.setInterval(() => {
    if (store.getGroupName && store.getSubscribersCount) {
      state.isUpdated = true;
    } else {
      counter++
      if (counter > 5) clearInterval(interval);
    }
  }, 1000);
});
onActivated(() => {
  state.deactivated = false
})
onDeactivated(() => {
  state.deactivated = true
})
watch(() => width.value,
  () => {
    if (!state.deactivated && state.chart) {
      state.chart.series[0].setData((function () {
        const data = []
        let time = new Date().getTime(),
          i;

        for (i = width.value >= 800 ? -9 : -4; i <= 0; i += 1) {
          data.push({
            x: time + i * 1000,
            y: store.getSubscribersCount,
          });
        }
        return data;
      })())
      state.chart.redraw();
    }
  })

watch(
  () => state.isUpdated,
  () => {
    if (state.isUpdated) {
      graph();
      state.chart.yAxis[0].setExtremes(
        store.getSubscribersCount - 5,
        store.getSubscribersCount + 5
      );
    }
  }
);
watch(
  () => store.getSubscribersCount,
  () => {
    if (state.chart) {
      state.chart.yAxis[0].setExtremes(
        store.getSubscribersCount - 5,
        store.getSubscribersCount + 5
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

<style lang="scss" scoped>
@import "@/assets/style/base.scss";

.group {
  color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  gap: 1rem;
  padding-top: 1rem;

  #graph {
    width: 100%;
  }

  &__image {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    box-shadow: 0px 10px 20px 0px rgba(31, 32, 65, 0.2);
  }
}
</style>
