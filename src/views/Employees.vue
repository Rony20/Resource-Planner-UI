<template>
  <div id="app">
    <v-app id="inspire">
      <v-card color="grey lighten-4" flat height="50px" tile>
        <v-toolbar dense dark flat color="grey darken-1">
          <v-toolbar-title>
            <v-icon left>people_alt</v-icon>Employees
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

      <employee-list ref="syncloadhrms"></employee-list>

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
      this.hrms_loader = true;
      this.$syncHRMS()
        .then(response => {
          if (response.data === "success") {
            this.$notify({
              title: "Information",
              text: "Employees are synced with HRMS!",
              type: "info"
            });
            this.$refs.syncloadhrms.loadEmployees();
          }
        })
        .catch(error => {
          this.$notify({
            title: "Error",
            text: "Error in sync with HRMS!",
            type: "error"
          });
          console.error(error);
        })
        .finally(() => {
          this.hrms_loader = false;
        });
    }
  }
};
</script>

<style></style>
