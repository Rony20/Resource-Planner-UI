<template>
  <div>
    <v-autocomplete
      v-model="selected_employee"
      :items="filteredEmployee"
      label="Select Employee"
      item-value="employee_id"
      item-text="employee_name"
      multiple
      hide-selected
      hide-no-data
    >
      <template v-slot:selection="data">
        <v-chip
          v-bind="data.attrs"
          :input-value="data.selected"
          close
          @click="data.select"
          @click:close="remove(data.item.employee_id)"
        >
          <v-avatar left>
            <v-img src="@/assets/avatar.png"></v-img>
          </v-avatar>
          {{ data.item.employee_name }}
        </v-chip>
      </template>
      <template v-slot:item="data">
        <v-list-item-avatar>
          <v-img src="@/assets/avatar.png"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>
            <v-row>
              <v-col md="4" cols="10">{{ data.item.employee_name }}</v-col>
              <v-col md="6" cols="10">
                <v-chip
                  small
                  label
                  dark
                  color="primary"
                  class="mx-1"
                  v-for="skill in data.item.skills"
                  :key="skill"
                  >{{ skill | mapSkills(appSkills) }}</v-chip
                >
              </v-col>
            </v-row>
          </v-list-item-title>
          <v-list-item-subtitle v-if="false">
            <v-chip
              small
              label
              dark
              color="green"
              class="mx-1"
              v-for="hour in data.item.availability"
              :key="hour"
              >{{ hour }}</v-chip
            >
          </v-list-item-subtitle>
        </v-list-item-content>
      </template>
    </v-autocomplete>
    <v-btn
      dark
      icon
      large
      :disabled="show_added"
      class="primary"
      @click="addEmployee()"
    >
      <v-icon>add_circle</v-icon>
    </v-btn>

    <v-card class="mt-6" v-if="show_card">
      <v-card-title>
        New Team Members
        <v-spacer></v-spacer>
        <v-btn icon @click="clearAddedEmployee">
          <v-icon>clear</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col
            cols="12"
            sm="4"
            md="3"
            v-for="emp in added_employee"
            :key="emp.employee_id"
          >
            <v-chip
              label
              close
              @click:close="removeFromAddedEmployee(emp.employee_id)"
            >
              <v-avatar left>
                <v-img src="@/assets/avatar.png"></v-img>
              </v-avatar>
              {{ emp.employee_name }}
            </v-chip>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-btn dark class="primary mt-4" v-if="show_card" @click="createTeam()"
      >Create Team</v-btn
    >

    <v-card class="mt-4">
      <v-card-title>Current Team Members</v-card-title>
      <v-card-text>
        <v-row>
          <v-col
            cols="12"
            sm="4"
            md="3"
            v-for="employee in appProject.team"
            :key="employee.id"
          >
            <v-chip label>
              <v-avatar left>
                <v-img src="@/assets/avatar.png"></v-img>
              </v-avatar>
              {{ employee.id | mapEmployees(appEmployees) }}
            </v-chip>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { storeDataPropertiesMixin } from "../../Mixins/storeDataProperties.js"

export default {
  props: { projectKey: String },

  mixins: [storeDataPropertiesMixin],

  data() {
    return {
      selected_employee: [],
      added_employee: [],
      show_card: false,
      show_added: true
    };
  },

  methods: {
    remove(item) {
      const index = this.selected_employee.indexOf(item);
      if (index >= 0) {
        this.selected_employee.splice(index, 1);
      }
    },

    removeFromAddedEmployee(id) {
      const index = this.added_employee.findIndex(
        emp => emp.employee_id === id
      );
      if (index >= 0) {
        this.added_employee.splice(index, 1);
      }
    },

    addEmployee() {
      for (let emp_id of this.selected_employee) {
        this.added_employee.push(
          this.appEmployees.find(emp => emp.employee_id === emp_id)
        );
      }
      this.selected_employee = [];
    },

    createTeam() {
      let team_list = [];
      this.added_employee.forEach(emp => {
        team_list.push(emp.employee_id);
      });
      this.added_employee = [];

      this.$createUpdateTeam(this.appProject.key, {
        allocated_employees: team_list
      })
        .then(() => {
          this.$notify({
            title: "Success",
            text: `${this.appProject["name"]} team detail is updated !`,
            type: "success"
          });
        })
        .catch(error => {
          this.$notify({
            title: "Error",
            text: `Error in upadating ${this.appProject["name"]}'s team details !`,
            type: "error"
          });
          console.log(error);
        })
        .finally(() => {
          setTimeout(() => {
            this.$emit("refresh");
          }, 500);
        });
      this.$emit("close", false);
    },

    clearAddedEmployee() {
      this.added_employee = [];
    }
  },

  computed: {
    appProject() {
      return this.$store.getters.getProjectByKey(this.projectKey);
    },

    filteredEmployee() {
      return this.appEmployees.filter(
        ({ employee_id: id1 }) =>
          !this.added_employee.some(({ employee_id: id2 }) => id2 === id1)
      );
    }
  },

  watch: {
    added_employee() {
      if (this.added_employee.length > 0) this.show_card = true;
      else this.show_card = false;
    },

    selected_employee() {
      if (this.selected_employee.length > 0) this.show_added = false;
      else this.show_added = true;
    }
  }
};
</script>

<style scoped></style>
