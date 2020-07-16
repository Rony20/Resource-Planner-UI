<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12" md="6">
        <div class="d-flex caption grey--text">Customer Name</div>
        <div class="subtitle-1">{{ appProject.customer_name }}</div>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="12" sm="12" md="6">
        <div class="d-flex caption grey--text">Description</div>
        <div class="subtitle-1">{{ appProject.description }}</div>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="12" sm="6" md="6" class="d-none">
        <div class="d-none">Skillsets Required</div>
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
      <v-col cols="8" sm="4" md="4">
        <div class="d-flex caption grey--text">Logged Hours</div>
        <div class="subtitle-1">{{ appProject.logged_hours }}</div>
      </v-col>
      <v-col cols="8" sm="4" md="4">        <div class="d-flex caption grey--text">PMO Estimated</div>
        <div class="subtitle-1">
          {{ appProject.pmo_estimated }}
        </div>
      </v-col>
      <v-col cols="8" sm="4" md="4">        <div class="d-flex caption grey--text">BD Estimated</div>
        <div class="subtitle-1">
          {{ appProject.bd_estimated }}
        </div>
      </v-col>
    </v-row>
    <v-divider class="d-none"></v-divider>
    <v-row class="d-none">
      <v-col cols="12" sm="12" md="12">
        <div class="d-none">Allocations</div>
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

import { storeDataPropertiesMixin } from "../../Mixins/storeDataProperties.js";

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
    }
  }
};
</script>

<style scoped></style>
