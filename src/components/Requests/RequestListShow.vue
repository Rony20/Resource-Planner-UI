<template>
  <div>
    <v-progress-linear
      :active="request_loader"
      :indeterminate="request_loader"
      class="mt-2"
    ></v-progress-linear>

    <div v-if="!request_loader">
      <v-container fluid>
        <v-row>
          <v-col cols="12" md="3">
            <v-card>
              <v-card-title class="grey--text">Requests</v-card-title>
              <v-divider></v-divider>
              <v-list-item-group>
                <v-list-item
                  v-for="id in Object.keys(requests)"
                  :key="id"
                  :href="'#' + id"
                >
                  <v-list-item-icon>
                    <v-icon>play_arrow</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ id | mapProjects(appProjects) }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-card>
          </v-col>
          <v-col cols="12" md="9">
            <v-card v-for="id in Object.keys(requests)" :key="id" :id="id">
              <v-card-title>
                {{ id | mapProjects(appProjects) }}
                <v-spacer></v-spacer>
                <request-project-info :projectKey="id"></request-project-info>
              </v-card-title>
              <v-card-subtitle class="white--text">
                Lead : {{ id | mapKeyWithPm(appProjects) | mapLeads(appLeads) }}
              </v-card-subtitle>
              <v-card-text>
                <v-data-table
                  :headers="headers"
                  :items="requests[id]"
                  item-key="employee_id"
                  hide-default-footer
                  class="elevation-2"
                >
                  <template v-slot:item.employee_name="{ item }">
                    <div>
                      {{ item.employee_id | mapEmployees(appEmployees) }}
                    </div>
                  </template>

                  <template v-slot:item.priority="{ item }">
                    <v-chip label small dark>{{ item.priority }}</v-chip>
                  </template>

                  <template v-slot:item.hours="{ item }">
                    <app-show-week-hours
                      :showDays="false"
                      :hoursArray="item.requested_hours"
                    ></app-show-week-hours>
                  </template>

                  <template v-slot:item.status="{ item }">
                    <v-chip label outlined small class="text-capitalize">{{
                      item.request_status
                    }}</v-chip>
                  </template>
                </v-data-table>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import AppShowWeekHours from "../Common/AppShowWeekHours.vue";
import RequestProjectInfo from "./RequestProjectInfo.vue";

import { storeDataPropertiesMixin } from "../../Mixins/storeDataProperties.js";

export default {
  props: {
    week_start: String,
    week_end: String
  },

  components: {
    "app-show-week-hours": AppShowWeekHours,
    "request-project-info": RequestProjectInfo
  },

  mixins: [storeDataPropertiesMixin],

  data() {
    return {
      request_loader: false,
      requests: {},
      pm: 19,
      headers: [
        {
          text: "Name",
          value: "employee_name",
          align: "start",
          width: "25%"
        },
        {
          text: "Priority",
          value: "priority",
          align: "center",
          width: "20%"
        },
        {
          text: "Requested Hours",
          value: "hours",
          align: "center",
          width: "35%"
        },
        {
          text: "Status",
          value: "status",
          align: "center",
          width: "20%"
        }
      ]
    };
  },

  methods: {
    loadRequests(week_start, week_end) {
      this.requests = {};
      let requests = {};
      this.request_loader = true;

      this.$getRequestsByDate(this.pm, week_start, week_end)
        .then(response => {
          response.data.forEach(element => {
            let request_object = {
              request_id: element["request_id"],
              project_id: element["project_id"],
              pm_id: element["pm_id"],
              employee_id: element["employee_id"],
              priority: element["priority"],
              requested_week: element["requested_week"],
              requested_hours: element["requested_hours"],
              request_date: element["request_date"],
              request_status: element["request_status"]
            };

            if (request_object.project_id in requests) {
              requests[request_object.project_id].push(request_object);
            } else {
              requests[request_object.project_id] = [];
              requests[request_object.project_id].push(request_object);
            }
          });
          this.requests = Object.assign({}, requests);
        })
        .catch(error => console.log(error))
        .finally(() => {
          this.request_loader = false;
        });
    },

    reload() {
      this.loadRequests(this.week_start, this.week_end);
    }
  },

  watch: {
    week_start() {
      this.loadRequests(this.week_start, this.week_end);
    }
  },

  created() {
    this.loadRequests(this.week_start, this.week_end);
  }
};
</script>
