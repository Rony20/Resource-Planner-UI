<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12" md="6">
        <div class="d-flex caption grey--text">Employee Name</div>
        <div class="subtitle-1">{{ appEmployee.employee_name }}</div>
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <div class="d-flex caption grey--text">Designation</div>
        <div class="subtitle-1">{{ appEmployee.designation }}</div>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="12" sm="6" md="6">
        <div class="d-flex caption grey--text">Skills</div>
        <div class="my-2">
          <v-chip
            small
            dark
            class="mr-2 mt-2"
            v-for="skill in appEmployee.skills"
            :key="skill"
            >{{ skill | mapSkills(appSkills) }}</v-chip
          >
        </div>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <div class="d-flex caption grey--text">Allocation status</div>
        <div class="my-2">
          <v-chip dark label small class="mt-2">{{
            appEmployee.is_allocated
          }}</v-chip>
        </div>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="12" md="6">
        <div class="caption d-flex grey--text">Current Availibility</div>
        <div class="d-flex flex-row justify-left">
          <app-show-week-hours
            class="mt-2"
            :showDays="false"
            :hoursArray="appEmployee.availability['current']"
          ></app-show-week-hours>
        </div>
      </v-col>
      <v-col cols="12" md="6">
        <div class="caption d-flex grey--text">Next Week Availibility</div>
        <div class="d-flex flex-row justify-left">
          <app-show-week-hours
            class="mt-2"
            :showDays="false"
            :hoursArray="appEmployee.availability['next']"
          ></app-show-week-hours>
        </div>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="12" sm="12" md="12">
        <div class="caption d-flex grey--text">Current Projects</div>
        <employee-current-project-table
          :employeeId="this.employeeId"
          projectsType="current"
          class="mt-2"
        ></employee-current-project-table>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="12" sm="12" md="12">
        <div class="caption d-flex grey--text">Past Projects</div>
        <employee-current-project-table
          :employeeId="this.employeeId"
          projectsType="past"
          class="mt-2"
        ></employee-current-project-table>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import EmployeeCurrentProjectTable from "./EmployeeCurrentProjectTable.vue";
import AppShowWeekHours from "../Common/AppShowWeekHours";

import { storeDataPropertiesMixin } from "../../Mixins/storeDataProperties.js"

export default {
  props: {
    employeeId: Number
  },

  components: {
    "employee-current-project-table": EmployeeCurrentProjectTable,
    "app-show-week-hours": AppShowWeekHours
  },

  mixins: [storeDataPropertiesMixin],

  computed: {
    appEmployee() {
      return this.$store.getters.getEmployeeById(this.employeeId);
    }
  }
};
</script>

<style scoped></style>
