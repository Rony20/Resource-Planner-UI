/* eslint-disable vue/return-in-computed-property */
<template>
  <v-app>
    <v-card elevation="0" class="project-card1">
      <v-row>
        <v-col cols="10" sm="2" v-for="(filterBar, index) in mandatoryObj" :key="index" class="mr-n12">
          <v-autocomplete
            flat
            small
            multiple
            :label="filterBar.text + ': All'"
            :items="columnValueList(filterBar.value)"
            v-model="filters[filterBar.value]"
            :search-input.sync="searchFilter[filterBar.value]"
            @change="searchFilter[filterBar.value] = ''"
            dense
            filled
            solo
          >
            <v-icon size="20" slot="append" left>keyboard_arrow_down</v-icon>
            <template v-slot:selection="{ item, index }">
              <span v-if="index === 0">{{ item.text | maximumLength }}</span>
              <span v-if="index === 1"> , ...</span>
            </template>
          </v-autocomplete>
        </v-col>

        <v-col cols="10" sm="2" class="mx-n2">
          <v-menu offset-y :close-on-content-click="false">
            <template v-slot:activator="{ on }">
              <v-btn depressed v-on="on" color="white" right dense filled solo>
                More
                <v-icon right size="20">keyboard_arrow_down</v-icon>
                <v-icon size="20" right class="ml-2" v-if="filterSelected.length > 0" @click.native.stop @click.prevent="clearFilters">
                  mdi-close-circle
                </v-icon>
              </v-btn>
            </template>
            <v-menu>
              <template v-slot:activator="{ on }">
                <v-list v-on="on">
                  <v-list-item v-for="(obj, index) in dropdownObj" :key="index">
                    <v-checkbox multiple v-model="filterSelected"
                      :label="obj.text" :value="obj" dense class="my-md-n2"
                    ></v-checkbox>
                  </v-list-item>
                </v-list>
              </template>
            </v-menu>
          </v-menu>
        </v-col>

        <v-spacer></v-spacer>

        <v-col cols="10" sm="1">
          <v-btn color="primary" dark depressed max-height="32px">Columns</v-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="10" sm="2" v-for="(filterBar, index) in filterSelected1" :key="index" class="mr-n12 mt-md-n12 mb-md-n8">
          <v-autocomplete
            flat
            small
            multiple
            clearable
            :label="filterBar.text"
            :items="columnValueList(filterBar.value)"
            v-model="filters[filterBar.value]"
            :search-input.sync="searchFilter[filterBar.value]"
            @change="searchFilter[filterBar.value] = ''"
            dense
            filled
            solo
          >
            <v-icon size="20" slot="append" left>keyboard_arrow_down</v-icon>
            <v-icon size="20" slot="append" @click="deleteFilter(filterBar.value)">mdi-close-circle</v-icon>
            <template v-slot:selection="{ item, index }">
              <span v-if="index === 0">{{ item.text | maximumLength }}</span>
              <span v-if="index === 1"> , ...</span>
            </template>
          </v-autocomplete>
        </v-col>

        <v-col cols="10" sm="2" v-if="filterSelected2.some(date => date.value === 'start_date')" class="mr-n12 mt-md-n12 mb-md-n8">
          <v-menu
            v-model="start_date_selector"
            :close-on-content-click="false"
            :nudge-right="60"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                :value="formatedStartDate"
                label="Start Date"
                readonly
                dense
                filled
                solo
                flat
                small
                v-on="on"
              >
                <v-icon size="20" slot="append" left>keyboard_arrow_down</v-icon>
                <v-icon size="20" slot="append" @click="deleteFilter('start_date')">mdi-close-circle</v-icon>
              </v-text-field>
            </template>
            <v-date-picker v-model="filters.start_date" @input="start_date_selector = false"></v-date-picker>
          </v-menu>
        </v-col>

        <v-col cols="10" sm="2" v-if="filterSelected2.some(date => date.value === 'end_date')" class="mr-n12 mt-md-n12 mb-md-n8">
          <v-menu
            v-model="end_date_selector"
            :close-on-content-click="false"
            :nudge-right="60"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                :value="formatedEndDate"
                label="End Date"
                readonly
                dense
                filled
                solo
                flat
                small
                v-on="on"
              >
                <v-icon size="20" slot="append" left>keyboard_arrow_down</v-icon>
                <v-icon size="20" slot="append" @click="deleteFilter('end_date')">mdi-close-circle</v-icon>
              </v-text-field>
            </template>
            <v-date-picker v-model="filters.end_date" @input="end_date_selector = false"></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
    </v-card>

    <v-card class="project-card2">
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
        :items="filteredProjects"
        item-key="key"
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
              :projectKey="item.key"
              @refresh="loadProjects"
            ></project-edit-popup>
            <project-team-popup
              :projectKey="item.key"
              @refresh="loadProjects"
            ></project-team-popup>
          </div>
        </template>
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <project-expand-detail :projectKey="item.key"></project-expand-detail>
          </td>
        </template>
      </v-data-table>
    </v-card>
  </v-app>
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

  filters: {
    maximumLength: function(value) {
      if (!value) return "";
      value = value.toString();
      if (value.length > 15) {
        return value.slice(0, 15) + "..";
      } else {
        return value;
      }
    }
  },

  data() {
    return {
      search: "",
      dialog: false,
      project_loader: true,
      single_expand: true,
      refresh: false,
      expanded: [],
      start_date_selector: false,
      end_date_selector: false,
      mandatoryObj: [
        { text: "Project Name", value: "name" },
        { text: "Project Lead", value: "lead" },
        { text: "Status", value: "status" }
      ],
      dropdownObj: [
        { text: "Epic Id", value: "epic_id" },
        { text: "Epic Name", value: "epic_name" },
        { text: "Start Date", value: "start_date" },
        { text: "End Date", value: "end_date" }
      ],
      filterSelected: [],
      filters: {
        name: [],
        lead: [],
        key: [],
        skillsets: [],
        epic_id: [],
        epic_name: [],
        start_date: "",
        end_date: ""
      },
      searchFilter: {
        name: "",
        lead: "",
        key: "",
        skillsets: "",
        epic_id: "",
        epic_name: "",
        filter: ""
      },
      headers: [
        {
          text: "Key",
          align: "start",
          value: "key"
        },
        { text: "Project Name", value: "name" },
        { text: "Project Lead", value: "lead" },
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
    columnValueList(value) {
      if (value === "lead")
        return this.projects.map(project => {
          return {
            value: project[value],
            text: this.$options.filters.mapLeads(project[value], this.appLeads)
          };
        });
      else
        return this.projects.map(project => {
          return {
            value: project[value],
            text: project[value]
          };
        });
    },
    deleteFilter(value) {
      const index = this.filterSelected.findIndex(filter => filter.value === value);
      if (index >= 0) this.filterSelected.splice(index, 1);
      this.filters[value] = "";
    },
    clearFilters() {
      this.filterSelected = [];
    },
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
        case "Ongoing":
          return this.$store.getters.getActiveProjects;
        case "Archived":
          return this.$store.getters.getArchivedProjects;
      }
    },
    filteredProjects() {
      return this.projects.filter(project => {
        return Object.keys(this.filters).every(filter => {
          if (filter === "start_date" && this.filters[filter].length > 0) {
            let filter_date = this.$moment(
              this.$moment(this.filters[filter], "YYYY-MM-DD").format("DD-MM-YYYY"),
              "DD-MM-YYYY"
            );
            let project_date = this.$moment(project[filter], "DD-MM-YYYY");
            return project_date >= filter_date;
          } else if (filter === "end_date" && this.filters[filter].length > 0) {
            let filter_date = this.$moment(
              this.$moment(this.filters[filter], "YYYY-MM-DD").format("DD-MM-YYYY"),
              "DD-MM-YYYY"
            );
            let project_date = this.$moment(project[filter], "DD-MM-YYYY");
            return project_date <= filter_date;
          } else if (Array.isArray(project[filter]) && this.filters[filter].length > 0) {
            for (let value of project[filter]) {
              if (this.filters[filter].includes(value)) {
                return this.filters[filter].includes(value);
              }
            }
          } else {
            return this.filters[filter].length < 1 || this.filters[filter].includes(project[filter]);
          }
        });
      });
    },

    filterSelected1() {
      return this.filterSelected.filter(filter => {
        return filter.value !== "start_date" && filter.value !== "end_date";
      });
    },

    filterSelected2() {
      return this.filterSelected.filter(filter => {
        return filter.value === "start_date" || filter.value === "end_date";
      });
    },

    formatedStartDate() {
      if (this.filters["start_date"].length === 0) return "";
      return this.$moment(this.filters["start_date"], "YYYY-MM-DD").format(
        "DD-MM-YYYY"
      );
    },

    formatedEndDate() {
      if (this.filters["end_date"].length === 0) return "";
      return this.$moment(this.filters["end_date"], "YYYY-MM-DD").format(
        "DD-MM-YYYY"
      );
    }
  },

  watch: {
    filterSelected: function(newVal, oldVal) {
      if (oldVal.length > newVal.length) {
        var difference = oldVal.filter(value => !newVal.includes(value));
        for (let index in difference)
          this.filters[difference[index].value] = "";
      }
    }
  },

  created() {
    this.loadProjects();
  }
};
</script>

<style scoped>
>>> .v-autocomplete {
  width: 180px;
  font-size: 13px;
}
>>> .v-text-field {
  width: 180px;
  font-size: 13px;
}
>>> .v-list-item {
  overflow: auto;
  text-overflow: unset;
  /* width: 250px; */
}
>>> .v-list-item--active {
  color: white;
  background-color: #bbdefb;
}
>>> .v-list-item:hover {
  list-style: none;
  text-align: left;
  /* padding: 4px 2px; */
  border: 1px solid black;
  background-color: #e3f2fd;
}
.col-12 {
  padding-top: 0;
  padding-bottom: 0;
}
.project-card1 {
  margin: 20px 50px 0px 50px;
}
.project-card2 {
  margin: 0px 50px 20px 50px;
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
