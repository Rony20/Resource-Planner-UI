<template>
  <div>
    <div class="d-flex flex-row">
      <div class="d-flex flex-row ml-2">
        <v-checkbox
          dense
          v-model="autofill"
          label="Autofill"
          v-if="!disability_control"
        ></v-checkbox>
        <v-checkbox
          class="ml-2"
          dense
          v-model="weekend"
          label="Weekends"
          v-if="!disability_control"
        ></v-checkbox>
        <v-checkbox
          class="ml-2"
          dense
          v-model="select_all"
          label="selectAll"
          v-if="!disability_control"
        ></v-checkbox>
      </div>
      <v-spacer></v-spacer>
      <div class="d-flex flex-row mt-4">
        <div id="my-select">
          <v-select
            v-model="request_type_selected"
            :items="request_type"
            dense
            v-if="!load_button_visibility"
            class="mx-2"
          ></v-select>
        </div>
        <v-btn-toggle
          class="mx-2"
          v-if="load_button_visibility"
          v-model="load_button_value"
        >
          <v-btn
            text
            small
            @click="
              loadRequests(
                convertToDate(next_week_start),
                convertToDate(next_week_end)
              )
            "
            >Load previous requests</v-btn
          >
          <v-btn text small @click="loadRequestsFromProject()"
            >Load from projects</v-btn
          >
        </v-btn-toggle>
        <v-btn
          tile
          small
          depressed
          class="mx-2"
          :disabled="!disability_control"
          @click="disability_control = false"
          ><v-icon left small>edit</v-icon> edit</v-btn
        >
        <v-btn
          tile
          small
          depressed
          :disabled="disability_control"
          class="mx-2"
          @click="saveRequests()"
          ><v-icon left small>save</v-icon> save</v-btn
        >
      </div>
    </div>

    <v-progress-linear
      :active="request_loader"
      :indeterminate="request_loader"
      class="mt-2"
    ></v-progress-linear>

    <div v-if="!request_loader" class="d-flex flex-row">
      <v-container fluid>
        <v-row>
          <v-col cols="12" md="3">
            <div>
              <v-card>
                <v-card-title class="grey--text">Requests</v-card-title>
                <v-divider></v-divider>
                <v-list-item-group>
                  <div id="list-item">
                    <v-list-item
                      v-for="id in Object.keys(requests).sort()"
                      :key="id"
                      @click="$vuetify.goTo('#' + id, options)"
                    >
                      <v-list-item-icon>
                        <v-icon>play_arrow</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-subtitle>
                          {{ id | mapProjects(appProjects) }}
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </div>
                </v-list-item-group>
              </v-card>
            </div>
          </v-col>
          <v-col cols="12" md="9">
            <div>
              <v-card
                class="mb-4"
                v-for="id in Object.keys(requests).sort()"
                :key="id"
                :id="id"
              >
                <v-card-title>
                  {{ id | mapProjects(appProjects) }}
                  <v-spacer></v-spacer>
                  <request-add-employee
                    v-if="!disability_control"
                    :projectKey="id"
                    @addNewEmployee="addNewEmployees(id, $event)"
                  ></request-add-employee>
                  <request-project-info :projectKey="id"></request-project-info>
                </v-card-title>
                <v-card-subtitle>
                  Lead :
                  {{ id | mapKeyWithPm(appProjects) | mapLeads(appLeads) }}
                </v-card-subtitle>
                <v-card-text>
                  <v-data-table
                    v-model="selected"
                    :headers="headers"
                    :items="requests[id]"
                    item-key="employee_id"
                    :show-select="!disability_control"
                    hide-default-footer
                    class="elevation-2"
                  >
                    <template v-slot:item.employee_name="{ item }">
                      <div>
                        {{ item.employee_id | mapEmployees(appEmployees)
                        }}<v-icon right v-if="false">error</v-icon>
                      </div>
                    </template>

                    <template v-slot:item.priority="{ item }">
                      <request-priority
                        :disabilityControl="disability_control"
                        :priority="item.priority"
                        @priorityChanged="item.priority = $event"
                      ></request-priority>
                    </template>

                    <template v-slot:item.hours="{ item }">
                      <app-fill-week-hours
                        :disabilityControl="disability_control"
                        :autofill="autofill"
                        :weekend="weekend"
                        :hoursArray="item.requested_hours"
                        @filledHours="item.requested_hours = $event"
                      ></app-fill-week-hours>
                    </template>

                    <template v-slot:item.status="{ item }">
                      <v-chip label outlined small class="text-capitalize">{{
                        item.request_status
                      }}</v-chip>
                    </template>
                  </v-data-table>
                </v-card-text>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import RequestPriority from "./RequestPriority.vue";
import AppFillWeekHours from "../Common/AppFillWeekHours.vue";
import RequestProjectInfo from "./RequestProjectInfo.vue";
import RequestAddEmployee from "./RequestAddEmployee.vue";

import { storeDataPropertiesMixin } from "../../Mixins/storeDataProperties.js";

export default {
  name: "RequestsList",

  components: {
    "request-priority": RequestPriority,
    "app-fill-week-hours": AppFillWeekHours,
    "request-project-info": RequestProjectInfo,
    "request-add-employee": RequestAddEmployee
  },

  mixins: [storeDataPropertiesMixin],

  data() {
    return {
      dialog: false,
      request_loader: false,
      autofill: false,
      weekend: false,
      select_all: false,
      error: false,
      request_type_selected: "Requested Requests",
      request_type: ["Requested Requests", "Remaining Requests"],
      selected: [],
      requests: {},
      pm: 19,
      load_button_value: 0,
      load_button_visibility: false,
      disability_control: false,
      today: this.$moment(),
      next_week_start: this.$moment()
        .startOf("isoWeek")
        .add(1, "week"),
      next_week_end: this.$moment()
        .startOf("isoWeek")
        .add(1, "week")
        .add(6, "days"),
      current_week_start: this.$moment().startOf("isoWeek"),
      current_week_end: this.$moment()
        .startOf("isoWeek")
        .add(6, "days"),
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
          width: "20%",
          sortable: false
        },
        {
          text: "Requested Hours",
          value: "hours",
          align: "center",
          width: "35%",
          sortable: false
        },
        {
          text: "Status",
          value: "status",
          align: "center",
          width: "20%",
          sortable: false
        }
      ]
    };
  },

  methods: {
    convertToDate(date) {
      return date.format("DD-MM-YYYY");
    },

    convertToWeek(start, end) {
      return [this.convertToDate(start), this.convertToDate(end)];
    },

    reload() {
      this.request_type_selected = "Requested Requests";
      this.loadRequests(
        this.convertToDate(this.next_week_start),
        this.convertToDate(this.next_week_end)
      );
    },

    addNewEmployees(id, employee_list) {
      employee_list.forEach(emp => {
        this.requests[id].push(emp);
      });
    },

    check(employee_id) {
      var conflict = false;
      this.$checkHours(
        employee_id,
        this.convertToDate(this.next_week_start),
        this.convertToDate(this.next_week_end)
      )
        .then(response => {
          console.log(response.data, "inside");
          conflict = response.data;
        })
        .catch(error => console.log(error))
        .finally();
      return conflict;
    },

    clearAll() {
      this.selected = [];
    },

    selectAll() {
      this.selected = [];
      let selected = [];
      for (let key in this.requests) {
        this.requests[key].forEach(request => {
          selected.push(request);
        });
      }
      this.selected = [...selected];
    },

    loadRequests(week_start, week_end) {
      this.requests = {};
      let requests = {};
      this.selected = [];
      this.request_loader = true;

      this.$getRequestsByDate(this.pm, week_start, week_end)
        .then(response => {
          if (response.data.length === 0) {
            this.load_button_visibility = true;
            this.disability_control = false;
            this.load_button_value = 0;
            this.select_all = false;
            this.weekend = false;
            this.autofill = false;
            this.loadPreviousWeekRequests();
          } else {
            this.disability_control = true;
            this.load_button_visibility = false;
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
          }
        })
        .catch(error => console.log(error))
        .finally(() => {
          this.request_loader = false;
        });
    },

    loadPreviousWeekRequests() {
      let prev_requests = {};
      this.$getRequestsByDate(
        this.pm,
        this.convertToDate(this.current_week_start),
        this.convertToDate(this.current_week_end)
      )
        .then(response => {
          response.data.forEach(element => {
            let request_object = {
              project_id: element["project_id"],
              pm_id: element["pm_id"],
              employee_id: element["employee_id"],
              priority: element["priority"],
              requested_hours: element["requested_hours"],
              request_status: "Initiated"
            };

            if (request_object.project_id in prev_requests) {
              prev_requests[request_object.project_id].push(request_object);
            } else {
              prev_requests[request_object.project_id] = [];
              prev_requests[request_object.project_id].push(request_object);
            }
          });
          this.requests = Object.assign(prev_requests);
        })
        .catch(error => console.log(error));
    },

    loadRequestsFromProject() {
      this.requests = {};
      this.request_loader = true;
      this.weekend = false;
      this.autofill = false;
      this.select_all = false;
      this.$projectTeamByPm(
        this.pm,
        this.convertToDate(this.next_week_start),
        this.convertToDate(this.next_week_end)
      )
        .then(response => {
          let requests = {};
          for (let key in response.data) {
            requests[key] = [];
            response.data[key].forEach(id => {
              let request_object = {
                project_id: key,
                pm_id: this.pm,
                employee_id: id,
                priority: "Urgent",
                requested_hours: [8, 8, 8, 8, 8, 0, 0],
                request_status: "Initiated"
              };
              requests[key].push(request_object);
            });
          }
          this.requests = Object.assign({}, requests);
        })
        .catch(error => console.log(error))
        .finally(() => {
          this.request_loader = false;
        });
    },

    saveRequests() {
      if (this.selected.length === 0) {
        this.$notify({
          title: "Warning",
          text: "Please Select Employees for request.",
          type: "warning"
        });
      } else {
        this.disability_control = true;
        console.log(this.selected);
        this.selected.forEach(emp => {
          let request_obj = {
            request_id: `${emp.project_id}-${
              emp.employee_id
            }-${this.next_week_start.format("DDMMYYYY")}`,
            project_id: emp.project_id,
            pm_id: emp.pm_id,
            employee_id: emp.employee_id,
            priority: emp.priority,
            requested_week: [
              this.next_week_start.format("DD-MM-YYYY"),
              this.next_week_end.format("DD-MM-YYYY")
            ],
            requested_hours: emp.requested_hours,
            request_date: this.today.format("DD-MM-YYYY"),
            request_status: "pending"
          };
          this.$saveRequest(request_obj)
            .then()
            .catch(error => console.log(error));
        });
        this.$notify({
          title: "Success",
          text: "Request For next week has been made successfully.",
          type: "success"
        });
        this.request_type_selected = "Requested Requests";
        this.loadRequests(
          this.convertToDate(this.next_week_start),
          this.convertToDate(this.next_week_end)
        );
      }
    }
  },

  watch: {
    request_type_selected() {
      if (!this.load_button_visibility) {
        if (this.request_type_selected === "Requested Requests") {
          this.loadRequests(
            this.convertToDate(this.next_week_start),
            this.convertToDate(this.next_week_end)
          );
        }
        if (this.request_type_selected === "Remaining Requests") {
          this.disability_control = false;
          this.loadRequestsFromProject();
        }
      }
    },

    select_all() {
      if (this.select_all) this.selectAll();
      else this.clearAll();
    }
  },

  created() {
    this.loadRequests(
      this.convertToDate(this.next_week_start),
      this.convertToDate(this.next_week_end)
    );
    console.log(this.check(437));
  }
};
</script>

<style scoped>
#requests {
  position: relative;
}
#request-list {
  position: fixed;
  width: 350px;
}
#list-item {
  overflow-y: scroll;
  height: auto;
  max-height: 300px;
}
#my-select {
  width: 210px;
}
</style>
