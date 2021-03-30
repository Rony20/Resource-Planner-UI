import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Notifications from "vue-notification";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import axiosInstance from "./plugins/api.service";
import axiosAuthInstance from "./plugins/api.service.auth";
import Moment from "moment";

Vue.config.productionTip = false;
Vue.use(Notifications);
Vue.use(axiosInstance);
Vue.use(axiosAuthInstance);

Moment.locale("en");
Object.defineProperty(Vue.prototype, "$moment", { value: Moment });

Vue.filter("mapSkills", (value, skills) => {
  let skill_obj = skills.find(skill => skill.code === value);
  if (skill_obj === undefined) return "No Match";
  else return skill_obj.value;
});

Vue.filter("mapLeads", (value, leads) => {
  let lead_obj = leads.find(lead => lead.code === parseInt(value));
  if (lead_obj === undefined) return "No Match";
  else return lead_obj.value;
});

Vue.filter("mapEmployees", (value, employees) => {
  let employee_obj = employees.find(emp => emp.employee_id === value);
  if (employee_obj === undefined) return "No Match";
  else return employee_obj.employee_name;
});

Vue.filter("mapProjects", (value, projects) => {
  let project_obj = projects.find(project => project.key === value);
  if (project_obj === undefined) return "No Match";
  else return project_obj.name;
});

Vue.filter("mapKeyWithPm", (value, projects) => {
  let project_obj = projects.find(project => project.key === value);
  if (project_obj === undefined) return "No Match";
  else return project_obj.lead;
});

Vue.filter("formatDate", value => {
  return value.format("MMM D, YYYY");
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
