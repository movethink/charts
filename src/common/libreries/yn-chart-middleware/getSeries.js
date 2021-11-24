import { chartsTypeMap } from "./enum";
import NP from "number-precision";

function getSeries(data, legendStrict, legend) {
  if (data.resultData.length == 0) {
    return {
      type: "warning",
      text: "数据库中无此数据",
    };
  }
  data = JSON.parse(JSON.stringify(data));
  // 获取数据
  // 这块逻辑不好解释... 看代码和数据吧
  // 每个图例为一个对象  data 数据顺序对应 X轴的顺序 匹配不到需要有占位不然会显示串位 目前用undefined占位
  // let legendData = {
  //     name: getValueStringForArr(data.legend.dim[0].dimensionName)[0],
  //     list: getLegend(data.legend.dim, "elementId"),
  // };
  let legendData = getlegendDataForArr(data.legend.dim);
  let xAxisData = {
    name: getValueStringForArr(data.xAxis.dim[0].dimensionName)[0], //X 分组
    list: getXAxis(data.xAxis.dim, "elementId"), // 匹配值
    namelist: getXAxis(data.xAxis.dim, "element"), //显示值
  };
  let yAxisData = {
    list: getYAxis(data.yAxis.measure, "measureName"),
  };
  let server = data.resultData; //后台数据代码
  let result = [];
  let type = chartsTypeMap[data.chartType]; // 获取默认图形展示类型
  // let legendList = [];
  // function getLegendName(wd) {
  //     var name = "";
  //     wd.map(wdName => {
  //         name += wdName.itemName;
  //     });
  //     return name;
  // }
  //0正常显示
  //1只有一个图例并且不显示
  //2坐标轴当图例
  //3pie 图X轴为坐标所以不用id
  var showLegendType = 0;
  var showLegendLength = 1;
  data.legend.dim &&
    data.legend.dim.map((item) => {
      if (item.elementId.length != 0) {
        showLegendLength *= item.elementId.length;
      }
    });
  if (showLegendLength <= 1) {
    showLegendType = 1;
    if (yAxisData.list.length > 1) {
      showLegendType = 1;
    }
  }
  if (type == "pie") {
    showLegendType = 3;
  }

  function setData(legendData, wd) {
    // wd1 = JSON.parse(JSON.stringify(wd));
    if (legendData.length == 0) {
      legendDataList.push(wd);
      return false;
    } else {
      legendData = JSON.parse(JSON.stringify(legendData));
      let legend = legendData.shift();
      let legendStack = legend.stack;
      legend.list.map((legendItem, index) => {
        let wd1 = JSON.parse(JSON.stringify(wd));
        let wdItem = {
          name: legend.name,
          id: legendItem,
          itemName: legend.listName ? legend.listName[index] : legendItem,
        };
        if (legendStack) {
          wdItem.stack = legendStack;
        }
        wd1.push(wdItem);
        setData(legendData, wd1);
      });
    }
  }

  let legendDataList = [];
  /**
   * 生成 legendDataList
   */
  setData(legendData, []);

  /**
   * 根据具体的x，y，legend去server（resultData）中循环取数
   * @param {*} wdItemList
   * @param {*} xItemFzName
   * @param {*} xItemFzValue
   * @param {*} server
   * @param {*} legendDataList
   * @param {*} showLegendType
   * @param {*} yItem
   * @param {*} dataItem
   * @param {*} index
   */
  function setDataItems(
    wdItemList,
    xItemFzName,
    xItemFzValue,
    server,
    legendDataList,
    showLegendType,
    yItem,
    dataItem,
    index
  ) {
    // legendDataList.map(wdItemList => {
    let name = "";
    let value = null;
    server.map((serverItem) => {
      let flag = true;
      name = "";
      let flagname = "";
      wdItemList.map((wdItem) => {
        name += wdItem.itemName;
        if (
          flag &&
          serverItem[wdItem.name] == wdItem.id &&
          serverItem[xItemFzName] == xItemFzValue
        ) {
          flagname = serverItem[yItem["name"]];
          // flagname = xAxisData.namelist[index];
          // name = getName(serverItem, wdItem);
        } else {
          flag = false;
        }
      });
      if (flag) {
        const { formater, decimal, indicatorProperties } = yItem;
        if (!indicatorProperties && decimal !== null) {
          // 当具体格式化参数不存在时，使用之前默认的格式化方法
          value = numFormate(flagname, formater, decimal);
        } else {
          value = flagname;
        }

        // value = flagname
      }
    });
    // name = dataItem.name
    if (showLegendType == 1) {
    } else if (showLegendType == 3) {
    } else if (showLegendType == 2) {
      // legendNameList.push(yItem.name);
      name = yItem.name;
    } else {
      // legendList.push(legendItem);
    }
    dataItem.name = name;
    dataItem.data.push({
      id: xAxisData.list[index],
      name: xAxisData.namelist[index],
      value,
    });
    // });
  }

  let legendNameList = [];
  yAxisData.list.map((yItem, yItemIndex) => {
    legendDataList.map((wdItemList) => {
      var showType = yItem.typeName || type;
      // 一旦legend dim中确定堆叠，那么其中的stack在legendDataList数组的wdItemList数组中必定是相同的。
      var dataItem = {
        name: "",
        type: showType,
        formateType: yItem.formate,
        formaterType: yItem.formater,
        yAxisIndex: yItemIndex,
        yAxisName: yItem.name,
        data: [],
      };
      // 该处不能确定是否当前legend数组中是否只有一个元素
      let stack = wdItemList[0].stack;
      if (stack) {
        dataItem.stack = stack;
      }
      // legendNameList = [];
      xAxisData.list.map((xItem, index) => {
        var xItemFzName = xAxisData.name;
        var xItemFzValue = xItem;
        setDataItems(
          wdItemList,
          xItemFzName,
          xItemFzValue,
          server,
          legendDataList,
          showLegendType,
          yItem,
          dataItem,
          index
        );
      });
      // 当legend上数据被全部舍弃之后，需要直接拿y轴字段填充（数据舍弃后，dataItem.name === "null"）
      if (dataItem.name === "null") {
        if (legendStrict && type !== "pie") {
          // 能走到这个判断，说明legend必然只有一个维度成员，或者没有legend
          let legendData = "";
          if (
            legend &&
            legend.length > 0 &&
            legend[0].element &&
            legend[0].element.length > 0
          ) {
            legendData = legend[0].element[0];
          }
          dataItem.name = legendData;
        } else {
          dataItem.name = dataItem.yAxisName;
        }
      }
      if (dataItem.name) {
        legendNameList.push(dataItem.name);
      }
      result.push(dataItem);
    });
  });
  return { legendNameList, result };
}

function getlegendDataForArr(data) {
  var result = [];
  data.map((item) => {
    // 修改之前版本的兼容写法
    //  之前的写法 item.elementId.length > 0 && item.elementId[0] != "ALL"
    if (item.elementId.length > 0) {
      let legendObj = {
        name: item.dimensionName,
        list: item.elementId,
        listName: item.element,
      };
      if (item.showType === "stack") {
        // 表明为堆叠类型
        let stack = "";
        item.element.map((ele) => {
          stack = stack ? stack + "-" + ele : ele;
        });
        legendObj.stack = stack;
      }
      result.push(legendObj);
    }
  });
  return result;
}

function getValueStringForArr(string) {
  //这个方法主要是适应后台的数据结构 简直坑的要死
  try {
    if (string) {
      let arr = JSON.parse(string);
      if (!isNaN(arr)) {
        let result = [];
        result.push(arr);
        return result;
      }
      return arr;
    }
  } catch (e) {
    return string.split("@!#$%^&*");
  }
}

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
        value = NP.round(value, decimal);
        // 现在改为，中间件对百分比类型不再乘以100
        // value = NP.times(value, 10000)
        // value = NP.divide(value, 100)
      } else {
        // value = parseInt(value.toFixed(decimal) * 100) / 100
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

export { getSeries };
