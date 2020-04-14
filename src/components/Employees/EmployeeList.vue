<template>
  <v-card class="my-card">
    <v-card-title>
      <v-row>
        <v-col class="grey--text" cols="12" sm="8">
          Employee Details
          <v-btn icon :loading="employee_loader" @click="loadEmployees">
            <v-icon>refresh</v-icon>
            <template v-slot:loader>
              <span class="custom-loader">
                <v-icon light>refresh</v-icon>
              </span>
            </template>
          </v-btn>
        </v-col>
        <v-col cols="12" sm="4">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
            right
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="employees"
      item-key="employee_id"
      :search="search"
      :expanded.sync="expanded"
      :single-expand="singleExpand"
      :loading="employee_loader"
      loading-text="Loading Employees..."
      show-expand
      class="elevation-1"
    >  
      <template v-slot:item.current="{ item }"> 
        <v-chip
          dark
          label
          small
          v-for="project in item.current_projects"
          :key="project.project"
          class="mr-2"
        >
            {{ project.project }}
        </v-chip>
      </template>
      <template v-slot:item.actions="{ item }">
        <employee-assignment-popup
          :employeeId="item.employee_id"
          @refresh="loadEmployees()"
        ></employee-assignment-popup>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <employee-expand-detail
            :employeeId="item.employee_id"
          ></employee-expand-detail>
        </td>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import EmployeeAssignmentPopup from "./EmployeeAssignmentPopup";
import EmployeeExpandDetail from "./EmployeeExpandDetail";

export default {
  name: "Employees",
  components: {
    "employee-assignment-popup": EmployeeAssignmentPopup,
    "employee-expand-detail": EmployeeExpandDetail
  },
  data() {
    return {
      search: "",
      dialog: false,
      employee_loader: true,
      singleExpand: true,
      refresh: false,
      expanded: [],
      headers: [
        {
          text: "Employee Id",
          align: "start",
          value: "employee_id"
        },
        { text: "Employee name", value: "employee_name" },
        {
          text: "Current Projects",
          value: "current",
          align: "center"
        },
        {
          text: "Actions",
          value: "actions",
          sortable: false,
          align: "center"
        }
      ]
    };
  },

  created() {
    this.loadEmployees();
  },
  methods: {
    loadEmployees() {
      this.$store.dispatch("RESET_EMPLOYEE_LIST");
      this.employee_loader = true;

      this.$getAllEmployeesData()
        .then(response => {
          this.$store.dispatch("GENERATE_EMPLOYEE_LIST", response.data);
        })
        .catch(error => console.log(error))
        .finally(() => {
          this.employee_loader = false;
        });
    }
  },
  computed: {
    employees() {
      return this.$store.getters.getEmployees;
    }
  }
};
</script>

<style scoped>
.my-card {
  margin: 30px 100px;
}
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
