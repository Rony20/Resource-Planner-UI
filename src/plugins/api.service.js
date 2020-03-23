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
      return axiosInstance.get("get-employee-by-id/" + id);
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
  }
};
export default plugin;
