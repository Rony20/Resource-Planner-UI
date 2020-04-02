import Vue from "vue";
import VueRouter from "vue-router";
import Projects from "../components/Projects/projects.vue";
import Requests from "../components/Requests/requests.vue";
import Employees from "../components/Employees/employees.vue";
import Reports from "../components/Reports/reports.vue";
import Allocations from "../components/Allocations/allocations.vue";
import Home from "../components/Home/home.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Home"
    }
  },
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
    path: "/employees",
    name: "Employees",
    component: Employees,
    meta: {
      title: "Employees"
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
    path: "/allocations",
    name: "Allocations",
    component: Allocations,
    meta: {
      title: "Allocations"
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
