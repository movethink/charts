import * as echarts from "echarts";
import {
  color5,
  color10,
  color20,
  colorBar,
  colorLine,
  color5C,
  color20C,
  color10C,
  colorBarC,
  colorLineC,
} from "./color";
const formatToYNChart = (options, paramOptions = {}) => {
  if (!options || !options.series) {
    // 当不是echarts options结构时
    return options;
  }
  // 获取配置项信息
  const { completeXAxisName, tooltipTypeSemple } = paramOptions;
  options.tooltip = {
    trigger: "axis",
  };
  let l = options.series.length;
  options = mergeYAxis(options);
  options = setGrid(options);
  options = setColor(options, l);
  options = setLegend(options);
  options = setYAxis(options);
  options = setXAxis(options, completeXAxisName);
  options = setLineOptions(options);
  options = setBarOptions(options);
  options = setPieOptions(options);
  options = setTooltipFormat(options);
  options = setToolTipPosition(options);
  options = setTooltipTrigger(options, tooltipTypeSemple);
  options = setMapOptions(options);
  options = clearNull(options);
  options = setGaugeOptions(options);
  return options;
};

/**
 * 为油量图单独设置样式
 * @param {*} options
 */
const setGaugeOptions = (options) => {
  if (options.series[0].type === "gauge") {
    var value = options.series[0].data[0].value;
    var subtext = options.series[0].data[0].name;
    var max = options.series[0].max;
    if (value < 0) {
      value = 0;
      max = 100;
    }
    let option = {
      title: {
        show: true,
        text: value,
        subtext,
        subtextStyle: {
          color: "#414957",
          align: "center",
          fontSize: 20,
        },
        left: "center",
        bottom: "center",
        textStyle: {
          color: "#414957",
          fontSize: 40,
          align: "center",
          fontFamily: '"Microsoft Yahei","微软雅黑"',
        },
      },
      angleAxis: {
        axisLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        min: 0,
        max: 6.666,
        // boundaryGap: ['0', '10'],
        startAngle: 225,
      },
      radiusAxis: {
        type: "category",
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        data: ["a", "b", "c"],
        z: 10,
      },
      polar: {
        radius: "105%",
      },
      series: [
        {
          type: "bar",
          data: [, , (value * 5) / max],
          z: 1,
          coordinateSystem: "polar",
          barMaxWidth: 24.2,
          name: "警告事件",
          roundCap: true,
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            {
              offset: 0,
              color: "#5DD8A7", //渐变起始值
            },
            {
              offset: 1,
              color: "#8EBAF2", //渐变末尾值，后面变成可控
            },
          ]),
          barGap: "-100%",
        },
        {
          type: "bar",
          data: [, ,],
          z: 2,
          coordinateSystem: "polar",
          barMaxWidth: 24.2,
          name: "警告事件",
          roundCap: true,
          color: "red",
          barGap: "-100%",
        },
        {
          type: "bar",
          data: [, , 5],
          z: 0,
          silent: true,
          coordinateSystem: "polar",
          barMaxWidth: 24.2,
          name: "C",
          roundCap: true,
          color: "#FFFAFA",
          barGap: "-100%",
        },
        {
          type: "gauge",
          radius: "80%",
          splitNumber: 4,
          max: 5,
          detail: {
            show: false,
          },
          axisLine: {
            // 坐标轴线
            lineStyle: {
              // 属性lineStyle控制线条样式
              color: [
                [0, "#DE585D"],
                [1, "#DE585D"],
              ],
              width: 25,
              opacity: 0, //刻度背景宽度
            },
          },
          data: [
            {
              name: "",
              value: "",
            },
          ],
          splitLine: {
            length: 14, //长刻度节点线长度
            lineStyle: {
              width: 2,
              color: "#c4c6cc",
            }, //刻度节点线
          },
          axisTick: {
            show: true,
            lineStyle: {
              color: "#c4c6cc",
              width: 2,
            },
            length: 5,
            splitNumber: 6,
          },
          axisLabel: {
            show: false,
            color: "#333",
            fontSize: 18,
          },
          pointer: {
            show: false,
            length: "70%",
            itemStyle: {
              color: "#DE585D",
            },
          },
        },
      ],
      tooltip: {
        show: false,
      },
    };
    return option;
    // options.series.map((item, index) => {})
  }
  return options;
};

/**
 * 清除数据中的null 数据补零
 * @param {*} options
 */
const clearNull = (options) => {
  let { series } = options;
  series = series.map((item) => {
    item.data.map((m) => {
      let value = m.value;
      if (!value && typeof value != "undefined" && value != 0) {
        // 判断数据为null
        m.value = "";
      }
      return m;
    });
    return item;
  });
  options.series = series;
  return options;
};

/**
 * 合并y轴
 * @param {*} options
 */
const mergeYAxis = (options) => {
  let { series } = options;
  if (!options.yAxis || !options.yAxis[0] || !options.yAxis[0].position) {
    // 当不存在position字段时，跳过合并
    return options;
  }
  let yPosition = options.yAxis.map((y) => {
    return {
      name: y.name,
      position: y.position,
    };
  });
  series = series.map((item) => {
    let twoPositionFlag = true;
    let flagList = yPosition.map((y) => y.position);
    flagList = Array.from(new Set(flagList));
    if (flagList.length <= 1) {
      twoPositionFlag = false;
    }
    if (!twoPositionFlag) {
      item.yAxisIndex = 0;
    } else {
      yPosition.map((p) => {
        if (p.name === item.yAxisName) {
          p.position === "left" ? (item.yAxisIndex = 0) : (item.yAxisIndex = 1);
        }
      });
    }
    return item;
  });
  options.series = series;

  let yAxisLeft = options.yAxis.filter((y) => y.position === "left");
  let yAxisRight = options.yAxis.filter((y) => y.position === "right");
  let newYAxisLeft = merge(yAxisLeft);
  let newYAxisRight = merge(yAxisRight);
  let yAxislist = [];
  if (newYAxisLeft) {
    yAxislist.push(newYAxisLeft);
  }
  if (newYAxisRight) {
    yAxislist.push(newYAxisRight);
  }
  options.yAxis = yAxislist;
  // console.log(options, 'options')
  return options;
};

const merge = (list) => {
  let obj = list ? list[0] : {};
  list.map((item, index) => {
    if (!item.show || index === 0) {
      return;
    }
    obj.formater = obj.formater
      ? obj.formater + "/" + item.formater
      : item.formater;
    obj.formate = "(" + obj.formater + ")";
    obj.measureName = obj.measureName
      ? obj.measureName + "/" + item.measureName
      : "";
    obj.name = obj.name ? obj.name + "/" + item.name : "";
  });
  return obj;
};

/**
 * 定义图表核心到上下左右的距离
 * @param {*} options
 */
const setGrid = (options) => {
  if (!options.yAxis || !Array.isArray(options.yAxis)) {
    return options;
  }
  const unitNum = options.yAxis.length;
  let right = "1";
  let left = "1";
  if (unitNum === 1) {
    let position = options.yAxis[0].position;
    if (position === "left") {
      left = "66";
    } else {
      right = "66";
    }
  } else if (unitNum > 1) {
    // 双轴或者双轴以上的情况
    left = "66";
    right = 66 * (unitNum - 1) + "";
  }
  options.grid = {
    left: left,
    right: right,
    top: "10",
    bottom: "95",
  };
  return options;
};

const setTooltipFormatToZhiDa = (options) => {
  const { yAxis, type, series } = options;
  // true 则先前不存在legend，说明legend是由yAxis补全的
  const flag = series[0].name === series[0].yAxisName;
  if (type === "bar" || type === "line") {
    const formatter = (params) => {
      var result = "";
      // // params 可能为数组和obj，需要判断
      // if (params) {
      // }
      const { tooltipCutFlag } = options;
      const listNum = params.length;
      params = params.slice(0, 15);
      if (tooltipCutFlag) {
        // 步行图的情况，需要tooltip不显示补全的tooltip
        params.shift();
      }
      params.forEach(function(item, index) {
        // console.log(item, "item")
        let color = "";
        if (
          item.color &&
          item.color.colorStops &&
          item.color.colorStops[0] &&
          item.color.colorStops[0].color
        ) {
          color = item.color.colorStops[0].color;
        } else {
          color = item.color;
        }
        let value = "";
        if (yAxis.length === 1) {
          const unit = yAxis[0].formater;
          value = formatTooltipUnit(unit, item);
        } else if (yAxis.length > 1) {
          let yAxisItem = yAxis.find((y) => y.measureName === item.seriesName);
          const unit = yAxisItem ? yAxisItem.formater : "";
          value = formatTooltipUnit(unit, item);
        }
        let yName = flag ? "" : series[item.seriesIndex].yAxisName + "&";

        let marker =
          '<span style="display:inline-block; margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' +
          color +
          '"></span>';
        let valueElement =
          '<div style="display:flex; justify-content:space-between;"><div style="display:inline-block; margin-right:10px;">' +
          marker +
          yName +
          item.seriesName +
          ":" +
          '</div><div style="display:inline-block;">' +
          value +
          "</div></div>";
        result += valueElement;
      });
      result = params[0].name + "</br>" + result;
      if (listNum > 15) {
        result = result + "...";
      }
      result = "<div>" + result + "</div>";
      return result;
    };
    options.tooltip.formatter = formatter;
    options.tooltip.confine = true;
    return options;
  } else {
    return options;
  }
};

/**
 * 调整tooltip展示样式，数据右对齐，自适应，保留两位小数，千分位表示
 * @param {*} options eCharts options
 */
const setTooltipFormat = (options) => {
  options = setTooltipFormatToZhiDa(options);
  return options;
};

const formatTooltipUnit = (unit, item) => {
  let value = "";
  if (parseFloat(item.value).toString() === "NaN") {
    return item.value;
  }
  if (unit && unit !== "百分比" && item.value) {
    // 补零及加千分位
    value = item.value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  } else if (unit === "百分比" && item.value) {
    value = item.value + "%";
  } else if (!unit) {
    // 如果未匹配到单位，则不做任何处理
    value = item.value;
  }
  return value;
};

/**
 * 调整tooltip弹框的位置，保证弹框显示完全
 * @param {*} options
 */
const setToolTipPosition = (options) => {
  options.tooltip.position = function(point, params, dom, rect, size) {
    // 鼠标坐标和提示框位置的参考坐标系是：以外层div的左上角那一点为原点，x轴向右，y轴向下
    // 提示框位置
    var x = 0; // x坐标位置
    var y = 0; // y坐标位置

    // 当前鼠标位置
    var pointX = point[0];
    var pointY = point[1];

    // 外层div大小
    // var viewWidth = size.viewSize[0];
    // var viewHeight = size.viewSize[1];

    // 提示框大小
    var boxWidth = size.contentSize[0];
    var boxHeight = size.contentSize[1];

    // boxWidth > pointX 说明鼠标左边放不下提示框
    if (boxWidth > pointX) {
      x = 5;
    } else {
      // 左边放的下
      x = pointX - boxWidth;
    }

    // boxHeight > pointY 说明鼠标上边放不下提示框
    if (boxHeight > pointY) {
      y = 5;
    } else {
      // 上边放得下
      y = pointY - boxHeight;
    }

    return [x, y];
  };
  return options;
};

/**
 * 把维度信息转成 维度成员名称-维度名称 字典表
 * @param {*} dimList
 * @returns
 */
const mapDimObj = (dimList) => {
  let dimObj = {};
  dimList.map((dim) => {
    dim.element.map((member) => {
      dimObj[member] = dim.dimensionName;
    });
  });
  return dimObj;
};

const setTooltipTrigger = (options, tooltipTypeSemple) => {
  let { dashboardInfo, series, yAxis, type } = options;
  // 该设置只对折线图，柱图，饼图类型生效
  if (type !== "line" && type !== "bar" && type !== "pie") {
    return options;
  }
  if (tooltipTypeSemple && dashboardInfo) {
    let { legendBak, xAxisBak, typeBak } = dashboardInfo;
    // 步行图无法支持这样的tooltip，直接跳过设置，用之前的tooltip样式
    if (typeBak === "barWaterfallChart") {
      return options;
    }
    let legendMapObj = mapDimObj(legendBak);
    let xAxisMapObj = mapDimObj(xAxisBak);
    const formatter = (params) => {
      let { data, seriesName, seriesType } = params;
      let xName = xAxisMapObj[data.name];
      let lName = legendMapObj[seriesName];
      let yName = series[params.seriesIndex].yAxisName;
      let yAxisItem = yAxis.find((y) => y.measureName === yName);
      let unit = yAxisItem ? yAxisItem.formater : "";
      let value = formatTooltipUnit(unit, params);
      let xShowObj = {
        key: xName,
        value: data.name,
      };
      let lShowObj = {
        key: lName,
        value: seriesName,
      };
      let yShowObj = {
        key: yName,
        value: value,
      };
      let tooltipShowList = null;
      // 饼图没有legend，所以不需要设置lShowObj
      // 柱图和折线图可能没有legend，所以判断legend是否存在
      if (seriesType !== "pie" && lShowObj.key) {
        tooltipShowList = [xShowObj, lShowObj, yShowObj];
      } else {
        tooltipShowList = [xShowObj, yShowObj];
      }

      let tooltipText = "";
      tooltipShowList.forEach((item) => {
        let element =
          '<div style="display:flex; justify-content:space-between;"><div style="display:inline-block; margin-right:10px;">' +
          item.key +
          ":" +
          '</div><div style="display:inline-block;">' +
          item.value +
          "</div></div>";
        tooltipText = tooltipText + element;
      });
      return tooltipText;
    };
    options.tooltip.formatter = formatter;
    // options.tooltip.formatter= '{b}: {c}<br />{b}: {c}'
    options.tooltip.trigger = "item";
    options.tooltip.axisPointer = {
      type: "none",
    };
    delete options.dashboardInfo;
    // 当tooltip类型为item时，不执行这个方法
    return options;
  } else {
    return options;
  }
};

/**
 * 为柱图单独设置样式
 * @param {*} options
 */
const setBarOptions = (options) => {
  if (options.type === "bar") {
    options.tooltip = {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    };
    options.series.map((item, index) => {
      let colorL = options.color.length;
      // 颜色值取余，防止颜色不够用
      let curColor = options.color[index % colorL];
      let curColorC = options.colorC[index % colorL];
      if (!item.itemStyle || !item.itemStyle.readonlyFlag) {
        // 当自定义的readonlyFlag字段存在时，不改变item的itemStyle（柱状图的步行图设置）
        item.itemStyle = {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: curColor,
              },
              {
                offset: 1,
                color: curColorC,
              },
            ]),
            opacity: 1,
          },
        };
      }
    });
    if (options.fullChartsType && options.fullChartsType === "setHorBarChart") {
      let { xAxis, yAxis } = options;
      options.xAxis = yAxis.map((y) => {
        y.type = "value";
        return y;
      });
      options.yAxis = xAxis.map((x) => {
        x.type = "category";
        return x;
      });
    }
  }
  return options;
};

/**
 * 为折线图单独设置样式
 * @param {*} options
 */
const setLineOptions = (options) => {
  if (options.type === "line") {
    options.xAxis.map((item) => {
      // 图形从x初始位置开始生成 留白策略
      item.boundaryGap = false;
    });
    // options.yAxis.map(item => {
    //     item.axisLine.show = true
    //     item.axisTick = {
    //         //y轴刻度线
    //         show: true,
    //     }
    // })
    options.tooltip = {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    };
    options.series.map((item, index) => {
      item.smooth = true;
      let colorL = options.color.length;
      // 颜色值取余，防止颜色不够用
      let curColor = options.color[index % colorL];
      let curColorC = options.colorC[index % colorL];
      item.itemStyle = {
        normal: {
          //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: curColor, // 0% 处的颜色
            },
            {
              offset: 0.4,
              color: curColorC, // 100% 处的颜色
            },
            {
              offset: 1,
              color: curColorC, // 100% 处的颜色
            },
          ]), //背景渐变色
          lineStyle: {
            // 系列级个性化折线样式
            width: 2,
            type: "solid",
            // color: "#0180ff", //折线的颜色
            color: curColor, //折线的颜色
          },
        },
        emphasis: {
          // color: "#0180ff",
          color: curColor, //折线的颜色
          lineStyle: {
            // 系列级个性化折线样式
            width: 2,
            type: "dotted",
            // color: "0180ff",
            color: curColor, //折线的颜色
          },
        },
      };
      item.areaStyle = {
        normal: {},
      };
    });
  }
  return options;
};

/**
 * 为pie图单独设置样式
 * @param {*} options
 */
const setPieOptions = (options) => {
  if (options.type === "pie") {
    let l = options.legend.data.length;
    options = setColor(options, l);
    options.tooltip = {
      trigger: "item",
      // formatter: '{a} <br/>{b}: {c}'
    };
    options.series.map((item) => {
      item.radius = ["35%", "70%"];
      item.label = {};
      // 用户选择的值里面正负都有的情况时，出图按照各值的绝对值进行显示  (来自廉瑞的需求)
      item.data = item.data.map((m) => {
        m.value = Math.abs(m.value);
        return m;
      });
      return item;
    });
  }
  return options;
};
const setPieText = (params) => {
  let total = 0; //考生总数量
  let percent = 0; //考生占比
  echartData.forEach(function(value, index, array) {
    total += value.value;
  });
  percent = ((params.value / total) * 100).toFixed(1);
  let formatStr =
    "{white|" +
    params.name +
    "}\n{hr|}\n{yellow|" +
    params.value +
    "}\n{blue|" +
    percent +
    "%}";
  return formatStr;
};

const setXAxis = (options, completeXAxisName) => {
  if (!options.xAxis || !Array.isArray(options.xAxis)) {
    return options;
  }
  options.xAxis.map((item) => {
    const l = item.data.length;
    if (!completeXAxisName) {
      let maxL = 8;
      // 字符超过7之后的语句，用"..."代替
      item.data = item.data.map((data) => {
        let l = data.length;
        if (l > maxL) {
          data = data.substring(0, maxL - 1) + "...";
        }
        return data;
      });
    }
    let axisLabel = {};
    // x轴字符显示逻辑
    if (l <= 2) {
      axisLabel.interval = "auto";
    } else if (l <= 5) {
      // 当x轴刻度label多于2个，那么旋转表示
      axisLabel = {
        rotate: 45,
      };
    } else {
      // 当x轴刻度label多于2个，那么旋转表示
      axisLabel = {
        rotate: 45,
      };
    }
    item.axisLabel = axisLabel;
    item.axisLabel.color = "#2A2A2A";
    item.axisLine = {
      lineStyle: {
        color: "#E4E4E4",
      },
    };
    item.axisTick = {
      show: false,
    };
    return item;
  });
  return options;
};

const setYAxis = (options) => {
  if (!options.yAxis || !Array.isArray(options.yAxis)) {
    return options;
  }
  options.yAxis.map((item, index) => {
    item.nameLocation = "center";
    const reverseStr = (str) => {
      return str
        .split("")
        .reverse()
        .join("");
    };
    item.formater = reverseStr(item.formater);
    let formaterList = item.formater.split("/");
    // 使得name倒序排列
    // item.name = reverseStr(item.name)

    item.name = item.name
      .split("/")
      .map((n, i) => {
        if (formaterList[i]) {
          return n + "(" + formaterList[i] + ")";
        } else {
          return n;
        }
      })
      .join("/");
    item.nameGap = 52;
    item.axisTick = {
      //y轴刻度线
      show: false,
    };
    // item.nameTextStyle = {
    //     align: "left",
    // }
    item.axisLine = {
      show: false,
      lineStyle: {
        // color: "#063374",
        width: 1,
        type: "solid",
      },
    };
    //网格样式
    item.splitLine = {
      show: true,
      lineStyle: {
        color: ["#E0E0E0"],
        width: 1,
        type: "solid",
      },
    };
    item.axisLabel = {
      // inside: true,
      // rotate: 45,
      formatter: function(value, index) {
        // 格式化成月/日，只在第一个刻度显示年份
        value = formatUnit(value);
        return value;
      },
    };
    if (index > 1) {
      // 大于2个y轴的情况,每个偏移22像素
      item.offset = (index - 1) * 66;
    }
    return item;
  });
  return options;
};

const setLegend = (options) => {
  if (!options.legend) {
    return options;
  }
  options.legend.itemHeight = 9;
  options.legend.itemWidth = 9;
  options.legend.type = "scroll";
  options.legend.icon = "";
  options.legend.bottom = "-5px";
  options.legend.textStyle = {
    fontSize: 10,
    color: "#2A2A2A",
  };
  return options;
};
/**
 * 为chart设置颜色
 * @param {*} options
 */
const setColor = (options, l) => {
  if (l > 5 && l <= 10) {
    options.color = color10;
    options.colorC = color10C;
  }

  if (options.type === "bar") {
    options.color = colorBar;
    options.colorC = colorBarC;
  } else if (options.type === "line") {
    options.color = colorLine;
    options.colorC = colorLineC;
  }
  if (l <= 5) {
    options.color = color5;
    options.colorC = color5C;
  } else if (l > 10) {
    // 当值超过10种时，必定使用20种颜色值
    options.color = color20;
    options.colorC = color20C;
  }
  return options;
};
/**
 * 为地图类型设置 options
 * @param {*} options
 */
const setMapOptions = (options) => {
  if (options.type !== "map") {
    return options;
  }
  // options.series.map((item) => {
  // 	item.map = '北京'
  // })
  delete options.type;
  delete options.xAxis;
  delete options.yAxis;
  delete options.color;
  delete options.colorC;
  delete options.legend;
  // delete options.grid
  options.tooltip.trigger = "item";
  // options.tooltip = {
  // 	trigger: 'item'
  // }
  return options;
};
/**
 * 格式化value，把number类型的value转换成千，万，亿等单位
 * @param {*} value
 */
const formatUnit = (value) => {
  if ((value + "").indexOf("%") !== -1) {
    return value;
  }
  let text = "";
  if (value < 0) {
    if (value > -1000) {
      text = value + "";
    } else if (value > -10000) {
      text = value / 1000 + "千";
    } else if (value > -100000000) {
      text = value / 10000 + "万";
    } else {
      text = value / 100000000 + "亿";
    }
  } else {
    if (value < 1000) {
      text = value + "";
    } else if (value < 10000) {
      text = value / 1000 + "千";
    } else if (value < 100000000) {
      text = value / 10000 + "万";
    } else {
      text = value / 100000000 + "亿";
    }
  }
  return text;
};

export { formatToYNChart };
