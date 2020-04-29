<template>
  <v-container fluid>
    <request-list></request-list>
  </v-container>
</template>

<script>
import RequestList from "../components/Requests/RequestList.vue";
export default {
  name: "Requests",

  components: {
    "request-list": RequestList
  }
};
</script>

<style></style>
