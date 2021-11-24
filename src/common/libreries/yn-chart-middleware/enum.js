const chartsTypeMap = {
  barChart: "bar",
  pieChart: "pie",
  lineChart: "line",
  mixedLineAndBar: "bar",
  barWaterfallChart: "bar", // 步行图
  gaugeChart: "gauge",
  number: "number",
  mapChart: "map",
  horBarChart: "bar", // 水平柱图
  scatterChart: "scatter",
  bubbleChart: "scatter",
  ringChart: "pie",
  treeChart: "tree",
  radarChart: "radar", //雷达图
  verticalStackedBarChart: "bar", //堆叠柱图
  funnelChart: "funnel" //漏斗图
};

/**
 * 数据清除零值白名单
 */
const hideNullValueList = ["bar", "line", "pie"];

export { chartsTypeMap, hideNullValueList };
