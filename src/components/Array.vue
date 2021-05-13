<template>
  <div>
    <p><button @click="action(nums)">action</button></p>
  </div>
</template>
<script>
export default {
  name: "Array",
  data() {
    return {
      // nums: [1, 3, 4, 5, 7, 8, 10, 12, 14, 17, 22],
      // nums: [-1, 0, 3, 5, 9, 12],
      // nums: [0, 1, 2, 2, 3, 0, 4, 2],
      nums: [5, 6, 7, 7, 8, 8, 8, 8, 8, 10],
    };
  },
  components: {},
  methods: {
    action(nums) {
      // let index = this.searchInsert(nums, 6);
      // let index = this.removeElement3(nums, 2);
      let index = this.searchRange(nums, 9);
      console.log(index, "index");
    },
    // 在排序数组中查找第一个和最后一个元素
    searchRange(nums, target) {
      let left = 0,
        right = nums.length - 1,
        res = [-1, -1];
      while (left < right) {
        let mid = Math.floor((left + right) / 2);
        if (nums[mid] >= target) {
          right = mid;
        } else {
          left = mid + 1;
        }
      }
      if (nums[left] !== target) {
        return res;
      } else {
        res[0] = left;
      }
      right = nums.length;
      while (left < right) {
        let mid = Math.floor((left + right) / 2);
        if (nums[mid] <= target) {
          left = mid + 1;
        } else {
          right = mid;
        }
      }
      res[1] = left - 1;
      return res;
    },
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
    // 寻找插入值索引
    searchInsert(nums, target) {
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
      return left;
    },
    removeElement1(nums, val) {
      let flagValue = null;
      let num = 0;
      for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < nums.length - 1 - i; j++) {
          if (nums[j] === val) {
            flagValue = nums[j];
            nums[j] = nums[j + 1];
            nums[j + 1] = flagValue;
          }
        }
      }
      for (let k = 0; k < nums.length; k++) {
        if (nums[k] !== val) {
          num++;
        }
      }
      return num;
    },
    removeElement2(nums, val) {
      let size = nums.length;
      for (let i = 0; i < size; i++) {
        if (nums[i] === val) {
          for (let k = i; k < size - 1; k++) {
            nums[k] = nums[k + 1];
          }
          i--;
          size--;
        }
      }
      console.log(nums, "nums");
      return size;
    },
    removeElement3(nums, val) {
      let flag = 0;
      for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== val) {
          nums[flag] = nums[i];
          flag++;
        }
      }
      console.log(nums, "nums");
      return flag;
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
