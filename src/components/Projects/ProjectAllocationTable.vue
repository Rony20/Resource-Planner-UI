<template>
  <v-row>
    <v-col cols="12" sm="12" md="12">
      <div class="d-flex caption grey--text">Allocations</div>
      <div class="mt-2">
        <v-alert v-if="typeof team === 'string'" dense type="warning">{{
          team
        }}</v-alert>
        <v-simple-table v-else fixed-header>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Name</th>
                <th class="text-center">Currunt Allocation(Hrs)</th>
                <th class="text-center">Total Worked(Hrs)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="employee in team" :key="employee.id">
                <td>{{ employee.id | mapEmployees(appEmployees) }}</td>
                <td class="text-center">
                  {{ getCurrentAllocation(employee.allocations) }}
                </td>
                <td class="text-center">
                  {{ getTotalHoursWorked(employee.allocations) }}
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: ["team"],

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

  computed:{
    appEmployees(){
      return this.$store.getters.getEmployees;
    }
  }
};
</script>

<style scoped></style>
