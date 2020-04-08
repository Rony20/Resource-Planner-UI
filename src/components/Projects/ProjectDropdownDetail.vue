<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12" md="6">
        <div class="d-flex caption grey--text">Project Name</div>
        <div class="subtitle-1">{{ project.name }}</div>
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <div class="d-flex caption grey--text">Project Lead</div>
        <div class="subtitle-1">{{ project.lead | mapLeads(appLeads) }}</div>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="12" sm="12" md="6">
        <div class="d-flex caption grey--text">Start Date (YYYY/MM/DD)</div>
        <div class="subtitle-1">{{ project.start_date }}</div>
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <div class="d-flex caption grey--text">End Date (YYYY/MM/DD)</div>
        <div class="subtitle-1">{{ project.end_date }}</div>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="12" sm="6" md="6">
        <div class="d-flex caption grey--text">Skillsets Required</div>
        <div class="my-2">
          <v-chip
            small
            dark
            class="mr-2 mt-2"
            v-for="code in project.skillsets"
            :key="code"
            >{{ code | mapSkills(appSkills) }}</v-chip
          >
        </div>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <div class="d-flex caption grey--text">Status</div>
        <div class="my-2">
          <v-chip dark label small class="mt-2">{{ project.status }}</v-chip>
        </div>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <project-allocation-table :team="project.team"></project-allocation-table>
  </v-container>
</template>

<script>
import ProjectAllocationTable from "./ProjectAllocationTable";

export default {
  props: ["project"],

  components: {
    "project-allocation-table": ProjectAllocationTable
  },

  data() {
    return {};
  },

  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    appSkills() {
      return this.$store.getters.getAllSkills;
    },

    appLeads() {
      return this.$store.getters.getAllPms;
    }
  }
};
</script>

<style scoped></style>
