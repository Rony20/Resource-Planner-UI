<template>
  <v-app>
    <navbar></navbar>
    <router-view></router-view>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar/Navbar.vue";
export default {
  name: "App",
  components: {
    navbar: Navbar
  },
  data: () => ({
    //
  }),
  watch: {
    // eslint-disable-next-line no-unused-vars
    $route(to, from) {
      document.title = to.meta.title || "Resource Planner";
    }
  }
};
</script>
<style scoped></style>
