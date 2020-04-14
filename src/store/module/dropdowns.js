const state = {
  appSkills: [],
  appPms: []
};

const getters = {
  getAllSkills: state => {
    return state.appSkills;
  },

  getAllPms: state => {
    return state.appPms;
  }
};

const mutations = {
  GENERATE_SKILL_LIST: (state, data) => {
    state.appSkills = data;
  },

  GENERATE_PM_LIST: (state, data) => {
    state.appPms = data;
  }
};

const actions = {
  GENERATE_SKILL_LIST: ({ commit }, payload) => {
    commit("GENERATE_SKILL_LIST", payload);
  },

  GENERATE_PM_LIST: ({ commit }, payload) => {
    commit("GENERATE_PM_LIST", payload);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
