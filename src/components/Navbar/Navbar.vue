<template>
  <v-app>
    <v-app-bar app dense id="navigationbar">
      <v-icon left @click="refresh()">calendar_today</v-icon>
      <v-toolbar-title>Resource Planner</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        v-for="link in links"
        :key="link.text"
        depressed
        router
        :to="link.route"
        >{{ link.text }}</v-btn
      >
      <v-icon>notifications</v-icon>
      <v-menu bottom left>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="(item, i) in pers_actions" :key="i">
            <v-list-item-title>{{ item }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </v-app>
</template>

<script>
export default {
  name: "Navbar",

  data() {
    return {
      pers_actions: ["Profile", "Logout"]
    };
  },

  methods: {
    refresh() {
      this.$router.replace("/");
    },

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
    links() {
      switch (this.$store.state.user_role) {
        case "PM":
          return [
            { text: "Projects", route: "/projects" },
            { text: "Employees", route: "/employees" },
            { text: "Requests", route: "/requests" },
            { text: "Allocations", route: "/allocations" }
          ];

        case "PMO":
          return [
            { text: "Projects", route: "/projects" },
            { text: "Employees", route: "/employees" },
            { text: "Requests", route: "/requests" },
            { text: "Reports", route: "/reports" }
          ];

        // For any other role
        default:
          return [{ text: "Allocations", route: "/allocations" }];
      }
    }
  },

  created() {
    this.loadProjects();
    this.loadEmployees();
    this.loadDropdowns();
  }
};
</script>

<style>
#navigationbar {
  max-height: 50px;
}
</style>
