<template>
  <v-app>
    <app-navbar id="navbar"></app-navbar>
    <router-view></router-view>
  </v-app>
</template>

<script>
import Navbar from "../Navbar/Navbar.vue";

export default {
  name: "Home",

  data() {
    return {  };
  },

  components: {
    "app-navbar": Navbar
  },

  methods: {
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
