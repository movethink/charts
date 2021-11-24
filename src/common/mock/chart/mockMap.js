let mockMapOptions = {
  series: [
    {
      name: "default",
      type: "map",
      map: "北京",
      roam: false,
      data: [
        { name: "顺义区", value: "32423" },
        { name: "延庆区", value: "12923" },
        { name: "密云区", value: "423" },
        { name: "怀柔区", value: "1923" },
        { name: "昌平区", value: "133423" },
        { name: "丰台区", value: "99923" },
        { name: "通州区", value: "32723" },
        { name: "房山区", value: "93723" },
        { name: "大兴区", value: "8731" },
        { name: "平谷区", value: "132" },
        { name: "门头沟区", value: "900" },
        { name: "海淀区", value: "1320" },
        { name: "朝阳区", value: "2300" },
        { name: "东城区", value: "23" },
        { name: "西城区", value: "300" },
        { name: "石景山区", value: "3000" },
      ],
    },
  ],
};

let mockMap = {
  data: {
    tableId: "8b2bec1ff31a46b3b2a980ec3b76794f",
    chartType: "mapChart",
    pageAxis: { dim: [] },
    legend: {
      dim: [],
    },
    xAxis: {
      dim: [
        {
          isIndex: 0,
          dimensionType: "",
          dimensionId: "82d5e2e4e9d54bd1b5d9aed37899e21f",
          dimensionName: "地理维度",
          dimensionUnit: null,
          elementId: [
            "1111",
            "2222",
            "3333",
            "4444",
            "5555",
            "6666",
            "7777",
            "8888",
            "9999",
          ],
          element: [
            "顺义区",
            "延庆区",
            "昌平区",
            "丰台区",
            "通州区",
            "房山区",
            "大兴区",
            "平谷区",
            "门头沟区",
          ],
          decimal: null,
          elementParentId: null,
          groupIndex: "",
          isAmbiguous: "",
          max: "",
          measureUnit: "",
          showType: "",
        },
      ],
    },
    yAxis: {
      measure: [
        {
          measureId: "abdfb706f5d342e390b95ae478e18424",
          measureName: "销售门店个数",
          showType: "",
          measureUnit: "",
          max: "",
          decimal: 2,
          position: "right",
          isAmbiguous: "",
        },
      ],
    },
    resultData: [
      {
        地理维度: "1111",
        销售门店个数: 1,
      },
      {
        地理维度: "2222",
        销售门店个数: 2,
      },
      {
        地理维度: "3333",
        销售门店个数: 3,
      },
      {
        地理维度: "4444",
        销售门店个数: 4,
      },
      {
        地理维度: "5555",
        销售门店个数: 5,
      },
      {
        地理维度: "6666",
        销售门店个数: 6,
      },
      {
        地理维度: "7777",
        销售门店个数: 7,
      },
      {
        地理维度: "8888",
        销售门店个数: 8,
      },
      {
        地理维度: "9999",
        销售门店个数: 9,
      },
    ],
    switchChartTypes: null,
    recommendChartType: "",
  },
};

export { mockMapOptions, mockMap };
