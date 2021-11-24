<template>
  <div>
    <h3>{{ title }}</h3>
    <Main></Main>
  </div>
</template>
<script>
import Main from "./views/Main";
export default {
  data() {
    return {
      title: "YN-chart-middleware",
    };
  },
  components: {
    Main,
  },
};
</script>

<style scoped>
h6 {
  color: red;
}
</style>
