import "es6-promise/auto";
import Vue from "vue";
import App from "./App.vue";
import store from "./store";

new Vue({
  render: (c) => c(App),
  store,
}).$mount("#app");
