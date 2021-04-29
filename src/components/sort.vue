<template>
  <div>
    <p>input: {{ input }}</p>
    <p><button @click="sortFun(input)">sort</button></p>
    <p>output:{{ output }}</p>
  </div>
</template>
<script>
export default {
  name: "Sort",
  data() {
    return {
      input: [5, 3, 9, 8, 1, 4, 6],
      output: [],
    };
  },
  components: {},
  methods: {
    sort(arr) {
      let oldList = arr;
      let sortList = [];
      while (oldList.length > 0) {
        let current = oldList.shift();
        if (sortList.length === 0) {
          sortList.push(current);
        } else {
          for (let i = 0; i < sortList.length; i++) {
            let curr = sortList[i];
            if (curr > current) {
              sortList.splice(i, 0, current);
              break;
            } else {
              if (i === sortList.length - 1) {
                sortList.push(current);
                break;
              }
            }
          }
        }
      }
      return sortList;
    },
    insertionSort(arr) {
      for (let i = 1; i < arr.length; i++) {
        let preIndex = i - 1;
        while (preIndex >= 0 && arr[preIndex + 1] < arr[preIndex]) {
          let current = arr[preIndex + 1];
          arr[preIndex + 1] = arr[preIndex];
          arr[preIndex] = current;
          preIndex--;
        }
      }
      return arr;
    },
    sortFun(list) {
      list = JSON.parse(JSON.stringify(list));
      this.output = this.insertionSort(list);
    },
  },
  mounted() {},
};
</script>

<style scoped>
h6 {
  color: red;
}
</style>
