import Vue from "vue";
import Vuex from "vuex";

import ProjectsData from "./module/projects.js";
import EmployeesData from "./module/employees.js";
import DropdownsData from "./module/dropdowns.js";
import RequestsData from "./module/requests.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user_role: "PMO"
  },
  mutations: {},
  actions: {},
  modules: {
    ProjectsData,
    EmployeesData,
    DropdownsData,
    RequestsData
  }
});
