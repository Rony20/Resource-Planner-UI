
const state = {
  employees: [],
};

const getters = {
  getEmployees: (state) => {
    return state.employees;
  },

  getEmployeeById: (state) => (id) => {
    return state.employees.find((employee) => employee.employee_id === id);
  },
};

const mutations = {
  RESET_EMPLOYEE_LIST: (state) => {
    state.employees = [];
  },

  GENERATE_EMPLOYEE_LIST: (state, data) => {
    data.forEach((element) => {
      let employee_obj = {
        employee_id: element["employee_id"],
        employee_name: element["employee_name"],
        designation: element["designation"],
        skills: element["skills"],
        past_projects: element["past_projects"],
        current_projects: element["current_projects"],
        availability: element["availability"],
        is_allocated: element["is_allocated"],
      };
      state.employees.push(employee_obj);
    });
  },
};

const actions = {
  RESET_EMPLOYEE_LIST: ({ commit }) => {
    commit("RESET_EMPLOYEE_LIST");
  },

  GENERATE_EMPLOYEE_LIST: ({ commit }, payload) => {
    commit("GENERATE_EMPLOYEE_LIST", payload);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
