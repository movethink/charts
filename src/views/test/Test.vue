<template>
  <div>
    <button @click.right="clickTest">click</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      echartsOptions: {},
    };
  },
  components: {},
  methods: {
    clickTest(event) {
      event.preventDefault();
      console.log("click");
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
