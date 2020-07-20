<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12" md="6" v-if="projectName">
        <div class="d-flex caption grey--text">Project Name</div>
        <div class="subtitle-1">{{ appProject.name }}</div>
      </v-col>
      <v-col cols="12" sm="12" md="6" v-if="projectLead">
        <div class="d-flex caption grey--text">Project Lead</div>
        <div class="subtitle-1">{{ appProject.lead | mapLeads(appLeads) }}</div>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="12" sm="12" md="12" v-if="epicName">
        <div class="d-flex caption grey--text">Epic Name</div>
        <div class="subtitle-1">{{ appProject.epic_name }}</div>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="12" sm="12" md="6" v-if="startDate">
        <div class="d-flex caption grey--text">Start Date (DD-MM-YYYY)</div>
        <div class="subtitle-1">{{ appProject.start_date }}</div>
      </v-col>
      <v-col cols="12" sm="12" md="6" v-if="endDate">
        <div class="d-flex caption grey--text">End Date (DD-MM-YYYY)</div>
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
          >{{ code | mapSkills(appSkills) }}</v-chip>
        </div>
      </v-col>
      <v-col cols="12" sm="6" md="6" v-if="status">
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
        <project-allocation-table :projectKey="this.projectKey" class="mt-2"></project-allocation-table>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import ProjectAllocationTable from "./ProjectAllocationTable";

import { storeDataPropertiesMixin } from "../../Mixins/storeDataProperties.js";

export default {
  props: { projectKey: String, selectedHeaders: Array, mainHeaders: Array },

  components: {
    "project-allocation-table": ProjectAllocationTable
  },

  mixins: [storeDataPropertiesMixin],

  data() {
    return {
      available: true,
      projectName: false,
      projectLead: false,
      startDate: false,
      endDate: false,
      status: false,
      epicName: false
    };
  },
  methods: {
    addUnselectedColumns() {
      this.projectName = false;
      this.projectLead = false;
      this.startDate = false;
      this.endDate = false;
      this.status = false;
      this.epicName = false;

      for (let item of this.mainHeaders) {
        this.available = false;
        for (let selecteditem of this.selectedHeaders) {
          if (item.text == selecteditem.text) {
            this.available = true;
            break;
          }
        }
        if (!this.available) {
          if (item.text == "Project Name") {
            this.projectName = true;
          } else if (item.text == "Project Lead") {
            this.projectLead = true;
          } else if (item.text == "Start Date") {
            this.startDate = true;
          } else if (item.text == "End Date") {
            this.endDate = true;
          } else if (item.text == "Status") {
            this.status = true;
          } else if (item.text == "Epic Name") {
            this.epicName = true;
          }
        }
      }
    }
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    appProject() {
      return this.$store.getters.getProjectByKey(this.projectKey);
    }
  },
  watch: {
    selectedHeaders() {
      this.addUnselectedColumns();
    }
  },
  created() {
    this.addUnselectedColumns();
  }
};
</script>

<style scoped></style>
