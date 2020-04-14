<template>
  <v-app>
    <app-notification></app-notification>
    <home></home>
  </v-app>
</template>

<script>
import Home from "./components/Home/home.vue";
import AppNotification from "./components/Common/AppNotification"
export default {
  name: "App",
  components: {
    home: Home,
    "app-notification": AppNotification
  },
  data: () => ({})
};
</script>
<style scoped></style>
