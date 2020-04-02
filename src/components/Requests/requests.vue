<template>
  <v-container fluid>
    <requestslist></requestslist>
  </v-container>
</template>

<script>
import requestslist from "../RequestsList/requestslist.vue";
export default {
  name: "Requests",
  components: {
    requestslist: requestslist
  }
};
</script>

<style></style>
