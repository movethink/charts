import { cartesian } from "./utils";
/**
 * mdx数据转换为handson table
 * @param {*} sdvData
 * @returns
 */
const transformsTable = (sdvData, options) => {
  const { column, row, dataSet } = sdvData.data;
  let repairCol = repairMeasure(column);
  let repairRow = repairMeasure(row);
  let columnData = cartesian(formatColOrRow(repairCol));
  let rowData = cartesian(formatColOrRow(repairRow));
  let resultData = cartesian([
    ...formatColOrRow(repairCol),
    ...formatColOrRow(repairRow),
  ]);
  let currentData = setCureentData(dataSet, column, row);
  let table = setTableData(resultData, rowData, currentData);
  let headerDataCol = setHeaderData(columnData);
  let headerDataRow = setHeaderData(rowData);
  let mergeTableData = mergeTable(table, headerDataCol, headerDataRow);
  let handsonData = setHandsonTable(mergeTableData);
  let handsontable = setHandsonTableParams(handsonData, options);
  // handsontable = setCellsMerge(handsontable);
  return handsontable;
};

/**
 * 设置handson表格数据
 * @param {*} tableData
 */
const setHandsonTable = (tableData) => {
  let data = tableData.map((item) => {
    return item.map((m) => m.value);
  });
  let cell = [];
  tableData.map((row, rowIndex) => {
    row.map((col, colIndex) => {
      let obj = {
        row: rowIndex,
        col: colIndex,
        id: col.id + "-col" + colIndex + "-row" + rowIndex,
      };
      let cellItem = { ...col, ...obj };
      delete cellItem.name;
      cell.push(cellItem);
    });
  });

  return {
    data,
    cell,
  };
};

/**
 * 设置handson表格其他参数，包括“cellsMerge hideNullValue”
 * @param {*} handsonData
 */
const setHandsonTableParams = (handsonData, options) => {
  let defaultOptions = {
    mergeCells: true,
    hideNullValue: true,
  };
  return {
    ...handsonData,
    ...defaultOptions,
    ...options,
  };
};

/**
 * 图行列合并逻辑，这块决定从中间件抽离出来，移到handson层处理
 * @param {*} handsonData
 * @returns
 */
const setCellsMerge = (handsonData) => {
  let { data, cell } = handsonData,
    cellsMerge = [],
    fixedColumnsLeft = 1,
    fixedRowsTop = 1,
    logicalHeaders = [1, 1];
  if (Array.isArray(data) && Array.isArray(data[0])) {
    let i, j;
    for (i = 0; i < data[0].length; i++) {
      if (data[0][i] !== "") {
        break;
      }
    }
    fixedColumnsLeft = i;
    for (j = 0; j < data.length; j++) {
      if (data[j][0] !== "") {
        break;
      }
    }
    fixedRowsTop = j;
    logicalHeaders = [fixedColumnsLeft, fixedRowsTop];

    //处理左上角单元格的cellsMerge信息
    cellsMerge.push({
      row: 0,
      col: 0,
      rowspan: fixedRowsTop,
      colspan: fixedColumnsLeft,
    });

    //处理列头跨colspan的cellsMerge情况
    let countRow = 1;
    for (i = 0; i < fixedRowsTop - 1; i++) {
      for (j = fixedColumnsLeft; j < data[i].length - 1; j++) {
        if (data[i][j] === data[i][j + 1]) {
          countRow++;
          if (j + 1 === data[i].length - 1 && countRow > 1) {
            cellsMerge.push({
              row: i,
              col: j - countRow + 2,
              rowspan: 1,
              colspan: countRow,
            });
          }
        } else {
          cellsMerge.push({
            row: i,
            col: j - countRow + 1,
            rowspan: 1,
            colspan: countRow,
          });
          countRow = 1;
        }
      }
      countRow = 1;
    }

    //处理行头跨rowspan的cellsMerge情况
    let countCol = 1;
    for (i = 0; i < fixedColumnsLeft - 1; i++) {
      for (j = fixedRowsTop; j < data.length - 1; j++) {
        if (data[j][i] === data[j + 1][i]) {
          countCol++;
          if (j + 1 === data.length - 1 && countCol > 1) {
            cellsMerge.push({
              row: j - countCol + 2,
              col: i,
              colspan: 1,
              rowspan: countCol,
            });
          }
        } else {
          cellsMerge.push({
            row: j - countCol + 1,
            col: i,
            colspan: 1,
            rowspan: countCol,
          });
          countCol = 1;
        }
      }
      countCol = 1;
    }
  }

  return {
    data,
    cell,
    cellsMerge,
    fixedColumnsLeft,
    fixedRowsTop,
    logicalHeaders,
  };
};

/**
 * 为table整合行头和列头
 * @param {*} table
 * @param {*} headerDataCol
 * @param {*} headerDataRow
 * @returns
 */
const mergeTable = (table, headerDataCol, headerDataRow) => {
  let mergeColTable = [...headerDataCol, ...table];
  let newRow = mergeRow(headerDataCol, headerDataRow);
  newRow.map((row) => {
    row.map((item, index) => {
      mergeColTable[index].unshift(item);
    });
  });
  return mergeColTable;
};

/**
 * 补全row
 * @param {*} headerDataCol
 * @param {*} headerDataRow
 * @returns
 */
const mergeRow = (headerDataCol, headerDataRow) => {
  let rowListAdd = [];
  for (let i = 0; i < headerDataCol.length; i++) {
    rowListAdd.push({
      value: "",
      level: 0,
      colIndex: i,
    });
  }
  let newRow = headerDataRow.map((item, index) => {
    let newList = rowListAdd.map((m) => {
      let obj = {
        ...m,
        ...{ rowIndex: index },
        ...{ id: "col" + m.colIndex + "-" + "row" + index },
      };
      delete obj.rowIndex;
      delete obj.colIndex;
      return obj;
    });
    let newItem = [...newList, ...item];
    return newItem;
  });
  newRow = newRow.reverse();
  return newRow;
};

/**
 * 获取当前dataset，并存成字典表
 * @param {*} dataSet
 * @param {*} column
 * @param {*} row
 * @returns
 */
const setCureentData = (dataSet, column, row) => {
  let measureList = getMeasureOrDim(column, row, 1).map((m) => m.dimensionName);
  let dimList = getMeasureOrDim(column, row, 0).map((m) => m.dimensionName);
  let newDataList = [];
  dataSet.map((item) => {
    let objList = measureList.map((measure) => {
      let dimId = dimList.map((dim) => item[dim]);
      let value = item[measure];
      dimId.push(measure);
      let id = dimId.sort().join("-");
      return {
        id,
        value,
      };
    });
    newDataList = [...newDataList, ...objList];
  });
  let newDataObj = {};
  newDataList.map((item) => {
    newDataObj[item.id] = item.value;
  });
  return newDataObj;
};

/**
 * 获取度量或者维度
 * @param {*} sdvData
 * @returns
 */
const getMeasureOrDim = (column, row, type) => {
  const filterFun = (list) => {
    return list
      .filter((f) => f.isIndex === type)
      .map((m) => {
        return {
          dimensionName: m.dimensionName,
          dimensionId: m.dimensionId,
        };
      });
  };
  return filterFun([...column, ...row]);
};

/**
 * 把行列上的指标集合起来重新还原为维度
 * @param {*} list
 * @param {*} type
 * @returns
 */
const repairMeasure = (list, type) => {
  let measureList = list.filter((f) => f.isIndex === 1);
  let dimList = list.filter((f) => f.isIndex !== 1);
  let customDim = {};
  if (measureList && measureList.length > 0) {
    // 指标在dataset中按name显示的，而不是id
    let elementId = measureList.map((m) => m.dimensionName);
    let element = measureList.map((m) => m.dimensionName);
    customDim = {
      dimensionId: type + "-custom-dim",
      dimensionName: "自定义维度",
      element,
      elementId,
      isIndex: 0,
    };
    dimList.push(customDim);
  }
  return dimList;
};

/**
 * 设置行头列头
 * @param {*} listData
 * @returns
 */
const setHeaderData = (listData) => {
  let num = listData[0].length;
  let headList = [];
  for (let i = 0; i < num; i++) {
    let col = listData.map((m) => {
      let obj = m[i];
      obj.value = m[i].name;
      obj.level = 1;
      return obj;
    });
    headList.push(col);
  }

  return headList;
};

/**
 * 设置有值的table（不包括行头和列头）
 * @param {*} resultData
 * @param {*} measure
 * @returns
 */
const setTableData = (resultData, rowData, currentData) => {
  let rowNum = rowData.length; //3
  let table = setTable(resultData, rowNum, currentData);
  return table;
};

/**
 * 根据行把result分组为table
 * @param {*} resultData
 * @param {*} columnNum
 * @param {*} rowNum
 */
const setTable = (resultData, rowNum, currentData) => {
  let newResult = mergeElement(resultData);
  // 为数据赋值
  newResult = newResult.map((item) => {
    let value = currentData[item.id] ? currentData[item.id] : "";
    item.value = value;
    item.level = 0;
    return item;
  });
  let table = [];
  for (let i = 0; i < rowNum; i++) {
    let data = newResult.filter((f, index) => index % rowNum === i);
    table.push(data);
  }
  return table;
};

const mergeElement = (list) => {
  let newList = list.map((col) => {
    let idString = col
      .map((item) => item.id)
      .sort()
      .join("-");
    let nameString = col.map((item) => item.name).join("-");
    return {
      id: idString,
      name: nameString,
    };
  });
  return newList;
};
/**
 * 格式化行列数据
 * @param {*} list
 * @returns
 */
const formatColOrRow = (list) => {
  let colOrRow = list.map((item) => {
    // 维度
    let eleList = item.element.map((ele, index) => {
      return {
        id: item.elementId[index],
        name: ele,
      };
    });
    return eleList;
  });
  return colOrRow;
};

export { transformsTable };
