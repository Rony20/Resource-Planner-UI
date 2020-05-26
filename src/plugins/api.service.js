import axios from "axios";
const axiosConfigAuth = {
  timeout: 90000
};

const axiosInstance = axios.create(axiosConfigAuth);

const plugin = {
  install(Vue) {
    Vue.prototype.$getAllEmployeesData = function() {
      return axiosInstance.get("get-all-employees");
    };
    (Vue.prototype.$getEmployeeById = function(id) {
      return axiosInstance.get("get-employees/" + id);
    }),
      (Vue.prototype.$getEmployeeByName = function(name) {
        return axiosInstance.get("get-employee-by-name/" + name);
      }),
      (Vue.prototype.$addEmployee = function(empObj) {
        return axiosInstance.post("add-employee/", empObj);
      });
    Vue.prototype.$updateEmployee = function(id, empObj) {
      return axiosInstance.patch("update-employee/" + id, empObj);
    };
    Vue.prototype.$getAllProjectsData = function() {
      return axiosInstance.get("api/all-project-details");
    };
    Vue.prototype.$syncJira = function() {
      return axiosInstance.get("sync/jira");
    };
    Vue.prototype.$syncHRMS = function() {
      return axiosInstance.get("sync/hrms");
    };
    Vue.prototype.$editProjectDetailsPmo = function(key, payload) {
      return axiosInstance.patch(
        "api/update-project-details-pmo/" + key,
        payload
      );
    };
    Vue.prototype.$createUpdateTeam = function(key, payload) {
      return axiosInstance.patch("api/create-update-team/" + key, payload);
    };
    Vue.prototype.$getAllDropdowns = function() {
      return axiosInstance.get("all-dropdowns");
    };
    Vue.prototype.$getAllRequestsData = function() {
      return axiosInstance.get("all-requests");
    };
    Vue.prototype.$saveRequest = function(payload) {
      return axiosInstance.post("make-new-request", payload, {
        params: {
          conflicted: false
        }
      });
    };
    Vue.prototype.$getRequestsForPm = function(pm_id, week_start, week_end) {
      return axiosInstance.get("get-all-requests-by-pm/" + pm_id, {
        params: {
          week_start,
          week_end
        }
      });
    };
    Vue.prototype.$checkConflict = function(employee_id, pm_id) {
      return axiosInstance.get("check-conflicts/" + employee_id, {
        params: {
          pm_id
        }
      });
    };
    Vue.prototype.$projectTeamByPm = function(pm_id) {
      return axiosInstance.get(
        "get-projects-with-remaining-requests-by-pm/" + pm_id
      );
    };
  }
};
export default plugin;
