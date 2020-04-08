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
            <v-btn depressed class="ma-2" color="info" @click="fetch_employee_data">
              <v-icon left>autorenew</v-icon>Sync HRMS
            </v-btn>
          </v-card-actions>
        </v-toolbar>
      </v-card>

      <listitems></listitems>
    </v-app>
  </div>
</template>

<script>
import listitems from "../ListItems/listitems.vue";
export default {
  name: "Employees",
  empData: {},
  components: {
    listitems
  },
  data() {
    return {};
  },
  methods: {
    fetch_employee_data() {
      this.$getAllEmployeesData()
        .then(response => {
          let x = response.data;
          this.$store.state.employees = x["all_employees"];
        })
        .then(() => {
          this.$store.state.snackbar.color = "green";
          this.$store.state.snackbar.text =
            "Employees Data Successfully fetched !!!";
          this.$store.state.snackbar.show = true;
        });
    }
  }
};
</script>

<style>
#syncbtn {
  margin: 10px;
  max-width: 170px;
}
#employeepage {
  max-width: 1500px;
}
</style>
