/* eslint-disable vue/return-in-computed-property */
<template>
  <v-card class="project-card">
    <v-card-title>
      <v-row>
        <v-col class="grey--text" cols="12" sm="8">
          Project Details
          <v-btn icon :loading="project_loader" @click="loadProjects">
            <v-icon>refresh</v-icon>
            <template v-slot:loader>
              <span class="custom-loader">
                <v-icon light>refresh</v-icon>
              </span>
            </template>
          </v-btn>
        </v-col>
        <v-col cols="12" sm="4">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
            right
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="projects"
      item-key="epic_id"
      :search="search"
      :expanded.sync="expanded"
      :single-expand="single_expand"
      :loading="project_loader"
      loading-text="Loading Projects..."
      show-expand
      class="elevation-1"
    >
      <template v-slot:item.lead="{ item }">{{
        item.lead | mapLeads(appLeads)
      }}</template>
      <template v-slot:item.actions="{ item }">
        <div class="d-flex justify-space-around">
          <project-edit-popup
            :projectKey="item.epic_id"
            @refresh="loadProjects"
          ></project-edit-popup>
          <project-team-popup
            :projectKey="item.epic_id"
            @refresh="loadProjects"
          ></project-team-popup>
        </div>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <project-expand-detail :projectKey="item.epic_id"></project-expand-detail>
        </td>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import ProjectEditPopup from "./popups/ProjectEditPopup";
import ProjectTeamPopup from "./popups/ProjectTeamPopup";
import ProjectExpandDetail from "./ProjectExpandDetail";

import { storeDataPropertiesMixin } from "../../Mixins/storeDataProperties.js";

export default {
  name: "Project",

  components: {
    "project-edit-popup": ProjectEditPopup,
    "project-team-popup": ProjectTeamPopup,
    "project-expand-detail": ProjectExpandDetail
  },

  props: ["projectType"],

  mixins: [storeDataPropertiesMixin],

  data() {
    return {
      search: "",
      dialog: false,
      project_loader: true,
      single_expand: true,
      refresh: false,
      expanded: [],
      headers: [
        {
          text: "Epic Key",
          align: "start",
          value: "epic_id"
        },
        { text: "Epic Name", value: "epic_name" },
        { text: "Project Name", value: "name" },
        { text: "Project Lead", value: "lead" },
        { text: "Start Date", value: "start_date"},
        { text: "End Date", value: "end_date"},
        { text: "Status", value: "status"},
        {
          text: "Actions",
          value: "actions",
          sortable: false,
          align: "center"
        }
      ]
    };
  },

  methods: {
    loadProjects() {
      this.$store.dispatch("RESET_PROJECT_LIST");
      this.project_loader = true;

      this.$getAllProjectsData()
        .then(response => {
          this.$store.dispatch("GENERATE_PROJECT_LIST", response.data);
        })
        .catch(error => console.log(error))
        .finally(() => {
          this.project_loader = false;
        });
    }
  },

  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    projects() {
      switch (this.projectType) {
        case "All":
          return this.$store.getters.getAllProjects;
        case "Open":
          return this.$store.getters.getOpenProjects;
        case "In Progress":
          return this.$store.getters.getInProgressProjects; 
        case "Closed":
          return this.$store.getters.getClosedProjects;
        case "Reopened":
          return this.$store.getters.getReopenedProjects;
        case "Approved":
          return this.$store.getters.getApprovedProjects;
        case "BD Verification":
          return this.$store.getters.getBdVerificationProjects;
        case "Resolved":
          return this.$store.getters.getresolvedProjects; 
        case "Archived":
          return this.$store.getters.getArchivedProjects;
      }
    }
  },

  created() {
    this.loadProjects();
  }
};
</script>

<style scoped>
.project-card {
  margin: 30px 20px;
}
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
