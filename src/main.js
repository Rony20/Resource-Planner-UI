import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import axiosInstance from "./plugins/api.service";

Vue.config.productionTip = false;
Vue.use(axiosInstance);

Vue.filter("mapSkills", (value, skills) => {
  return skills.find(skill => skill.code === value).value;
})

Vue.filter("mapLeads", (value, leads) => {
  return leads.find(lead => lead.code === value).value;
})

Vue.filter("mapEmployees", (value, employees) => {
  return employees.find(emp => emp.id === value).name;
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
