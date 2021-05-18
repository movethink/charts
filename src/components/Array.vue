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
      // nums: [5, 6, 7, 7, 8, 8, 8, 8, 8, 10],
      // nums: [0, 0, 1, 1, 1, 2, 2, 3, 3, 4],
      nums: [0, 1, 0, 3, 12],
    };
  },
  components: {},
  mounted() {
    console.log(this.nums, "nums");
  },
  methods: {
    action(nums) {
      // let index = this.searchInsert(nums, 6);
      // let index = this.removeDuplicates(nums);
      // let index = this.searchRange(nums, 9);
      // this.mySqrt2(15);
      // let flag = this.isPerfectSquare(24);
      // console.log(flag, "flag");
      let index = this.moveZeroes(nums);
      console.log(index, "index");
    },
    moveZeroes(nums) {
      // [0,1,0,3,12]
      let flag = 0;
      let size = nums.length;
      for (let i = 0; i < size; i++) {
        if (nums[i] !== 0) {
          nums[flag++] = nums[i];
        }
      }
      while (flag < size) {
        nums[flag++] = 0;
      }
      console.log(nums, "nums");
      return nums;
    },
    removeDuplicates(nums) {
      // [0,0,1,1,1,2,2,3,3,4]
      let flag = 0;
      for (let i = 1; i <= nums.length; i++) {
        if (nums[i - 1] !== nums[i]) {
          nums[flag] = nums[i - 1];
          flag++;
        }
      }
      console.log(nums, "nums");
      return flag;
    },
    /**
     * 判断num是否是一个完全平方数
     */
    isPerfectSquare(num) {
      let left = 0,
        right = num;
      while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (mid * mid > num) {
          right = mid - 1;
        } else if (mid * mid < num) {
          left = mid + 1;
        } else if (mid * mid === num) {
          return true;
        }
      }
      return false;
    },
    mySqrt(x) {
      console.log(x, "x");
      let left = 0,
        right = x + 1;
      while (left < right) {
        let mid = Math.floor((left + right) / 2);
        if (mid * mid < x) {
          left = mid + 1;
        } else if (mid * mid > x) {
          right = mid;
        } else if (mid * mid === x) {
          return mid;
        }
      }
      console.log(left - 1, "sqrt");
      return left - 1;
    },
    mySqrt2(x) {
      console.log(x, "x");
      let left = 0,
        right = x;
      while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (mid * mid < x) {
          left = mid + 1;
        } else if (mid * mid > x) {
          right = mid - 1;
        } else if (mid * mid === x) {
          return mid;
        }
      }
      console.log(right, "sqrt");
      return right;
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
};
</script>

<style scoped>
h6 {
  color: red;
}
</style>
