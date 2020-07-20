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
    <v-row justify="end" class="mr-5">
      <v-menu
        label="Columns"
        max-width="350px"
        v-model="menu"
        :close-on-content-click="false"
        offset-y
        bottom
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            :color="menu ? 'secondary darken-2' : undefined"
            v-bind="attrs"
            v-on="on"
            depressed
            class="text-capitalize"
          >
            Columns
            <v-icon>mdi-menu-down</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-list>
            <v-subheader>Columns</v-subheader>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-content>
                <v-text-field
                  v-model="searchfilters"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                  outlined
                  class="compact-search"
                  @click:clear="searchfilters = ''"
                ></v-text-field>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-list max-height="250px" class="overflow-y-auto">
            <v-list-item>
              <v-btn
                @click="headerValues=headers; columnsFilters();"
                color="primary"
                text
                class="text-capitalize ml-n4 mt-n3"
              >Restore Defaults</v-btn>
            </v-list-item>
            <v-list-item v-for="item in filteredItems" :key="item.text" class="mt-n3">
              <v-list-item-action>
                <v-checkbox
                  v-model="headerValues"
                  :label="item.text"
                  :value="item"
                  dense
                  class="caption compact-checkbox"
                  :readonly="item.text==='Epic Key' || item.text==='Actions'"
                ></v-checkbox>
              </v-list-item-action>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-card-actions class="mt-3">
            <v-row justify="center">
              <v-btn @click="columnsFilters" color="info" class="mr-3" small>
                <v-icon left small>check</v-icon>Done
              </v-btn>
              <v-btn @click="menu=false" color="error" class="mr-3" small>
                <v-icon left small>cancel</v-icon>Cancel
              </v-btn>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-row>
    <v-data-table
      :headers="selectedHeaders"
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
      <template v-slot:item.lead="{ item }">
        {{
        item.lead | mapLeads(appLeads)
        }}
      </template>
      <template v-slot:item.actions="{ item }">
        <div class="d-flex justify-space-around">
          <project-edit-popup :projectKey="item.epic_id" @refresh="loadProjects"></project-edit-popup>
          <project-team-popup :projectKey="item.epic_id" @refresh="loadProjects"></project-team-popup>
        </div>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <project-expand-detail
            :projectKey="item.epic_id"
            :selectedHeaders="selectedHeaders"
            :mainHeaders="mainHeaders"
          ></project-expand-detail>
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
      searchfilters: "",
      menu: false,
      headerValues: [],
      mainHeaders: [],
      selectedHeaders: [],
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
        { text: "Start Date", value: "start_date" },
        { text: "End Date", value: "end_date" },
        { text: "Status", value: "status" },
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
    },
    columnsFilters() {
      this.menu = false;
      this.selectedHeaders = this.headerValues;
    }
  },

  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    projects() {
      switch (this.projectType) {
        case "All":
          return this.$store.getters.getAllProjects;
        case "Ongoing":
          return this.$store.getters.getActiveProjects;
        case "Archived":
          return this.$store.getters.getArchivedProjects;
      }
    },
    filteredItems() {
      return this.headers.filter(item => {
        if (!this.searchfilters) return this.headers;
        return item.text
          .toLowerCase()
          .includes(this.searchfilters.toLowerCase());
      });
    }
  },
  watch: {
    menu(val) {
      if (val == true) {
        this.headerValues = this.selectedHeaders;
      }
    }
  },
  created() {
    this.loadProjects();
    this.headerValues = this.headers;
    this.selectedHeaders = this.headers;
    this.mainHeaders = this.headers;
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
.compact-checkbox {
  transform: scale(0.875);
  transform-origin: left;
}
.compact-search {
  transform: scale(0.775);
  transform-origin: left;
  height: 35px;
  width: 250px;
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