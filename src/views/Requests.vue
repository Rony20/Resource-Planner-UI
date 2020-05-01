<template>
  <div id="app">
    <v-app id="inspire">
      <v-card color="grey lighten-4" flat height="50px" tile>
        <v-toolbar dense dark flat color="grey darken-1">
          <v-toolbar-title>
            <v-icon left>library_books</v-icon>Requests
          </v-toolbar-title>
        </v-toolbar>
      </v-card>

      <request-list></request-list>

    </v-app>
  </div>
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
