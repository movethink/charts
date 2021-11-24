/**
 * 处理散点图options
 * @param {*} type
 * @param {*} data
 */
const setScatterOptions = (type, data) => {
  let labelName = setDimOrMeasure(data.labelName);
  let legend = setDimOrMeasure(data.legend);
  let xAxis = setDimOrMeasure(data.xAxis);
  let yAxis = setDimOrMeasure(data.yAxis);
  let size = setDimOrMeasure(data.size);
  let { baseData, sizeList } = setData(
    { xAxis, yAxis, size, labelName, legend },
    data.resultData
  );
  let fallData = groupByLegend(legend, baseData);
  let options = setOptions(fallData, xAxis, yAxis, sizeList);
  return options;
};

const setOptions = (fallData, xAxis, yAxis, sizeList) => {
  // 判断fallData是obj还是array
  // 如果是obj，则表示没有legend；如果为array，则有legend
  let legendList = null;
  if (Array.isArray(fallData)) {
    legendList = fallData.map((m) => m.key);
  }
  let xAxisType = xAxis.type === "dim" ? "category" : "value";
  let xAxisName =
    xAxis.type === "dim" ? "" : xAxis.name + "(" + xAxis.unit + ")";
  let yAxisType = yAxis.type === "dim" ? "category" : "value";
  let yAxisName =
    yAxis.type === "dim" ? "" : yAxis.name + "(" + yAxis.unit + ")";
  let baseTitle = {
    text: "",
  };
  let baseLegend = {
    right: 10,
    data: legendList,
  };
  let baseXAxis = {
    type: xAxisType,
    name: xAxisName,
    splitLine: {
      lineStyle: {
        type: "dashed",
      },
    },
  };
  let baseYAxis = {
    type: yAxisType,
    name: yAxisName,
    splitLine: {
      lineStyle: {
        type: "dashed",
      },
    },
    scale: true,
  };
  let baseSeries = setSeries(fallData, sizeList);
  let options = {
    title: baseTitle,
    legend: baseLegend,
    xAxis: baseXAxis,
    yAxis: baseYAxis,
    series: baseSeries,
  };
  return options;
};

const setSeries = (fallData, sizeList) => {
  let series = null;
  if (Array.isArray(fallData)) {
    series = fallData.map((item) => {
      return createSeries(item, sizeList);
    });
  } else {
    series = [createSeries(fallData, sizeList)];
  }
  return series;
};

const createSeries = (dataObj, sizeList) => {
  sizeList = sizeList.sort(function(a, b) {
    return a - b;
  });
  let max = sizeList[sizeList.length - 1];
  let num = 0;
  while (max > 100) {
    // 获取size最大值开方到100以内的开方次数
    num++;
    max = Math.sqrt(max);
  }
  return {
    name: dataObj.key,
    data: dataObj.value,
    type: "scatter",
    symbolSize: function(data) {
      // return Math.sqrt(data[2]) / 5e2
      let newData = data[2] ? data[2] : 10;
      // for (let i = 0; i < num; i++) {
      // 	// 根据开方次数依次对每个数开方，并保证其在10以上
      // 	newData = Math.sqrt(newData) + 10
      // }

      // 上面的for循环可以转换为下面的算法
      newData = Math.pow(newData, Math.pow(0.5, num)) + 10;
      return newData;
    },
    emphasis: {
      label: {
        show: true,
        formatter: function(param) {
          return param.data[3] ? param.data[3] : "";
        },
        position: "top",
      },
    },
  };
};

/**
 * 把数据根据legend分组，返回一个对象或者数组
 * @param {*} legend
 * @param {*} data
 */
const groupByLegend = (legend, data) => {
  let { element } = legend;
  // 当不存在legend维度时，则不分组
  if (!element) {
    return {
      key: null,
      value: data,
    };
  }
  let newData = element.map((m) => {
    let key = m.name;
    let list = data.filter((item) => {
      let itemLegend = item[item.length - 1];
      if (key === itemLegend) {
        return true;
      } else {
        return false;
      }
    });
    return {
      key,
      value: list,
    };
  });
  return newData;
};

const setData = (obj, resultData) => {
  let { xAxis, yAxis, size, labelName, legend } = obj;
  let sizeList = [];
  let data = resultData.map((m) => {
    let dataObj = {};
    for (let key in m) {
      switch (key) {
        case xAxis.name:
          dataObj.xAxis = getValue(xAxis, m[key]);
          break;
        case yAxis.name:
          dataObj.yAxis = getValue(yAxis, m[key]);
          break;
        case size.name:
          dataObj.size = getValue(size, m[key]);
          break;
        case labelName.name:
          dataObj.labelName = getValue(labelName, m[key]);
          break;
        case legend.name:
          dataObj.legend = getValue(legend, m[key]);
          break;
      }
    }
    sizeList.push(dataObj.size);
    return [
      dataObj.xAxis,
      dataObj.yAxis,
      dataObj.size,
      dataObj.labelName,
      dataObj.legend,
    ];
  });
  return {
    baseData: data,
    sizeList: sizeList,
  };
};

const getValue = (obj, value) => {
  let newValue = null;
  if (obj.type === "dim") {
    // 当类型为维度时，需要取出对应的维度成员名称
    let { element } = obj;
    let currentEle = element.find((ele) => ele.id === value);
    newValue = currentEle.name;
  } else {
    // 当类型为度量时，直接取当时的值即可
    newValue = value;
  }
  return newValue;
};

const setDimOrMeasure = (item) => {
  // let type = Object.keys(item)
  if (!item) {
    // 当不存在该字段，则返回空
    return {};
  } else if (item["dim"]) {
    return setDim(item.dim);
  } else if (item["measure"]) {
    return setMeasure(item.measure);
  }
};

const setDim = (dim) => {
  if (!dim || dim.length === 0) {
    return {};
  }
  let ele = dim[0].elementId.map((m, index) => {
    return {
      id: m,
      name: dim[0].element[index],
    };
  });
  return {
    type: "dim",
    id: dim[0].dimensionId,
    name: dim[0].dimensionName,
    element: ele,
  };
};
const setMeasure = (measure) => {
  if (!measure || measure.length === 0) {
    return {};
  }
  return {
    type: "measure",
    id: measure[0].measureId,
    name: measure[0].measureName,
    unit: measure[0].measureUnit,
  };
};

export { setScatterOptions };
