import axios from "axios";
const axiosConfigAuth = {
  timeout: 90000
};

const axiosAuthInstance = axios.create(axiosConfigAuth);

const plugin = {
  install(Vue) {
    Vue.prototype.$login = function(username, password) {
      return axiosAuthInstance.get("login", {
        auth: {
          username: username,
          password: password
        }
      });
    };
  }
};

export default plugin;