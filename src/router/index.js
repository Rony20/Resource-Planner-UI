import Vue from "vue";
import VueRouter from "vue-router";
import Projects from "../views/Projects.vue";
import Requests from "../views/Requests.vue";
import Employees from "../views/Employees.vue";
import Settings from "../views/Settings.vue";
import Reports from "../components/Reports/reports.vue";
Vue.use(VueRouter);

const routes = [
  // {
  //   path: "/",
  //   redirect: "/projects",
  //   name: "Projects"
  // },
  {
    path: "/projects",
    name: "Projects",
    component: Projects,
    meta: {
      title: "Projects"
    }
  },
  {
    path: "/requests",
    name: "Requests",
    component: Requests,
    meta: {
      title: "Requests"
    }
  },
  {
    path: "/team",
    name: "Team",
    component: Employees,
    meta: {
      title: "Team"
    }
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
    meta: {
      title: "Settings"
    }
  },
  {
    path: "/reports",
    name: "Reports",
    component: Reports,
    meta: {
      title: "Reports"
    }
  },
  {
    path: "*",
    redirect: "/projects",
    name: "Projects"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
