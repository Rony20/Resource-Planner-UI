<template>
  <v-app>
    <app-notification></app-notification>
    <v-app v-if="!isAuthenticated">
      <app-login></app-login>
    </v-app>
    <v-app v-else>
      <app-navbar id="navbar"></app-navbar>
      <router-view></router-view>
    </v-app>
  </v-app>
</template>

<script>
import AppNavbar from "./components/Navbar/Navbar.vue";
import AppLogin from "./components/Login/Login.vue";
import AppNotification from "./components/Common/AppNotification";
export default {
  name: "App",

  components: {
    "app-navbar": AppNavbar,
    "app-login": AppLogin,
    "app-notification": AppNotification
  },

  data() {
    return {};
  },

  methods: {
    loadDropdowns() {
      this.$getAllDropdowns()
        .then(response => {
          let data = response.data;
          this.$store.dispatch("GENERATE_SKILL_LIST", data["Skills"]);
          this.$store.dispatch("GENERATE_PM_LIST", data["PM"]);
        })
        .catch(error => console.log(error));
    },

    loadProjects() {
      this.$store.dispatch("RESET_PROJECT_LIST");

      this.$getAllProjectsData()
        .then(response => {
          this.$store.dispatch("GENERATE_PROJECT_LIST", response.data);
        })
        .catch(error => console.log(error));
    },

    loadEmployees() {
      this.$store.dispatch("RESET_EMPLOYEE_LIST");

      this.$getAllEmployeesData()
        .then(response => {
          this.$store.dispatch("GENERATE_EMPLOYEE_LIST", response.data);
        })
        .catch(error => console.log(error));
    }
  },
  computed: {
    currentRoute() {
      return this.$route.name;
    },
    isAuthenticated() {
      return this.$store.getters.getIsAuthenticated;
    }
  },
  watch: {
    $route(to) {
      document.title = to.meta.title || "Team Planner";
    }
  },

  created() {
    switch (this.currentRoute) {
      case "Projects":
        this.loadDropdowns();
        this.loadEmployees();
        break;
      case "Team":
        this.loadDropdowns();
        this.loadProjects();
        break;
      default:
        this.loadDropdowns();
        this.loadProjects();
        this.loadEmployees();
    }
  }
};
</script>

<style scoped>
#navbar {
  max-height: 50px;
}
</style>
