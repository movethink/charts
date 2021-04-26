<template>
  <div>
    <p>input: {{ input }}</p>
    <p><button @click="sort">sort</button></p>
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
    sort(event) {
      console.log("input:", this.input);
      let oldList = JSON.parse(JSON.stringify(this.input));
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
      console.log(sortList, "sortList");
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
