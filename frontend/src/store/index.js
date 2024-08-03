import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      userId: null,
      isAuthenticated: false,
    };
  },
  mutations: {
    setUserId(state, userId) {
      console.log("Setting userId:", userId); // Log the userId setting
      state.userId = userId;
      state.isAuthenticated = true;
    },
    logout(state) {
      console.log("Logging out"); // Log logout action
      state.userId = null;
      state.isAuthenticated = false;
    },
  },
  actions: {
    login({ commit }, userId) {
      console.log("Dispatching login with userId:", userId); // Log login dispatch
      commit("setUserId", userId);
    },
    logout({ commit }) {
      console.log("Dispatching logout"); // Log logout dispatch
      commit("logout");
    },
  },
  getters: {
    isAuthenticated(state) {
      return state.isAuthenticated;
    },
    userId(state) {
      return state.userId;
    },
  },
});

export default store;
