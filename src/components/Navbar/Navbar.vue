<template>
  <v-app>
    <v-app-bar app dense dark id="navigationbar">
      <v-icon>calendar_today</v-icon>
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
          <v-btn dark icon v-on="on">
            <v-icon dark="">mdi-dots-vertical</v-icon>
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

  methods: {}
};
</script>

<style>
#navigationbar {
  max-height: 50px;
}
</style>
