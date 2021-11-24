let mockLine = {
  data: {
    chartType: "barChart",
    legend: {
      dim: [
        {
          dimensionId: "6cedf268281e46c4af007f8012d040ec",
          dimensionName: "开发_城市",
          element: ["武汉", "北京"],
          elementId: [
            "33684153a16743c8a7a1ffba9b2feb2f",
            "5feb6a51ba0748559959cff3436fda9b",
          ],
          groupIndex: 0,
          isIndex: 0,
          showType: "",
        },
      ],
    },
    resultData: [
      {
        开发_年: "9557423ee8c54d1a8c42b1a9acdeae03",
        开发_月: "30ab275bb411445ba4901c73278d9114",
        开发_日: "ec5d11b4b5cf48b69444e961c82c3d9c",
        开发_城市: "33684153a16743c8a7a1ffba9b2feb2f",
        前端: 12.0,
        后端: 11.0,
      },
      {
        开发_年: "9557423ee8c54d1a8c42b1a9acdeae03",
        开发_月: "8b781f27fed44d3889ece423d977f2df",
        开发_日: "ec5d11b4b5cf48b69444e961c82c3d9c",
        开发_城市: "33684153a16743c8a7a1ffba9b2feb2f",
        后端: 15.0,
        前端: 16.0,
      },
      {
        开发_年: "9557423ee8c54d1a8c42b1a9acdeae03",
        开发_月: "30ab275bb411445ba4901c73278d9114",
        开发_日: "ec5d11b4b5cf48b69444e961c82c3d9c",
        开发_城市: "5feb6a51ba0748559959cff3436fda9b",
        后端: 13.0,
        前端: 14.0,
      },
      {
        开发_年: "9557423ee8c54d1a8c42b1a9acdeae03",
        开发_月: "8b781f27fed44d3889ece423d977f2df",
        开发_日: "ec5d11b4b5cf48b69444e961c82c3d9c",
        开发_城市: "5feb6a51ba0748559959cff3436fda9b",
        后端: 17.0,
        前端: 18.0,
      },
    ],
    xAxis: {
      dim: [
        {
          dimensionId: "abf6c23661e8405b8447a3fa9b76f361",
          dimensionName: "开发_月",
          element: ["1", "2"],
          elementId: [
            "30ab275bb411445ba4901c73278d9114",
            "8b781f27fed44d3889ece423d977f2df",
          ],
          groupIndex: 0,
          isIndex: 0,
          showType: "",
        },
        {
          dimensionId: "ba64f81641b24edcb557bcfa9e9fc08b",
          dimensionName: "开发_日",
          element: ["22"],
          elementId: ["ec5d11b4b5cf48b69444e961c82c3d9c"],
          groupIndex: 0,
          isIndex: 0,
          showType: "",
        },
      ],
    },
    yAxis: {
      measure: [
        {
          decimal: 3,
          max: "",
          measureId: "bab85913ff844f7599ba320077cd5a6d",
          measureName: "后端",
          measureUnit: "",
          position: "left",
          showType: "bar",
        },
        {
          decimal: 3,
          max: "",
          measureId: "4137fe09dc6c4442aff78923426d52fb",
          measureName: "前端",
          measureUnit: "",
          position: "right",
          showType: "line",
        },
      ],
    },
  },
};

const mockLineRDB = {
  data: {
    tableId: "11ebd57c974cdd39b669df31b5264c9b",
    chartType: "lineChart",
    pageAxis: null,
    legend: {
      dim: [
        {
          isIndex: 0,
          dimensionType: "",
          dimensionId: "11ebe3b5886c5a0ba6449d764bbc62bc",
          dimensionName: "期间",
          dimensionUnit: null,
          elementId: ["2"],
          element: ["2季度"],
          decimal: null,
          elementParentId: [""],
          groupIndex: "",
          isAmbiguous: "",
          max: "",
          measureUnit: "",
          showType: "",
        },
      ],
      measure: null,
    },
    xAxis: {
      dim: [
        {
          isIndex: 0,
          dimensionType: "",
          dimensionId: "11ebd88180adb301ab8ecdaa25485fca",
          dimensionName: "使用人",
          dimensionUnit: null,
          elementId: [
            "08c5cfacbf2411e9bc5439bf70da0501",
            "11eb9778f5813fdcb91d5bd8a8d1ebc8",
            "4081f9ae0a7611eaace6c7451a461eea",
            "509c90afc27911e9bfb503e50f74332c",
            "80328b90c55c11e98078bb24f25350de",
          ],
          element: ["丰艳彪", "王亮", "黄思瑶0", "王红艳", "刘志斌"],
          decimal: null,
          elementParentId: ["", "", "", "", ""],
          groupIndex: "",
          isAmbiguous: "",
          max: "",
          measureUnit: "",
          showType: "",
        },
      ],
      measure: null,
    },
    yAxis: {
      measure: [
        {
          measureId: "11ebe3b5886c5a0ca644478fedb3a5e5",
          measureName: "借款金额",
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
        期间: "2",
        使用人: "08c5cfacbf2411e9bc5439bf70da0501",
        借款金额: 40000.0,
      },
      {
        期间: "2",
        使用人: "11eb9778f5813fdcb91d5bd8a8d1ebc8",
        借款金额: 30600.0,
      },
      {
        期间: "2",
        使用人: "4081f9ae0a7611eaace6c7451a461eea",
        借款金额: 22700.0,
      },
      {
        期间: "2",
        使用人: "509c90afc27911e9bfb503e50f74332c",
        借款金额: 21900.0,
      },
      {
        期间: "2",
        使用人: "80328b90c55c11e98078bb24f25350de",
        借款金额: 1280.0,
      },
    ],
    allChartTypes: {
      barChart: "柱状图",
      horBarChart: "水平柱图",
      gaugeChart: "仪表盘",
      lineChart: "折线图",
      mixedLineAndBar: "柱折混合",
      number: "数值",
      pieChart: "饼图",
      barWaterfallChart: "步行图",
      scatterChart: "散点图",
      ringChart: "环形图",
      verticalStackedBarChart: "竖状叠柱图",
      horizontalStackedBarChart: "水平叠柱图",
      mapChart: "地图",
      treeChart: "树图",
      radarChart: "雷达图",
      listTable: "列表",
      table: "表格",
    },
    switchChartTypes: null,
    recommendChartType: "",
    labelName: null,
    row: null,
    column: null,
    dataSet: null,
  },
};

export { mockLine, mockLineRDB };