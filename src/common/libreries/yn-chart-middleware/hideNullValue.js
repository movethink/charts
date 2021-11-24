import { hideNullValueList } from "./enum";
const setHideNullValue = (options, hideNullValue) => {
  let { type } = options;
  if (hideNullValue && hideNullValueList.indexOf(type) !== -1) {
    options = getHideNullValue(options);
  }
  return options;
};

/**
 * 清除零值
 * @param {*} options
 * @returns
 */
const getHideNullValue = (options) => {
  let { series } = options;
  let isAllNull = isSeriesAllNull(series);
  if (isAllNull) {
    options = setAllNullOptions(options);
  } else {
    options = hideXAxis(options);
    options = hideLegend(options);
  }
  return options;
};

/**
 * 当全部为零值的情况
 * @param {*} options
 * @returns
 */
const setAllNullOptions = (options) => {
  options.legend.data = [];
  options.xAxis[0].data = [];
  return options;
};

/**
 * 判断series中是否全部为零值，如果是，则需要单独特殊处理
 * @param {*} series
 * @returns
 */
const isSeriesAllNull = (series) => {
  let allList = [];
  series.map((item) => {
    item.data.map((m) => {
      allList.push(m.value);
    });
  });
  let flag = isListAllNull(allList);
  return flag;
};

const hideLegend = (options) => {
  let { legend, series, type } = options;
  // legend.data = ["金额"];
  series = series.filter((item) => {
    let valueList = item.data.map((m) => m.value);
    let flag = isListAllNull(valueList);
    return !flag;
  });
  options.series = series;
  options.legend.data = setLegend(series, type);
  return options;
};

/**
 * 重新设置legend
 * @param {*} series
 * @param {*} type
 * @returns
 */
const setLegend = (series, type) => {
  let legendData = null;
  if (type === "pie") {
    legendData = series[0].data.map((m) => m.name);
  } else {
    legendData = series.map((m) => m.name);
  }
  return legendData;
};
/**
 * 隐藏没值的x轴成员
 * @param {*} options
 * @returns
 */
const hideXAxis = (options) => {
  let { xAxis, series } = options;
  let xList = xAxis[0].data;
  let xItemList = [];
  series.map((item) => {
    item.data.map((xItem) => {
      xItemList.push(xItem);
    });
  });
  let newXList = xList.map((m) => {
    let list = xItemList
      .filter((f) => f.name === m)
      .map((i) => {
        return i.value;
      });
    let hide = isListAllNull(list);
    return {
      name: m,
      hide: hide,
    };
  });
  let curXList = newXList.filter((f) => !f.hide).map((m) => m.name);
  let hideXList = newXList.filter((f) => f.hide).map((m) => m.name);
  xAxis[0].data = curXList;
  series = setSeriesByXAxis(series, hideXList);
  options.xAxis = xAxis;
  return options;
};

/**
 * 根据隐藏的x信息，删除series对应数据
 * @param {*} series
 * @param {*} hideXList
 * @returns
 */
const setSeriesByXAxis = (series, hideXList) => {
  if (hideXList && hideXList.length > 0) {
    series = series.map((item) => {
      item.data = item.data.filter((f) => hideXList.indexOf(f.name) === -1);
      return item;
    });
  }
  return series;
};

/**
 * 当数组中存在有效元素时，返回false
 * @param {*} list
 * @returns
 */
const isListAllNull = (list) => {
  let flag = true;
  for (let i = 0; i < list.length; i++) {
    if (list[i]) {
      flag = false;
      return flag;
    }
  }
  return flag;
};

export { setHideNullValue };
