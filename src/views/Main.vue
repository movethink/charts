<template>
  <div>
    <div class="title">
      <h6>{{ chartType }}</h6>
    </div>
    <div class="content">
      <Charts
        :options="echartsOptions"
        style="height: 400px; width: 750px; margin: 0 auto"
        v-if="chartType === 'charts'"
      ></Charts>
      <Table
        :options="tableOptions"
        style="height: 400px; width: 750px; margin: 0 auto"
        v-if="chartType === 'table'"
      ></Table>
    </div>
  </div>
</template>
<script>
import {
  mockBar,
  mockBar2,
  mockBar3,
  mockBar4,
  mockBarLongLegend,
  mockBarRDB,
  mockBarRDBOnlyY,
  mockBarRDBOnlyYReal,
  mockBarRDBOnlyYReal2,
  mockBarRDBOnlyYRealNew,
  mockBarRDBSameLegend,
  mockBarRDBSameLegendByDate,
  mockLine,
  mockLineRDB,
  mockgauge,
  mockgauge2,
  mockBarWaterfallChart,
  mockHorBar,
  mockHorBar2,
  mockMap,
  mockMixedLineAndBar,
  mockMixedLineAndBar2,
  mockPie,
  mockPieRDB,
  mockPieRDB2,
  mockPieRDB3,
  mockScatter,
  mockNumber,
  mockNumber2,
  mockNumberRDB,
  mockG6Tree,
  mockTree1,
  mockG6TreeTarget,
} from "../common/mock/chart";
import { mockHideBar, mockHideBar2 } from "../common/mock/chart/hideValue";
import Charts from "../components/Charts";
import Table from "../components/Table";
import {
  getEchartsData,
  formatToYNChart,
  transformsTable,
} from "../common/libreries/yn-chart-middleware";
// import {
//   getEchartsData,
//   formatToYNChart,
//   transformsTable,
// } from "yn-chart-middleware";
import {
  sdvMock,
  sdvMock2,
  sdvMock3,
  sdvMock4,
  sdvMock4R,
} from "../common/mock/table/sdv";

import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      echartsOptions: {},
      tableOptions: {},
      chartType: "charts",
    };
  },
  components: {
    Charts,
    Table,
  },
  methods: {
    /**
     * sdv数据结构转handson
     */
    transformsTable() {
      // sdv table数据生成handson table数据
      const handsonData = transformsTable(sdvMock4R, {
        hideNullValue: false,
        mergeCells: true,
      });
      // console.log(sdvMock3, "sdvMock3");
      console.log(handsonData, "handsonData");
      this.tableOptions = handsonData;
    },
    /**
     * 可视化数据结构转echarts options
     */
    initEchartsOptions() {
      // 生成echars options
      let options = getEchartsData(mockLine, {
        hideNullValue: false, //是否去除零值
        legendStrict: true, // 是否严格使用legend字段显示图的系列，主要用于legend中只有一个维度成员的情况
      });
      // 生成YN样式风格的echarts options
      options = formatToYNChart(options, {
        completeXAxisName: true, // 是否使用完整的x轴名称
        tooltipTypeSemple: true, // tooltip是否不使用axis样式
      });
      this.echartsOptions = options;
    },
    initStore() {
      this.$store
        .dispatch("main/getAllProducts", {
          data: {
            name: "test",
            value: "123456",
            id: "2222222",
            dataObj: {
              name: "test2",
              value: "654321",
              id: "6666666",
              obj: {
                name: "test3",
                value: "888",
                id: "88888888",
              },
            },
          },
        })
        .then(() => {
          this.$store.dispatch("main/getAllProducts", {
            data: {
              name: "test",
              value: "123456",
              id: "2222222",
              dataObj: {
                name: "test2",
                value: "654321",
                id: "6666666",
                obj: {
                  name: "test3",
                  value: "888",
                  id: "88888888",
                },
              },
            },
          });
        });
    },
  },
  watch: {
    allObj: {
      handler(newValue, oldValue) {},
      deep: true,
    },
  },
  computed: {
    ...mapState({
      // 箭头函数可使代码更简练
      all: (state) => state.main.all,
    }),
    ...mapGetters({
      allObj: "main/allObj",
    }),
  },
  mounted() {
    this.transformsTable();
    this.initEchartsOptions();
    this.initStore();
  },
};
</script>

<style scoped>
h6 {
  color: red;
}
.content {
  padding: 40px;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  width: auto;
  height: auto;
  overflow: hidden;
}
</style>
