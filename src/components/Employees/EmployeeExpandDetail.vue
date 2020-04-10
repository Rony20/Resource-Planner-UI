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
          >{{ skill | mapSkills(appSkills) }}</v-chip>
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
      <v-col cols="12" sm="6" md="6">
        <div class="caption d-flex grey--text">Current Projects</div>
        <div class="my-2">
          <div
            class="subtitle"
            v-for="project in appEmployee.current_projects"
            :key="project.project"
          >
            <v-btn fab x-small depressed color="primary">{{ project.project }}</v-btn>
            {{ project.project | mapProjects(appProjects) }}
          </div>
        </div>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="12" sm="6" md="6">
        <div class="caption d-flex grey--text">Past Projects</div>
        <div class="my-2">
          <div class="subtitle" v-for="project in appEmployee.past_projects" :key="project.project">
            <v-btn fab x-small depressed dark color="purple">{{ project.project }}</v-btn>
            {{ project.project | mapProjects(appProjects) }}
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: ["employeeId"],
  components: {},

  data() {
    return {};
  },

  computed: {
    appEmployee() {
      return this.$store.getters.getEmployeeById(this.employeeId);
    },

    appProjects() {
        return this.$store.getters.getAllProjects;
    },

    appSkills() {
      return this.$store.getters.getAllSkills;
    },

    appLeads() {
      return this.$store.getters.getAllPms;
    }
  }
};
</script>

<style scoped>
</style>