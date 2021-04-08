/* eslint-disable vue/return-in-computed-property */
<template>
  <v-app>
    <v-card elevation="0" class="project-card1">
      <v-row>
        <v-col
          cols="10"
          sm="2"
          v-for="(filterBar, index) in mandatoryObj"
          :key="index"
          class="mr-n12"
        >
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
                <v-icon
                  size="20"
                  right
                  class="ml-2"
                  v-if="filterSelected.length > 0"
                  @click.native.stop
                  @click.prevent="clearFilters"
                >
                  mdi-close-circle
                </v-icon>
              </v-btn>
            </template>
            <v-menu>
              <template v-slot:activator="{ on }">
                <v-list v-on="on">
                  <v-list-item v-for="(obj, index) in dropdownObj" :key="index">
                    <v-checkbox
                      multiple
                      v-model="filterSelected"
                      :label="obj.text"
                      :value="obj"
                      dense
                      class="my-md-n2"
                    ></v-checkbox>
                  </v-list-item>
                </v-list>
              </template>
            </v-menu>
          </v-menu>
        </v-col>

        <v-spacer></v-spacer>

        <v-col cols="10" sm="1">
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
                    @click="
                      headerValues = headers;
                      columnsFilters();
                    "
                    color="primary"
                    text
                    class="text-capitalize ml-n4 mt-n3"
                    >Restore Defaults</v-btn
                  >
                </v-list-item>
                <v-list-item
                  v-for="(item, index) in filteredItems"
                  :key="item.text"
                  class="mt-n3"
                >
                  <v-list-item-action>
                    <v-checkbox
                      v-model="headerValues[index].selected"
                      :label="item.text"
                      :value="item"
                      dense
                      class="caption compact-checkbox"
                      v-bind:false-value="0"
                      v-bind:true-value="1"
                    ></v-checkbox>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
              <v-divider></v-divider>
              <v-card-actions class="mt-3">
                <v-row justify="center">
                  <v-btn
                    @click="columnsFilters"
                    color="info"
                    class="mr-3"
                    small
                  >
                    <v-icon left small>check</v-icon>Done
                  </v-btn>
                  <v-btn @click="menu = false" color="error" class="mr-3" small>
                    <v-icon left small>cancel</v-icon>Cancel
                  </v-btn>
                </v-row>
              </v-card-actions>
            </v-card>
          </v-menu>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="10"
          sm="2"
          v-for="(filterBar, index) in filterSelected1"
          :key="index"
          class="mr-n12 mt-md-n12 mb-md-n8"
        >
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
            <v-icon
              size="20"
              slot="append"
              @click="deleteFilter(filterBar.value)"
              >mdi-close-circle</v-icon
            >
            <template v-slot:selection="{ item, index }">
              <span v-if="index === 0">{{ item.text | maximumLength }}</span>
              <span v-if="index === 1"> , ...</span>
            </template>
          </v-autocomplete>
        </v-col>

        <v-col
          cols="10"
          sm="2"
          v-if="filterSelected2.some(date => date.value === 'start_date')"
          class="mr-n12 mt-md-n12 mb-md-n8"
        >
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
                <v-icon size="20" slot="append" left
                  >keyboard_arrow_down</v-icon
                >
                <v-icon
                  size="20"
                  slot="append"
                  @click="deleteFilter('start_date')"
                  >mdi-close-circle</v-icon
                >
              </v-text-field>
            </template>
            <v-date-picker
              v-model="filters.start_date"
              @input="start_date_selector = false"
            ></v-date-picker>
          </v-menu>
        </v-col>

        <v-col
          cols="10"
          sm="2"
          v-if="filterSelected2.some(date => date.value === 'end_date')"
          class="mr-n12 mt-md-n12 mb-md-n8"
        >
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
                <v-icon size="20" slot="append" left
                  >keyboard_arrow_down</v-icon
                >
                <v-icon
                  size="20"
                  slot="append"
                  @click="deleteFilter('end_date')"
                  >mdi-close-circle</v-icon
                >
              </v-text-field>
            </template>
            <v-date-picker
              v-model="filters.end_date"
              @input="end_date_selector = false"
            ></v-date-picker>
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
        :headers="selectedHeaders"
        :items="filteredProjects"
        item-key="epic_id"
        :search="search"
        :expanded.sync="expanded"
        :single-expand="single_expand"
        :loading="project_loader"
        loading-text="Loading Projects..."
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
      </v-data-table>
    </v-card>
  </v-app>
</template>

<script>
import ProjectEditPopup from "./popups/ProjectEditPopup";
import ProjectTeamPopup from "./popups/ProjectTeamPopup";
import { storeDataPropertiesMixin } from "../../Mixins/storeDataProperties.js";

export default {
  name: "Project",

  components: {
    "project-edit-popup": ProjectEditPopup,
    "project-team-popup": ProjectTeamPopup
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
          text: "Epic Key",
          align: "start",
          value: "epic_id",
          selected: 1
        },
        { text: "Epic Name", value: "epic_name", selected: 1 },
        { text: "Project Name", value: "name", selected: 1 },
        { text: "Business Unit", value: "business_unit", selected: 1 },
        { text: "Project Lead", value: "lead", selected: 1 },
        { text: "PMO Start Date", value: "start_date", selected: 1 },
        { text: "PMO End Date", value: "end_date", selected: 1 },
        { text: "Status", value: "status", selected: 1 },
        {
          text: "Actions",
          value: "actions",
          sortable: false,
          align: "center",
          selected: 1
        },
        { text: "Customer Name", value: "customer_name", selected: 0 },
        { text: "Description", value: "description", selected: 0 },
        { text: "Logged Hours", value: "logged_hours", selected: 0 },
        { text: "PMO Estimated Hours", value: "pmo_estimated", selected: 0 },
        { text: "BD Estimated Hours", value: "bd_estimated", selected: 0 },

        { text: "CMR Order Number", value: "cmr_order_number", selected: 0 },
        { text: "BD Dev Start Date", value: "bd_dev_start_date", selected: 0 },
        { text: "BD Dev End Date", value: "bd_dev_end_date", selected: 0 },
        {
          text: "BD Supported Estimated Hours",
          value: "bd_supported_estimated_hours",
          selected: 0
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
      const index = this.filterSelected.findIndex(
        filter => filter.value === value
      );
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
    },
    columnsFilters() {
      this.menu = false;
      this.selectedHeaders = this.headerValues.filter(item => item.selected);
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
    },
    filteredProjects() {
      return this.projects.filter(project => {
        return Object.keys(this.filters).every(filter => {
          if (filter === "start_date" && this.filters[filter].length > 0) {
            let filter_date = this.$moment(
              this.$moment(this.filters[filter], "YYYY-MM-DD").format(
                "DD-MM-YYYY"
              ),
              "DD-MM-YYYY"
            );
            let project_date = this.$moment(project[filter], "DD-MM-YYYY");
            return project_date >= filter_date;
          } else if (filter === "end_date" && this.filters[filter].length > 0) {
            let filter_date = this.$moment(
              this.$moment(this.filters[filter], "YYYY-MM-DD").format(
                "DD-MM-YYYY"
              ),
              "DD-MM-YYYY"
            );
            let project_date = this.$moment(project[filter], "DD-MM-YYYY");
            return project_date <= filter_date;
          } else if (
            Array.isArray(project[filter]) &&
            this.filters[filter].length > 0
          ) {
            for (let value of project[filter]) {
              if (this.filters[filter].includes(value)) {
                return this.filters[filter].includes(value);
              }
            }
          } else {
            return (
              this.filters[filter].length < 1 ||
              this.filters[filter].includes(project[filter])
            );
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
    filterSelected: function(newVal, oldVal) {
      if (oldVal.length > newVal.length) {
        const difference = oldVal.filter(value => !newVal.includes(value));
        for (let index in difference)
          this.filters[difference[index].value] = "";
      }
    },
    menu(val) {
      if (val === true) {
        this.headerValues = this.headers;
      }
    }
  },
  created() {
    this.loadProjects();
    this.headerValues = this.headers;
    this.selectedHeaders = this.headers.filter(item => item.selected);
    this.mainHeaders = this.headers;
  }
};
</script>

<style scoped>
>>> .project-card {
  margin: 30px 20px;
}
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
}
>>> .v-list-item--active {
  color: white;
  background-color: #bbdefb;
}
>>> .v-list-item:hover {
  list-style: none;
  text-align: left;
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
