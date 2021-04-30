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
      // input: [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
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
      let num = 0;
      for (let i = 1; i < arr.length; i++) {
        let preIndex = i - 1;
        while (preIndex >= 0 && arr[preIndex + 1] < arr[preIndex]) {
          let current = arr[preIndex + 1];
          arr[preIndex + 1] = arr[preIndex];
          arr[preIndex] = current;
          preIndex--;
          num++;
        }
      }
      console.log(num, "insertionSort num");
      return arr;
    },
    bubbleSort(arr) {
      let num = 0;
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
          if (arr[j] > arr[j + 1]) {
            let current = arr[j + 1];
            arr[j + 1] = arr[j];
            arr[j] = current;
          }
          num++;
        }
      }
      console.log(num, "bubbleSort num");
      return arr;
    },
    sortFun(list) {
      console.log(list, "input");
      let newList = JSON.parse(JSON.stringify(list));
      // this.output = this.insertionSort(newList);
      this.output = this.bubbleSort(newList);
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
