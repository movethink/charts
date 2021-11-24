// initial state
const state = () => ({
  all: [],
  text: "dataObj",
});

// getters
const getters = {
  allObj: (state) => {
    return setDataObj(state);
  },
};

// actions
const actions = {
  getAllProducts({ commit }, result) {
    let products = result.data;
    commit("setProducts", products);
  },
};

// mutations
const mutations = {
  setProducts(state, products) {
    state.all = products;
  },
};

function setDataObj(state) {
  // state.pageMetadata[state.curFormFactor] =
  //   state.pageMetadata[state.curFormFactor] || {};
  if (!state.all[state.text]) {
    state.all[state.text] = {};
  }
  return state.all[state.text];
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
