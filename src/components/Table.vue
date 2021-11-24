<template>
  <div>
    <div class="table" style="height: 400px; overflow: auto">
      <ynComplexGrid :simpleData="options"></ynComplexGrid>
    </div>
  </div>
</template>
<script>
import ynComplexGrid from "yn-p1/libs/components/yn-complex-grid/";
export default {
  data() {
    return {
      message: "handson table",
      hotOptions: {
        colWidths: 20,
        rowHeights: 30,
      },
    };
  },
  components: {
    ynComplexGrid,
  },
  props: ["options"],
  methods: {},
  mounted() {},
};
</script>

<style scoped>
#charts {
  height: 100%;
  width: 100%;
}
</style>
