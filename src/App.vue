<template>
  <v-app>
    <app-notification></app-notification>
    <app-navbar id="navbar"></app-navbar>
    <router-view></router-view>
  </v-app>
</template>

<script>
import AppNavbar from "./components/Navbar/Navbar.vue";
import AppNotification from "./components/Common/AppNotification";
export default {
  name: "App",

  components: {
    "app-navbar": AppNavbar,
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
    },
  },

  watch: {
    $route(to) {
      document.title = to.meta.title || "Resource Planner";
    }
  },

  created() {
    this.loadDropdowns();
    this.loadEmployees();
  }
};
</script>

<style scoped>
#navbar {
  max-height: 50px;
}
</style>
