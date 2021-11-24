const mockNumber = {
  data: {
    tableId: "11ebdd8ae0b8b9d89c98e95688f698ae",
    chartType: "number",
    legend: { dim: [] },
    labelName: null,
    xAxis: { dim: [] },
    yAxis: {
      measure: [
        {
          measureId: "11ebd4e3a640ef2f83abc310482aa761",
          measureName: "营业收入.",
          showType: "",
          measureUnit: "%",
          max: "",
          decimal: 3,
          position: "left",
          isAmbiguous: "",
          measureType: "",
        },
      ],
    },
    resultData: [
      {
        武商年度yxy: "11ebd4e2534f5f0183abeb2e6438def8",
        武商月份yxy: "11ebd4e1e2a709d883abe770ec8e0669",
        武商组织yxy: "11ebd4e2c25b900183abfdfc9165b100",
        武商综合yxy: "11ebd4e288bfa40683ab316a2d895dcb",
        武商单位yxy: "11ebd4e33b2b4c2d83ab8789982517ce",
        武商情景yxy: "11ebd4e2fc214c4b83ab1ba48a5646c0",
        "营业收入.": 0.0866,
      },
    ],
    switchChartTypes: null,
    recommendChartType: "",
  },
};

const mockNumber2 = {
  data: {
    tableId: "11ebdfde6dc91359bad37f98386d21a2",
    chartType: "number",
    legend: { dim: [] },
    labelName: null,
    xAxis: { dim: [] },
    yAxis: {
      measure: [
        {
          measureId: "11ebd4e2fc1dc9d883abe3ded1f682f7",
          measureName: "同比增减率",
          showType: "",
          measureUnit: "%",
          max: "",
          decimal: 3,
          position: "left",
          isAmbiguous: "",
          measureType: "",
        },
      ],
    },
    resultData: [
      {
        武商年度yxy: "11ebd4e2534f5f0183abeb2e6438def8",
        武商月份yxy: "11ebd4e1e2b058b483ab53a6db4a3df2",
        武商组织yxy: "11ebd4e2c7720d9483abef47423ec0a9",
        武商综合yxy: "11ebd4e288bfa40683ab316a2d895dcb",
        武商科目yxy: "11ebd4e3a642c3f283ab854c8e26533a",
        武商单位yxy: "11ebd4e33b2b4c2d83ab8789982517ce",
        同比增减率: 0.111475115,
      },
    ],
  },
};

const mockNumberRDB = {
  data: {
    tableId: "11ebd57c974cdd39b669df31b5264c9b",
    chartType: "number",
    pageAxis: null,
    legend: {
      dim: [],
      measure: null,
    },
    xAxis: {
      dim: [],
      measure: null,
    },
    yAxis: {
      measure: [
        {
          measureId: "11ebe55e8d14a9c5b54c930195ba19e7",
          measureName: "未还金额",
          showType: "",
          measureUnit: "元",
          max: "",
          decimal: 2,
          position: "left",
          isAmbiguous: "",
          measureType: "",
        },
      ],
    },
    size: null,
    resultData: [
      {
        未还金额: 526945.0,
      },
    ],
    switchChartTypes: null,
    recommendChartType: "",
    labelName: null,
    row: null,
    column: null,
    dataSet: null,
  },
};

export { mockNumber, mockNumber2, mockNumberRDB };
