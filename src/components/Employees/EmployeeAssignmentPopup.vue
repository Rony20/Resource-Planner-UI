<template>
  <v-dialog max-width="600px" v-model="dialog" persistent>
    <template v-slot:activator="{ on }">
      <v-btn icon slot="activator" v-on="on">
        <v-icon>assignment</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <v-icon left>assignment</v-icon>Assign to Project
        <v-spacer></v-spacer>
        <v-btn
          icon
          @click="
            dialog = false;
            value_assignement();
          "
        >
          <v-icon>close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="mt-3">
        <v-form class="px-2">
          <v-text-field
            label="Employee Name"
            prepend-icon="person"
            v-model="employee_name"
            disabled
          ></v-text-field>

          <v-autocomplete
            v-model="project"
            :items="projects"
            item-text="name"
            item-value="key"
            label="Project to be Assigned"
            prepend-icon="note"
          ></v-autocomplete>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="error"
          class="ma-2"
          raised
          @click="
            dialog = false;
            value_assignement();
          "
        >
          <v-icon left>cancel</v-icon>Cancel
        </v-btn>
        <v-btn
          color="primary"
          class="ma-2"
          raised
          @click="
            dialog = false;
            assignEmployeeToProject();
          "
        >
          <v-icon left>save</v-icon>Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
// import axios from 'axios'

export default {
  props: ["employeeId"],
  data() {
    return {
      dialog: false,
      employee_name: null,
      project: null,
    };
  },
  methods: {
    value_assignement() {
      this.employee_name = this.appEmployee.employee_name;
      // this.project = null
    },

    assignEmployeeToProject() {
      console.log(this.project)

      this.$createUpdateTeam(this.project, {
        allocated_employees: [this.employeeId]
      })
        .then(response => {
          console.log(response.data)
        })
        .catch(error => console.log(error));
    }
  },

  mounted() {
    this.value_assignement();
  },
  computed: {
    appEmployee() {
      return this.$store.getters.getEmployeeById(this.employeeId);
    },

    projects() {
      return this.$store.getters.getProjectKeyList;
    }
  },

  watch: {}
};
</script>

<style scoped>
</style>



