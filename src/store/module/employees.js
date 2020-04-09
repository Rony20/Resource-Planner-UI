const state = {
  employees: [
    {
      id: 1,
      name: "Mehul Jadav",
      skills: ["React", "Vue.js", "Docker"],
      availability: [8, 8, 8, 8, 8]
    },
    {
      id: 2,
      name: "Rohan Borakhatariya",
      skills: ["Python", "Vue.js", "Docker", "React"],
      availability: [8, 8, 8, 8, 8]
    },
    {
      id: 3,
      name: "Maulik Kotak",
      skills: ["Vuetify", "Vue.js", "Docker"],
      availability: [8, 8, 8, 8, 8]
    },
    {
      id: 4,
      name: "Sameer Karli",
      skills: ["Angular", "Vue.js", "Docker"],
      availability: [8, 8, 8, 8, 8]
    },
    {
      id: 5,
      name: "Dhruvil Megha",
      skills: ["FastAPI", "Vue.js", "Docker"],
      availability: [8, 8, 8, 8, 8]
    }
  ]
};

const getters = {
  getEmployees: state => {
    return state.employees;
  }
};

const mutations = {
  RESET_EMPLOYEE_LIST: state => {
    state.employees = [];
  },

  GENERATE_EMPLOYEE_LIST: (state, data) => {
    data.forEach(element => {
      let employee_obj = {
        employee_id: element["employee_id"],
        employee_name: element["employee_name"],
        designation: element["designation"],
        skilss: element["skilss"],
        past_projects: element["past_projects"],
        current_projects: element["current_projects"],
        availability: element["availability"],
        is_allocated: element["is_available"]
      };
      state.employees.push(employee_obj);
    });
  }
};

const actions = {
  RESET_EMPLOYEE_LIST: ({ commit }) => {
    commit("RESET_EMPLOYEE_LIST");
  },

  GENERATE_EMPLOYEE_LIST: ({ commit }, payload) => {
    commit("GENERATE_EMPLOYEE_LIST", payload);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
