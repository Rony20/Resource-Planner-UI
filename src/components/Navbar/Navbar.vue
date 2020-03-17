<template>
  <v-app>
    <v-app-bar app dense dark class="navbar">
      <v-icon>note</v-icon>
      <v-toolbar-title>Resource Planner</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        class="a"
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
    <router-view></router-view>
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
            { text: "Requests", route: "/requests" },
            { text: "Allocations", route: "/allocations" },
            { text: "Resources", route: "/resources" }
          ];

        case "PMO":
          return [
            { text: "Projects", route: "/projects" },
            { text: "Requests", route: "/requests" },
            { text: "Reports", route: "/reports" },
            { text: "Resources", route: "/resources" }
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

<style></style>
