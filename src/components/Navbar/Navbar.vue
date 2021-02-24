<template>
  <v-app>
    <v-app-bar dark app dense id="navigationbar">
      <v-icon left @click="refresh()">how_to_reg</v-icon>
      <v-toolbar-title>Team Planner</v-toolbar-title>
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
      <div class="text-center">
        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn fab small dark v-bind="attrs" v-on="on" text>
              <v-icon> logout </v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="grey lighten-2" primary-title>
              Are you sure you want to logout ?
            </v-card-title>
            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="logout">
                Yes
              </v-btn>
              <v-btn color="primary" text @click="dialog = false">
                No
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </v-app-bar>
  </v-app>
</template>

<script>
export default {
  name: "Navbar",

  data() {
    return {
      dialog: false,
      pers_actions: ["Profile", "Logout"],
    };
  },

  methods: {
    refresh() {
      this.$router.replace("/");
    },
    logout() {
      // console.log("Logout");
      this.$store.commit("logoutUser");
      this.$notify({
        title: "Success",
        text: "You have logged out succesfully",
        type: "success",
      });
      this.$router.replace("/");
    }
  },

  computed: {
    links() {
      switch (this.$store.state.user_role) {
        case "PM":
          return [
            { text: "Projects", route: "/projects" },
            { text: "Team", route: "/team" },
            { text: "Requests", route: "/requests" },
            { text: "Allocations", route: "/allocations" },
          ];

        case "PMO":
          return [
            { text: "Projects", route: "/projects" },
            { text: "Team", route: "/team" },
            { text: "Requests", route: "/requests" },
            { text: "Reports", route: "/reports" },
            { text: "Settings", route: "/settings" }
          ];

        // For any other role
        default:
          return [{ text: "Allocations", route: "/allocations" }];
      }
    },
  },
};
</script>

<style>
#navigationbar {
  max-height: 50px;
}
</style>
