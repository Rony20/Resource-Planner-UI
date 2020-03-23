<template>
  <v-app>
    <home></home>
  </v-app>
</template>

<script>
import Home from "./components/Home/home.vue";
export default {
  name: "App",
  components: {
    home: Home
  },
  data: () => ({})
};
</script>
<style scoped></style>
