<template>
  <div>
    <Main></Main>
  </div>
</template>
<script>
import Main from "./views/Main";
export default {
  data() {
    return {
      message: "vue",
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
