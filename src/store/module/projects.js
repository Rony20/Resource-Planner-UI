const state = {
  projects: [],
};

const getters = {
  getAllProjects: (state) => {
    return state.projects;
  },

  getArchivedProjects: (state) => {
    return state.projects.filter((project) => project.status === "Archived");
  },

  getActiveProjects: (state) => {
    return state.projects.filter((project) => project.status === "Active");
  },

  getProjectKeyList: (state) => {
    return state.projects.map(project => {
      return {key: project.key, name: project.name}
    })
  }
};

const mutations = {
  RESET_PROJECT_LIST: (state) => {
    state.projects = [];
  },

  GENERATE_PROJECT_LIST: (state, data) => {
    data.forEach((element) => {
      let project_object = {
        key: element["project_id"],
        name: element["project_name"],
        lead: element["assigned_pm"],
        status: element["status"] ? "Active" : "Archived",
        skillsets: element["skillset"],
        team: element["allocated_employees"],
        start_date: element["start_date"],
        end_date: element["end_date"],
        description: element["description"],
      };
      state.projects.push(project_object);
    });
  },

  UPDATE_PROJECT_PMO: (state, data) => {
    let project_obj = state.projects.find( project => project.key === data["project_id"])
    project_obj["name"] = data["project_name"]
    project_obj["lead"] = data["assigned_pm"]
    project_obj["start_date"] = data["start_date"]
    project_obj["end_date"] = data["end_date"]
    project_obj["skillsets"] = data["skillset"]
  },

  CREATE_UPDATE_TEAM: (state, data) => {
    let project_obj = state.projects.find(project => project.key === data["project_id"])
    project_obj["team"] = data["allocated_employees"]
  }
};

const actions = {
  RESET_PROJECT_LIST: ({ commit }) => {
    commit("RESET_PROJECT_LIST");
  },

  GENERATE_PROJECT_LIST: ({ commit }, payload) => {
    commit("GENERATE_PROJECT_LIST", payload);
  },

  UPDATE_PROJECT_PMO: ({ commit }, payload) => {
    commit("UPDATE_PROJECT_PMO", payload)
  },

  CREATE_UPDATE_TEAM: ({ commit }, payload) => {
    commit("CREATE_UPDATE_TEAM", payload)
  }
};

export default {
  state,
  getters,
  mutations,
  actions,
};
