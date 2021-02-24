const state = {
  isAuthenticated: false
};

const getters = {
  getIsAuthenticated(state) {
    return state.isAuthenticated;
  }
};

const mutations = {
  setAuthenticated(state, data) {
    state.isAuthenticated = true;
    localStorage.setItem("token", data.token);
    localStorage.setItem("id", data.id);
    localStorage.setItem("name", data.name);
    localStorage.setItem("role", data.role);
    state.user_role = data.role;
  },
  logoutUser(state) {
    state.isAuthenticated = false;
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("role");
  }
};

export default {
  state,
  getters,
  mutations
};
