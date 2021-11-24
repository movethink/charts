import { numFormate } from "./utils";
/**
 * 处理树图options
 * @param {*} type
 * @param {*} data
 */
const setTreeOptions = (type, data) => {
  let rootId = data.xAxis.dim[0].elementParentId[0];
  let xAxis = setDimOrMeasure(data.xAxis);
  let yAxis = setDimOrMeasure(data.yAxis);

  let options = setData(data.resultData, xAxis, yAxis);
  let flagList = xAxis.element.map((m) => m.id);
  options = sortList(options, flagList);
  options = setListToTree(options, rootId);
  return {
    data: options,
  };
};

const sortList = (list, flagList) => {
  let newList = [];
  flagList.map((flag) => {
    let cur = list.find((f) => f.id === flag);
    newList.push(cur);
  });
  return newList;
};

const setListToTree = (list, rootId) => {
  const recursion = (list, pId = rootId) => {
    return list
      .filter((f) => f.pId === pId)
      .map((m) => {
        return {
          ...m,
          children: recursion(list, m.id),
        };
      });
  };
  let tree = recursion(list, rootId);
  return tree[0];
};

const setData = (result, xAxis, yAxis) => {
  let list = [];
  result.map((item) => {
    let x = xAxis.name;
    let currXEle = xAxis.element.find((ele) => ele.id === item[x]);
    let yList = yAxis.map((m) => {
      return {
        key: m.id,
        label: m.name,
        value: numFormate(item[m.name], m.unit, m.decimal),
      };
    });
    let node = {
      id: currXEle.id,
      name: currXEle.name,
      pId: currXEle.pId,
      status: "B",
      variableUp: true,
      value: yList,
    };
    list.push(node);
  });
  return list;
};

const setDimOrMeasure = (item) => {
  // let type = Object.keys(item)
  if (item["dim"]) {
    return setDim(item.dim);
  } else {
    return setMeasure(item.measure);
  }
};

const setDim = (dim) => {
  if (dim.length === 0) {
    return {};
  }
  let ele = dim[0].elementId.map((m, index) => {
    return {
      id: m,
      name: dim[0].element[index],
      pId: dim[0].elementParentId[index],
    };
  });
  return {
    id: dim[0].dimensionId,
    name: dim[0].dimensionName,
    element: ele,
  };
};
const setMeasure = (measure) => {
  if (measure.length === 0) {
    return {};
  }
  return measure.map((m) => {
    return {
      id: m.measureId,
      name: m.measureName,
      unit: m.measureUnit,
      decimal: m.decimal,
    };
  });
};

export { setTreeOptions };
