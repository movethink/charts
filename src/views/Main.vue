<template>
  <div>
    <h6>hello charts</h6>
    <Charts
      :options="echartsOptions"
      style="height: 400px; width: 750px;"
    ></Charts>
  </div>
</template>
<script>
import Charts from "../components/Charts";
export default {
  data() {
    return {
      echartsOptions: {},
    };
  },
  components: {
    Charts,
  },
  methods: {
    initEchartsOptions() {
      this.echartsOptions = {
        title: {
          text: "ECharts 入门示例",
        },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      };
    },
  },
  mounted() {
    this.initEchartsOptions();
  },
};
</script>

<style scoped>
h6 {
  color: red;
}
</style>
