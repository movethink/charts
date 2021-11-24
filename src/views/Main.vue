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
    </div>
  </div>
</template>
<script>
import Charts from "../components/Charts";

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
