<template>
  <div id="app">
    <v-app id="inspire">
      <v-card color="grey lighten-4" flat height="50px" tile>
        <v-toolbar dense>
          <v-toolbar-title>
            <v-icon color="black" left>people_alt</v-icon>Employees
          </v-toolbar-title>

          <v-spacer></v-spacer>

          <v-card-actions>
            <v-btn
              class="ma-2"
              color="info"
              :loading="hrms_loader"
              @click="syncWithHRMS"
            >
              <v-icon left>autorenew</v-icon>sync hrms
            </v-btn>
          </v-card-actions>
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
    return {
      hrms_loader: false
    };
  },
  methods: {
    syncWithHRMS(){

    }
  }
};
</script>

<style></style>
