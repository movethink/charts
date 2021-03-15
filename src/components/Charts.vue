<template>
  <div>
    <div id="charts"></div>
  </div>
</template>
<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      message: "vue",
    };
  },
  props: ["options"],
  watch: {
    options: function(value) {
      this.initCharts(value);
    },
  },
  methods: {
    initCharts(options) {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("charts"));
      // 绘制图表
      myChart.setOption(options);
    },
  },
  mounted() {
    this.initCharts(this.options);
  },
};
</script>

<style scoped>
#charts {
  height: 100%;
  width: 100%;
}
</style>
