<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
      item-key="project"
      hide-default-footer
      class="elevation-3"
    >
      <template v-slot:item.key="{ item }">
        <v-btn fab x-small dark depressed :color="color()">{{
          item.project
        }}</v-btn>
      </template>

      <template v-slot:item.name="{ item }">
        {{ item.project | mapProjects(appProjects) }}
      </template>

      <template
        v-if="projectsType === 'current'"
        v-slot:item.current="{ item }"
      >
        <div class="d-flex flex-row justify-center">
          <app-show-week-hours
            class="ma-2"
            :showDays="false"
            :hoursArray="getCurrentAllocationHours(item.allocation)"
          ></app-show-week-hours>
        </div>
      </template>

      <template v-if="projectsType === 'past'" v-slot:item.past="{ item }">
        <v-chip dark label small color="info">{{
          getTotalHoursWorked(item.allocation)
        }}</v-chip>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import AppShowWeekHours from "../Common/AppShowWeekHours.vue";

import { storeDataPropertiesMixin } from "../../Mixins/storeDataProperties.js";

export default {
  props: {
    employeeId: Number,
    projectsType: String
  },

  components: {
    "app-show-week-hours": AppShowWeekHours
  },

  mixins: [storeDataPropertiesMixin],

  data() {
    return {};
  },

  methods: {
    color() {
      if (this.projectsType === "current") return "info";
      else if (this.projectsType === "past") return "purple";
    },

    getCurrentAllocationHours(allocation) {
      if (allocation.length === 0) return ["O", "O", "O", "O", "O", "O", "O"];
      let len = allocation.length;
      return allocation[len - 1]["hours"];
    },

    getTotalHoursWorked(allocation) {
      if (allocation.lenght === 0) return 0;
      var total_hours = 0;
      for (let value of allocation) {
        total_hours += value["hours"].reduce((total, hour) => total + hour);
      }
      return total_hours;
    }
  },

  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    headers() {
      if (this.projectsType === "current")
        return [
          {
            text: "Key",
            align: "start",
            sortable: true,
            value: "key"
          },
          { text: "Project Name", value: "name", align: "center" },
          {
            text: "Current Week Allocation",
            value: "current",
            align: "center"
          }
        ];
      else if (this.projectsType === "past")
        return [
          {
            text: "Key",
            align: "start",
            sortable: true,
            value: "key"
          },
          { text: "Project Name", value: "name", align: "center" },
          {
            text: "Total Hours Worked",
            value: "past",
            align: "center"
          }
        ];
    },

    // eslint-disable-next-line vue/return-in-computed-property
    items() {
      if (this.projectsType === "current")
        return this.appEmployee.current_projects;
      else if (this.projectsType === "past")
        return this.appEmployee.past_projects;
    },

    appEmployee() {
      return this.$store.getters.getEmployeeById(this.employeeId);
    }
  }
};
</script>

<style scoped></style>
