<template>
  <div>
    <v-simple-table fixed-header class="elevation-3">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-center">Currunt Allocation(Hrs)</th>
            <th class="text-center">Total Worked(Hrs)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="employee in appProject.team" :key="employee.id">
            <td>{{ employee.id | mapEmployees(appEmployees) }}</td>
            <td class="text-center">
              <v-chip dark label small class="info">{{
                getCurrentAllocation(employee.allocations)
              }}</v-chip>
            </td>
            <td class="text-center">
              <v-chip dark label small class="info">{{
                getTotalHoursWorked(employee.allocations)
              }}</v-chip>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import { storeDataPropertiesMixin } from "../../Mixins/storeDataProperties.js";

export default {
  props: { projectKey: String },

  mixins: [storeDataPropertiesMixin],

  methods: {
    getCurrentAllocation(allocation) {
      if (allocation.length === 0) return 0;
      let len = allocation.length;
      let hours = allocation[len - 1]["hours"];
      return hours.reduce((total, hour) => total + hour);
    },

    getTotalHoursWorked(allocation) {
      if (allocation.length === 0) return 0;
      var total_hours = 0;
      for (let value of allocation) {
        total_hours += value["hours"].reduce((total, hour) => total + hour);
      }
      return total_hours;
    }
  },

  computed: {
    appProject() {
      return this.$store.getters.getProjectByKey(this.projectKey);
    }
  }
};
</script>

<style scoped></style>
