let mockG6TreeTarget = {
  data: {
    id: "g1",
    name: "权益净利率",
    status: "A",
    variableUp: true,
    value: [
      {
        key: "1",
        label: "期末",
        value: "3.71%",
      },
      {
        key: "2",
        label: "期初",
        value: "4.27%",
      },
      {
        key: "3",
        label: "变化",
        value: "-0.56%",
      },
    ],
    children: [
      {
        id: "g2",
        name: "权益净利率",
        status: "B",
        variableUp: false,
        value: [
          {
            key: "1",
            label: "期末",
            value: "3.71%",
          },
          {
            key: "2",
            label: "期初",
            value: "4.27%",
          },
          {
            key: "3",
            label: "变化",
            value: "-0.56%",
          },
        ],
        children: [
          {
            id: "g3",
            name: "权益净利率",
            status: "C",
            variableUp: false,
            value: [
              {
                key: "1",
                label: "期末",
                value: "3.71%",
              },
              {
                key: "2",
                label: "期初",
                value: "4.27%",
              },
              {
                key: "3",
                label: "变化",
                value: "-0.56%",
              },
            ],
            children: [],
          },
          {
            id: "g4",
            name: "权益净利率",
            status: "B",
            variableUp: true,
            value: [
              {
                key: "1",
                label: "期末4",
                value: "3.71%",
              },
              {
                key: "2",
                label: "期初4",
                value: "4.27%",
              },
              {
                key: "3",
                label: "变化4",
                value: "-0.56%",
              },
            ],
            children: [],
          },
        ],
      },
    ],
  },
};

const mockG6Tree = {
  data: {
    chartType: "treeChart",
    legend: { dim: [] },
    xAxis: {
      dim: [
        {
          isIndex: 0,
          dimensionType: "",
          dimensionId: "bceb4e6c3aae11ebbc878723d26d3be5",
          dimensionName: "1130产品",
          dimensionUnit: null,
          elementId: [
            "255706463aaf11ebbc874de36d2fa20c",
            "328a156a3aaf11ebbc87914c4a3f5641",
            "3a485a693aaf11ebbc8777edb907bf36",
            "3f7fa65f3aaf11ebbc876bee6facc9fc",
            "2c1a97943aaf11ebbc87937235d8369a",
            "4569797d3aaf11ebbc87412e953bf5e3",
            "49a527623aaf11ebbc872788925b740e",
            "4e59aec73aaf11ebbc87ff197f337030",
          ],
          element: [
            "家用电器",
            "电视机",
            "电冰箱",
            "电洗衣机",
            "生活用品",
            "吸油烟机",
            "热水器",
            "电磁炉",
          ],
          elementParentId: [
            "bceb4e6c3aae11ebbc878723d26d3be5",
            "255706463aaf11ebbc874de36d2fa20c",
            "255706463aaf11ebbc874de36d2fa20c",
            "255706463aaf11ebbc874de36d2fa20c",
            "bceb4e6c3aae11ebbc878723d26d3be5",
            "2c1a97943aaf11ebbc87937235d8369a",
            "2c1a97943aaf11ebbc87937235d8369a",
            "2c1a97943aaf11ebbc87937235d8369a",
          ],
          decimal: null,
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
          measureId: "b4e694883aaf11ebbc874334b26140b3",
          measureName: "十万到五十万",
          showType: "line",
          measureUnit: "",
          max: "",
          decimal: 3,
          position: "left",
          isAmbiguous: "",
        },
        {
          measureId: "b4e694883aaf11ebbc874334b26140b4",
          measureName: "五十万一百万",
          showType: "line",
          measureUnit: "",
          max: "",
          decimal: 3,
          position: "right",
          isAmbiguous: "",
        },
      ],
    },
    resultData: [
      {
        lt组织: "a83d11cd2adf11ebb52be9687ea7dc0c",
        科目共享成员: "e27abee43a0311ebade2e53685cc95a3",
        LT期间20: "8744f97c2adf11ebb52b17dc8abaebcc",
        "1130产品": "2c1a97943aaf11ebbc87937235d8369a",
        lt区域: "721a120335f611eba12e993cab4b0619",
        十万到五十万: 22.0,
        五十万一百万: 12.0,
      },
      {
        lt组织: "a83d11cd2adf11ebb52be9687ea7dc0c",
        科目共享成员: "e27abee43a0311ebade2e53685cc95a3",
        LT期间20: "8744f97c2adf11ebb52b17dc8abaebcc",
        "1130产品": "255706463aaf11ebbc874de36d2fa20c",
        lt区域: "721a120335f611eba12e993cab4b0619",
        十万到五十万: 10.0,
        五十万一百万: 12.0,
      },
      {
        lt组织: "a83d11cd2adf11ebb52be9687ea7dc0c",
        科目共享成员: "e27abee43a0311ebade2e53685cc95a3",
        LT期间20: "8744f97c2adf11ebb52b17dc8abaebcc",
        "1130产品": "4e59aec73aaf11ebbc87ff197f337030",
        lt区域: "721a120335f611eba12e993cab4b0619",
        十万到五十万: 8.0,
        五十万一百万: 12.0,
      },
      {
        lt组织: "a83d11cd2adf11ebb52be9687ea7dc0c",
        科目共享成员: "e27abee43a0311ebade2e53685cc95a3",
        LT期间20: "8744f97c2adf11ebb52b17dc8abaebcc",
        "1130产品": "4569797d3aaf11ebbc87412e953bf5e3",
        lt区域: "721a120335f611eba12e993cab4b0619",
        十万到五十万: 5.0,
        五十万一百万: 12.0,
      },
      {
        lt组织: "a83d11cd2adf11ebb52be9687ea7dc0c",
        科目共享成员: "e27abee43a0311ebade2e53685cc95a3",
        LT期间20: "8744f97c2adf11ebb52b17dc8abaebcc",
        "1130产品": "49a527623aaf11ebbc872788925b740e",
        lt区域: "721a120335f611eba12e993cab4b0619",
        十万到五十万: 9.0,
        五十万一百万: 12.0,
      },
      {
        lt组织: "a83d11cd2adf11ebb52be9687ea7dc0c",
        科目共享成员: "e27abee43a0311ebade2e53685cc95a3",
        LT期间20: "8744f97c2adf11ebb52b17dc8abaebcc",
        "1130产品": "3f7fa65f3aaf11ebbc876bee6facc9fc",
        lt区域: "721a120335f611eba12e993cab4b0619",
        十万到五十万: 4.0,
        五十万一百万: 12.0,
      },
      {
        lt组织: "a83d11cd2adf11ebb52be9687ea7dc0c",
        科目共享成员: "e27abee43a0311ebade2e53685cc95a3",
        LT期间20: "8744f97c2adf11ebb52b17dc8abaebcc",
        "1130产品": "3a485a693aaf11ebbc8777edb907bf36",
        lt区域: "721a120335f611eba12e993cab4b0619",
        十万到五十万: 3.0,
        五十万一百万: 12.0,
      },
      {
        lt组织: "a83d11cd2adf11ebb52be9687ea7dc0c",
        科目共享成员: "e27abee43a0311ebade2e53685cc95a3",
        LT期间20: "8744f97c2adf11ebb52b17dc8abaebcc",
        "1130产品": "328a156a3aaf11ebbc87914c4a3f5641",
        lt区域: "721a120335f611eba12e993cab4b0619",
        十万到五十万: 3.0,
        五十万一百万: 12.0,
      },
    ],
  },
};

const mockTree1 = {
  data: {
    switchChartTypes: ["barChart", "number", "table"],
    recommendChartType: "",
    yAxis: {
      measure: [
        {
          measureId: "11ec0fa8568d36198a4555f22477a692",
          max: "",
          showType: "",
          measureUnit: "",
          position: "left",
          decimal: null,
          measureName: "2019",
          isAmbiguous: "",
          measureType: "",
        },
      ],
    },
    xAxis: {
      dim: [
        {
          elementId: ["11ec0fa8f0bdddf08a454bb67d7a5b2f"],
          dimensionType: "",
          max: "",
          dimensionUnit: null,
          elementParentId: ["11ec0fa8efd0bf4a8a4591fffabc633b"],
          measureUnit: "",
          isIndex: 0,
          elementLevel: [1],
          groupIndex: "",
          dimensionName: "zt类型0930",
          dimensionId: "11ec0fa8efd0bf4a8a4591fffabc633b",
          elementHasChildren: ["false"],
          showType: "",
          decimal: null,
          element: ["数值"],
          isAmbiguous: "",
        },
      ],
    },
    resultData: [
      {
        2019: 329.0,
        zt版本0930: "11ec0fb224546a6e8a4575ddcf3ba844",
        zt类型0930: "11ec0fa8f0bdddf08a454bb67d7a5b2f",
      },
    ],
    legend: { dim: [] },
    chartType: "treeChart",
    tableId: "11ec4c2fc78a353f9dd02fd7af395bb9",
    labelName: null,
  },
};

export { mockG6TreeTarget, mockG6Tree, mockTree1 };
