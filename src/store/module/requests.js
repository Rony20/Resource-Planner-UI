const state = {
  requests: {}
};

const getters = {
  getAllRequests: state => {
    return Object.assign({}, state.requests);
  },

  getRequestByProjectId: state => id => {
    return state.requests[id];
  }
};

const mutations = {
  RESET_REQUEST_LIST: state => {
    state.requests = {};
  },

  GENERATE_REQUEST_LIST: (state, data) => {
    data.forEach(element => {
      let request_object = {
        request_id: element["request_id"],
        project_id: element["project_id"],
        pm_id: element["pm_id"],
        employee_id: element["employee_id"],
        priority: element["priority"],
        requested_week: element["requested_week"],
        requested_hours: element["requested_hours"],
        request_date: element["request_date"],
        request_status: element["request_status"]
      };

      if (request_object.project_id in state.requests) {
        state.requests[request_object.project_id].push(request_object);
      } else {
        state.requests[request_object.project_id] = [];
        state.requests[request_object.project_id].push(request_object);
      }
    });
  }
};

const actions = {
  RESET_REQUEST_LIST: ({ commit }) => {
    commit("RESET_REQUEST_LIST");
  },

  GENERATE_REQUEST_LIST: ({ commit }, payload) => {
    commit("GENERATE_REQUEST_LIST", payload);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
