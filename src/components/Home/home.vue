<template>
  <v-app>
    <navbar id="navbar"></navbar>
    <router-view></router-view>
    <v-snackbar
      right
      top
      v-model="snackbar.show"
      :timeout="snackbar.timeout"
      :color="snackbar.color"
    >
      {{ snackbar.text }}
    </v-snackbar>
  </v-app>
</template>

<script>
import Navbar from "../Navbar/Navbar.vue";
export default {
  name: "Home",
  data() {
    return { snackbar: this.$store.state.snackbar };
  },
  components: {
    navbar: Navbar
  },
  watch: {
    $route(to) {
      document.title = to.meta.title || "Resource Planner";
    }
  }
};
</script>

<style scoped>
#navbar {
  max-height: 50px;
}
</style>
