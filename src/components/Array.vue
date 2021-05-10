<template>
  <div>
    <p><button @click="find(nums)">find</button></p>
  </div>
</template>
<script>
export default {
  name: "Array",
  data() {
    return {
      // nums: [1, 3, 4, 5, 7, 8, 10, 12, 14, 17, 22],
      nums: [-1, 0, 3, 5, 9, 12],
    };
  },
  components: {},
  methods: {
    /**
     * nums 检索数组
     * target 检索值
     */
    search(nums, target) {
      let left = 0,
        right = nums.length - 1;
      while (left <= right) {
        let middle = Math.floor((left + right) / 2);
        if (nums[middle] > target) {
          right = middle - 1;
        } else if (nums[middle] < target) {
          left = middle + 1;
        } else {
          return middle;
        }
      }
      return -1;
    },
    find(nums) {
      let index = this.search(nums, 2);
      console.log(index, "index");
    },
  },
  mounted() {
    console.log(this.nums, "nums");
  },
};
</script>

<style scoped>
h6 {
  color: red;
}
</style>
