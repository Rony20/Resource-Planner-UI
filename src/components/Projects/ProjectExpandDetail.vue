<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12" md="6">
        <div class="d-flex caption grey--text">Project Name</div>
        <div class="subtitle-1">{{ appProject.name }}</div>
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <div class="d-flex caption grey--text">Project Lead</div>
        <div class="subtitle-1">{{ appProject.lead | mapLeads(appLeads) }}</div>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="12" sm="12" md="6">
        <div class="d-flex caption grey--text">Start Date (YYYY/MM/DD)</div>
        <div class="subtitle-1">{{ appProject.start_date }}</div>
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <div class="d-flex caption grey--text">End Date (YYYY/MM/DD)</div>
        <div class="subtitle-1">{{ appProject.end_date }}</div>
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
            v-for="code in appProject.skillsets"
            :key="code"
            >{{ code | mapSkills(appSkills) }}</v-chip
          >
        </div>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <div class="d-flex caption grey--text">Status</div>
        <div class="my-2">
          <v-chip dark label small class="mt-2">{{ appProject.status }}</v-chip>
        </div>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="12" sm="12" md="12">
        <div class="d-flex caption grey--text">Allocations</div>
        <project-allocation-table
          :projectKey="this.projectKey"
          class="mt-2"
        ></project-allocation-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ProjectAllocationTable from "./ProjectAllocationTable";

import { storeDataPropertiesMixin } from "../../Mixins/storeDataProperties.js"

export default {
  props: { projectKey: String },

  components: {
    "project-allocation-table": ProjectAllocationTable
  },

  mixins: [storeDataPropertiesMixin],

  data() {
    return {};
  },

  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    appProject() {
      return this.$store.getters.getProjectByKey(this.projectKey);
    },
  }
};
</script>

<style scoped></style>
