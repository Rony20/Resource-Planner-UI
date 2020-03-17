import Vue from "vue";
import VueRouter from "vue-router";
import Projects from "../components/Projects/projects.vue";
import Requests from "../components/Requests/requests.vue";
import Resources from "../components/Resources/resources.vue";
import Reports from "../components/Reports/reports.vue";
import Allocations from "../components/Allocations/allocations.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Projects,
    meta: {
      title: "Projects"
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
    path: "/resources",
    name: "Resources",
    component: Resources,
    meta: {
      title: "Resources"
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
