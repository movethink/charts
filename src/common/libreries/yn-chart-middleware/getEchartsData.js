import { getSeries } from "./getSeries";
import { chartsTypeMap } from "./enum";
import { setScatterOptions } from "./setScatterOptions";
import { setTreeOptions } from "./setTreeOptions";
import { setHideNullValue } from "./hideNullValue";
import { setRadarOptions } from "./setRadarOptions";
import { formatFunnelChart } from "./setFunnelOptions";
import NP from "number-precision";

function getEchartsData(result, optionParams = {}) {
  let data = result.data;
  if (!data) {
    return result;
  }
  let type = chartsTypeMap[data.chartType];
  if (!type || !(data && data.xAxis && data.yAxis)) {
    return {
      type: "warning",
      text: "抱歉，暂不支持转化图形",
    };
  }
  let options = null;
  // 获取所有配置项
  let { hideNullValue, legendStrict } = optionParams;
  switch (type) {
    case "scatter":
      options = setScatterOptions(type, data);
      break;
    case "tree":
      options = setTreeOptions(type, data);
      break;
    case "radar":
      options = setRadarOptions(type, data);
      break;
    case "funnel":
      options = formatFunnelChart(type, data);
      break;
    default:
      options = setNormalOptions(type, data, legendStrict);
      break;
  }
  options = setHideNullValue(options, hideNullValue);
  console.log(options, "options");
  return options;
}

/**
 * 处理一般图的options
 * @param {*} type
 * @param {*} resultData
 */
const setNormalOptions = (type, resultData, legendStrict) => {
  const { flag, message } = checkCharts(type, resultData);
  if (!flag) {
    return message;
  }
  //lineBar--柱状、折线、混合  pie--饼图  gauge--仪表盘
  let data = JSON.parse(JSON.stringify(resultData));
  if (data.xAxis.dim.length === 0) {
    // 这里已经判断必定存在yAxis
    data = repairXAxis(data);
  }
  let legend = data.legend.dim;
  dealStolenData(data);
  dealLegend(data);
  let xAxis = data.xAxis.dim; //x轴在接口中的位置
  let yAxis = data.yAxis.measure; //y轴在接口中的位置
  let server = [];
  let showAxis = true;
  switch (type) {
    case "pie":
      showAxis = false;
      legend = data.xAxis.dim;
      break;
    case "line":
    case "bar":
      break;
    case "linebar":
      break;
    case "number":
      return {
        type: "text",
        list: getNumber(data),
      };
    case "gauge":
      return setGaugeOptions(data);
  }
  server = getSeries(data, legendStrict, legend);
  if (type == "pie") {
    server = {
      legendNameList: getXAxis(xAxis, "element"),
      result: [server.result.length == 0 ? [] : server.result[0]],
    };
  }
  let legendData = getLegendData(legend, server.legendNameList, legendStrict);
  let options = {
    // id: guid(),
    type: type,
    tooltip: { show: true },
    legend: {
      data: legendData,
      show: legendData.length !== 0,
    }, //获取图例
    xAxis: [
      {
        data: getXAxis(xAxis, "element"),
        show: showAxis,
      },
    ], // 获取X轴数据,
    yAxis: getYAxis(yAxis, showAxis),
    series: server.result,
    dashboardInfo: {
      xAxisBak: xAxis,
      legendBak: legend,
      typeBak: resultData.chartType,
    },
  };
  options = setSpecialChart(options, data.chartType);
  return options;
};

/**
 * 当xAxis为空时，根据yAxis补全xAxis
 * @param {*} data
 * @returns
 */
const repairXAxis = (data) => {
  console.log(data, "data");
  const { yAxis } = data;
  let elementId = [];
  let element = [];
  yAxis.measure.map((m) => {
    elementId.push(m.measureId + "-elementId");
    element.push(m.measureName);
  });
  let dimItem = {
    dimensionId: yAxis.measure[0].measureId + "-dimensionId",
    dimensionName: "自定义维度",
    elementId,
    element,
  };
  if (data.xAxis && !data.xAxis.dim) {
    data.xAxis.dim = [];
  }
  data.xAxis.dim.push(dimItem);
  let resultData = repairResultData(data.resultData, dimItem);
  data.resultData = resultData;
  return data;
};

/**
 * 根据xAisx补全resultData
 * @param {*} resultData
 * @param {*} xDim
 * @returns
 */
const repairResultData = (resultData, xDim) => {
  let result = JSON.parse(JSON.stringify(resultData));
  let newResult = [];
  result.map((item) => {
    let { dimensionName } = xDim;
    xDim.elementId.map((elementId) => {
      let xObj = {};
      xObj[dimensionName] = elementId;
      let resultObj = { ...item, ...xObj };
      newResult.push(resultObj);
    });
  });
  return newResult;
};

/**
 * 校验能否出图，除了yAxis不能为空，其他皆可为空
 * @param {*} type
 * @param {*} resultData
 * @returns
 */
const checkCharts = (type, resultData) => {
  let flag = true;
  let message = null;
  if (
    !(
      resultData.xAxis.dim &&
      resultData.yAxis.measure &&
      resultData.yAxis.measure.length !== 0 &&
      resultData.resultData &&
      resultData.resultData.length !== 0
    )
  ) {
    flag = false;
    message = {
      type: "warning",
      text: "抱歉，暂不支持转化图形",
    };
  }
  if (
    type === "bar" &&
    resultData.xAxis.dim &&
    resultData.xAxis.dim.length === 0 &&
    resultData.yAxis.measure &&
    resultData.yAxis.measure.length === 0
  ) {
    // 这种情况为项目上二开的分析说明组件所判断的情况，不能删除
    // 在我们标准产品中，是不存在这种情况的
    flag = false;
    message = {
      type: "warning",
      text: "抱歉，暂不支持转化图形",
    };
  }
  return {
    flag,
    message,
  };
};

/**
 * 生成legend显示字段
 * @param {*} legendDim
 * @param {*} newLegendNameList
 * @param {*} legendStrict
 * @returns
 */
const getLegendData = (legendDim, newLegendNameList, legendStrict) => {
  if (legendStrict) {
    let dataList = [];
    legendDim.map((m) => {
      dataList = [...dataList, ...m.element];
    });
    return dataList;
  } else {
    return newLegendNameList;
  }
};

/**
 * 抽离gauge options生成方法
 * @param {*} data
 */
const setGaugeOptions = (data) => {
  let { xAxis } = data;
  if (xAxis && xAxis.dim && xAxis.dim.length !== 0) {
    let server = getSeries(data);
    let title = getGaugeTitle(data);
    let measure = data.yAxis.measure;
    let tvtype = "gauge";
    return {
      // id: guid(),
      type: tvtype,
      series: formatGauge(server.result, title, measure),
      yAxis: getYAxis(measure, false),
    };
  } else {
    return setCleanGauge(data);
  }
};

const setCleanGauge = (data) => {
  let measure = data.yAxis.measure;
  let { resultData } = data;
  let seriesData = measure.map((item) => {
    let result = resultData[0];
    return {
      name: item.measureName,
      id: item.measureId,
      value: result[item.measureName],
    };
  });
  let num = seriesData[0].value;
  let max = measure[0].max;
  max = max ? parseInt(max) : getMax(num);
  return {
    series: [
      {
        type: "gauge",
        data: seriesData,
        max,
      },
    ],
  };
};

const getMax = (num) => {
  let str = num + "";
  // 切割可能存在的小数位，获取整数部分位数
  let fristNum = str.split(".")[0];
  let numLength = str.split(".")[0].length;
  let max = 1;
  if (fristNum !== "0") {
    // 当首位不为0时，比如原数据为：3.14而不是0.314
    for (let i = 0; i < numLength; i++) {
      max = max * 10;
    }
  }
  return max;
};

const setSpecialChart = (options, chartsType) => {
  // console.log(JSON.parse(JSON.stringify(options)), 'echart-options')
  // if (chartsType === 'barWaterfallChart') {
  // 	options = setBarWaterfallChart(options)
  // }
  switch (chartsType) {
    case "barWaterfallChart":
      options = setBarWaterfallChart(options);
      break;
    case "horBarChart":
      options = setHorBarChart(options);
      break;
  }
  return options;
};

const setHorBarChart = (options) => {
  options.fullChartsType = "setHorBarChart";
  // 水平柱图的时候，x上只有一个度量
  options.yAxis = [options.yAxis[0]];
  options.xAxis = options.xAxis.map((m) => {
    // 水平柱图类型时，让x轴元素倒序输出（智答需求）
    m.data.reverse();
    return m;
  });
  let yAxisName = options.yAxis[0].name;
  // 清除series上多余的数据，避免echarts报错
  options.series = options.series.filter((f) => {
    return f.yAxisName === yAxisName;
  });
  options.series = options.series.map((m) => {
    // 水平柱图类型时，让x轴元素倒序输出（智答需求）
    m.data.reverse();
    return m;
  });
  return options;
};

/**
 * 设置步行图转换方法
 * @param {*} options
 */
const setBarWaterfallChart = (options) => {
  let { series, yAxis } = options;
  let decimal = yAxis[0].decimal;
  let indicatorProperties = yAxis[0].indicatorProperties;
  let upList = JSON.parse(JSON.stringify(series[0].data)).map((m) => {
    if (m.value < 0) {
      m.value = "-";
    }
    return m;
  });
  let downList = JSON.parse(JSON.stringify(series[0].data)).map((m) => {
    if (m.value >= 0) {
      m.value = "-";
    } else {
      m.value = Math.abs(m.value);
    }
    return m;
  });
  let num = series[0].data
    .map((item) => item.value)
    .reduce((prev, current, index, arr) => {
      return prev + current;
    });
  if (!indicatorProperties) {
    num = numFormate(num, "", decimal);
  }
  let numList = JSON.parse(JSON.stringify(series[0].data)).map((m) => {
    m.value = "-";
    return m;
  });
  upList.push({
    id: "总计",
    name: "总计",
    value: "-",
  });
  downList.push({
    id: "总计",
    name: "总计",
    value: "-",
  });
  numList.push({
    id: "总计",
    name: "总计",
    value: num,
  });
  let upSeries = {
    name: "上升",
    type: series[0].type,
    stack: "总量",
    label: {
      show: true,
      position: "top",
    },
    yAxisIndex: series[0].yAxisIndex,
    yAxisName: series[0].yAxisName,
    data: upList,
  };
  let DownSeries = {
    name: "下降",
    type: series[0].type,
    stack: "总量",
    label: {
      show: true,
      position: "bottom",
    },
    yAxisIndex: series[0].yAxisIndex,
    yAxisName: series[0].yAxisName,
    data: downList,
  };
  let numSeries = {
    name: "总计",
    type: series[0].type,
    stack: "总量",
    label: {
      show: true,
      position: "inside",
    },
    yAxisIndex: series[0].yAxisIndex,
    yAxisName: series[0].yAxisName,
    data: numList,
  };
  let shadowSeriesDataList = getShadowSeriesData(series);
  let shadowSeries = setShadowSeries(series, shadowSeriesDataList);
  let newSeries = [shadowSeries, upSeries, DownSeries, numSeries];
  options.series = newSeries;
  options.legend = {
    data: ["上升", "下降", "总计"],
  };
  options.xAxis[0].data.push("总计");
  options.dashboardInfo.xAxisBak = options.dashboardInfo.xAxisBak.map(
    (xAxis) => {
      xAxis.element.push("总计");
      xAxis.elementId.push("总计");
      return xAxis;
    }
  );
  options.tooltipCutFlag = true;
  return options;
};

const getShadowSeriesData = (series) => {
  let curSeriesData = series[0].data.map((item) => item.value);
  let shadowSeriesData = [];
  let num = 0;
  for (let i = 0; i < curSeriesData.length; i++) {
    num = num + curSeriesData[i];
    let current = null;
    if (i === 0) {
      current = 0;
    }
    if (i >= 1) {
      // current = curSeriesData[i - 1] + curSeriesData[i]
      let cur = curSeriesData[i];
      let pre = curSeriesData[i - 1];
      if (cur >= 0 && pre >= 0) {
        current = num - cur;
      } else if (cur >= 0 && pre < 0) {
        current = shadowSeriesData[i - 1];
      } else if (cur < 0 && pre >= 0) {
        current = num;
      } else if (cur < 0 && pre < 0) {
        current = num;
      }
    }
    shadowSeriesData.push(current);
  }
  let copySeries = JSON.parse(JSON.stringify(series[0].data));
  let newList = copySeries.map((item, index) => {
    item.value = shadowSeriesData[index];
    return item;
  });
  // 辅助的总计计数从坐标轴0开始
  newList.push({
    id: "总计",
    name: "总计",
    value: "-",
  });
  return newList;
};

/**
 * 生成辅助柱子
 * @param {*Array} series
 * @param {*Array} dataList
 */
const setShadowSeries = (series, dataList) => {
  return {
    name: "辅助",
    type: series[0].type,
    stack: "总量",
    itemStyle: {
      barBorderColor: "rgba(0,0,0,0)",
      color: "rgba(0,0,0,0)",
      readonlyFlag: true,
    },
    emphasis: {
      itemStyle: {
        barBorderColor: "rgba(0,0,0,0)",
        color: "rgba(0,0,0,0)",
      },
    },
    label: {
      show: false,
      position: "top",
    },
    yAxisIndex: series[0].yAxisIndex,
    yAxisName: series[0].yAxisName,
    data: dataList,
  };
};

function dealStolenData(data) {
  //处理脏数据
  // Y轴的重复数据去除
  // legend 无效数据去除
  var result = [];
  var middleResult = [];
  var Ylist = getYAxis(data.yAxis.measure, "measureName");
  data.resultData.map((item) => {
    var newObj = JSON.parse(JSON.stringify(item));
    Ylist.map((yitem) => {
      delete newObj[yitem.name];
    });
    var JSONNewObj = JSON.stringify(newObj);
    if (middleResult.indexOf(JSONNewObj) == -1) {
      middleResult.push(JSONNewObj);
      result.push(item);
    }
  });
  data.resultData = result;
  if (data.legend && data.legend.dim && data.legend.dim.length > 0) {
    let legend = [];
    data.legend.dim.map((item) => {
      if (item.element.length > 1 && item.element[0] != "ALL") {
        legend.push(item);
      }
    });
    data.legend.dim = legend;
  }
}

function dealLegend(data) {
  let legend = data.legend;
  if (
    !legend ||
    JSON.stringify(legend) == "{}" ||
    !legend.dim ||
    (legend.dim && legend.dim.length == 0)
  ) {
    data.legend = {
      dim: [
        {
          dimensionName: "前端生成自定义分组",
          element: [undefined],
          elementId: [undefined],
        },
      ],
    };
  }
}
function getNumber(data) {
  //measureName
  //elementId
  //element
  //measureName
  let yList = data.yAxis.measure;
  let dataList = data.resultData;
  let keyList = Object.keys(dataList[0]);
  let XList = data.xAxis.dim;
  let legendList = data.legend.dim;
  let list = XList.concat(legendList);
  let result = [];
  let keyListResult = [];
  keyList.map((item) => {
    var l = yList.filter((item1) => item1.measureName == item);
    if (l.length == 0) {
      keyListResult.push(item);
    }
  });
  dataList.map((dataItem) => {
    yList.map((yItem) => {
      let name = "";
      keyListResult.map((item) => {
        var l = list.filter((item1) => item1.dimensionName == item);
        if (l.length > 0) {
          var t = l[0].elementId.indexOf(dataItem[item]);
          if (t > -1) {
            if (l[0].element[t] != "ALL") {
              name += l[0].element[t];
            }
          }
        }
      });
      // name += yItem.measureName
      let indicatorProperties = yItem.indicatorProperties;
      let newValue = dataItem[yItem.measureName];
      if (!indicatorProperties) {
        newValue = numFormate(
          dataItem[yItem.measureName],
          yItem.measureUnit,
          yItem.decimal,
          "thousand"
        );
      }
      result.push({
        name: name,
        value: newValue,
        // unit: yItem.measureUnit == '百分比' ? '%' : yItem.measureUnit,
        unit: "",
        measureName: yItem.measureName,
        measureId: yItem.measureId,
        isAmbiguous: yItem.isAmbiguous,
      });
    });
  });
  return result;
}

const getGaugeTitle = (data) => {
  let xAxisDimName = {};
  //
  data.xAxis.dim.map((item) => {
    item.elementId.map((ele, index) => {
      let key = item.dimensionName + "-" + ele;
      let value = item.element[index];
      xAxisDimName[key] = value;
    });
  });
  // resultData数组中只可能有一个
  let resultData = data.resultData[0];
  let keyList = [];
  for (let key in resultData) {
    keyList.push(key + "-" + resultData[key]);
  }
  let title = "";
  keyList.map((item) => {
    if (xAxisDimName[item]) {
      title = title ? title + "-" + xAxisDimName[item] : xAxisDimName[item];
    }
  });
  return title;
};

/**
 * 当字段类型为'百分比'类型时，formatter series字段。
 * @param {*} series eCharts series信息
 */
const formatGauge = (series, title, measure) => {
  series.map((item) => {
    if (item.formaterType === "百分比") {
      item.axisLabel = {
        formatter: "{value}%",
      };
      item.detail = { formatter: "{value}%" };
    }
    let mergeData = {
      name: title,
      value: 0,
      id: item.measureId,
      valueType: item.formaterType,
    };
    item.data.map((element) => {
      mergeData.value = mergeData.value + element.value;
    });
    item.data = [mergeData];
    // 默认只取y轴上第一个最大值
    item.max = measure[0].max;
    // 防止type出错(y中showType被误读的情况)
    item.type = "gauge";
  });
  return series;
};

function getXAxis(data, element) {
  //获取X轴
  return [].concat.apply(
    [],
    data.map((item) => {
      return [...item[element]];
    })
  );
}

function getYAxis(data, showAxis) {
  //获取Y轴
  return (
    data &&
    data.map((item) => {
      let formate = item.measureUnit ? "(" + item.measureUnit + ")" : "";
      let formater = item.measureUnit ? item.measureUnit : "";
      return {
        name: item.measureName,
        show: showAxis,
        typeName: item.showType,
        formate: formate,
        formater: formater,
        decimal: item.decimal,
        isAmbiguous: item.isAmbiguous,
        measureName: item.measureName,
        position: item.position,
        indicatorProperties: item.indicatorProperties,
      };
    })
  );
}

/**
 * 格式化数据，保留小数点后两位或者改为千分位显示
 * @param {*} value 值
 * @param {*} formater 单位
 * @param {*} decimal 保留位数
 * @param {*} type 千分位（如果不需要千分位显示可不传入）
 */
function numFormate(value, formater, decimal, type) {
  decimal = parseInt(decimal);
  if (!isNaN(value)) {
    if (value) {
      if (formater == "百分比" || formater === "%") {
        // value = parseInt(value.toFixed(decimal) * 10000) / 100
        // value = value.toFixed(decimal)
        // value = (parseFloat(value) * 10000) / 100

        // 当为百分比类型时，保留的小数位往后端标识的基础上再加两位，保证转换精度
        value = NP.round(value, decimal + 2);
        // 现在改为，中间件对百分比类型不再乘以100
        // value = NP.times(value, 10000)
        // value = NP.divide(value, 100)
      } else {
        // value = parseInt(value.toFixed(decimal) * 100) / 100
        // value = value.toFixed(decimal)
        // value = parseFloat(value)
        value = NP.round(value, decimal);
        if (type === "thousand") {
          // 千分位表示方法
          value = formatNum(value);
        }
      }
    }
  }
  return value;
}

/**
 * 转换数字为千分位显示
 * @param {} num 数字
 */
const formatNum = (num) => {
  if (isNaN(num)) {
    throw new TypeError("num is not a number");
  }
  var groups = /([\-\+]?)(\d*)(\.\d+)?/g.exec("" + num),
    mask = groups[1], //符号位
    integers = (groups[2] || "").split(""), //整数部分
    decimal = groups[3] || "", //小数部分
    remain = integers.length % 3;
  var temp = integers
    .reduce(function(previousValue, currentValue, index) {
      if (index + 1 === remain || (index + 1 - remain) % 3 === 0) {
        return previousValue + currentValue + ",";
      } else {
        return previousValue + currentValue;
      }
    }, "")
    .replace(/\,$/g, "");
  return mask + temp + decimal;
};

export { getEchartsData };
