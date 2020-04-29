import Vue from "vue";
import VueRouter from "vue-router";
import Projects from "../views/Projects.vue";
import Requests from "../views/Requests.vue";
import Employees from "../views/Employees.vue"
import Reports from "../components/Reports/reports.vue";
import Allocations from "../components/Allocations/allocations.vue";
// import Home from "../components/Home/home.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/projects",
    name: "Projects",
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
