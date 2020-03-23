<template>
  <v-container id="employeepage">
    <v-btn absolute id="syncbtn" @click="fetch_employee_data()">
      <v-icon>sync</v-icon>Sync with HRMS
    </v-btn>
    <br />
    <br />
    <listitems></listitems>
    <br />
  </v-container>
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
