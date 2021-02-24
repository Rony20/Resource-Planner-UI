<template>
  <div id="app">
    <v-app id="inspire">
      <v-card color="grey lighten-4" flat height="50px" tile>
        <v-toolbar dense dark flat color="grey darken-1">
          <v-toolbar-title>
            <v-icon left>people_alt</v-icon>Team
          </v-toolbar-title>
        </v-toolbar>
      </v-card>

      <employee-list></employee-list>
    </v-app>
  </div>
</template>

<script>
import EmployeeList from "../components/Employees/EmployeeList";
export default {
  name: "Employees",
  components: {
    "employee-list": EmployeeList
  },
  data() {
    return {};
  }
};
</script>

<style></style>
