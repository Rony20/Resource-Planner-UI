<template>
  <div>
    <div class="d-flex flex-row">
      <request-date-picker @weekChanged="print($event)"></request-date-picker>
      <v-spacer></v-spacer>
      <div class="d-flex flex-row">
        <v-btn
          tile
          small
          class="mx-2"
          :disabled="!disability_control"
          @click="disability_control = false"
          ><v-icon left small>edit</v-icon> edit</v-btn
        >
        <v-btn
          tile
          small
          :disabled="disability_control"
          class="mx-2"
          @click="saveRequests()"
          ><v-icon left small>save</v-icon> save</v-btn
        >
      </div>
    </div>
    <div class="d-flex flex-row">
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
    </div>

    <v-progress-linear
      :active="request_loader"
      :indeterminate="request_loader"
      class="mt-2"
    ></v-progress-linear>

    <div v-if="!request_loader">
      <!-- {{ requests }} -->
      <!-- {{ selected }} -->
      <v-card class="my-4" v-for="id in Object.keys(requests)" :key="id">
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
          Lead : {{ id | mapKeyWithPm(appProjects) | mapLeads(appLeads) }}
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
              <div>{{ item.employee_id | mapEmployees(appEmployees) }}</div>
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
                @filledHours="
                  item.requested_hours = $event;
                  check(item.employee_id, item.requested_hours);
                "
              ></app-fill-week-hours>
            </template>

            <template v-slot:item.status="{ item }">
              <v-chip
                label
                outlined
                small
                color="green"
                class="success text-capitalize"
                >{{ item.request_status }}</v-chip
              >
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
import RequestPriority from "./RequestPriority.vue";
import AppFillWeekHours from "../Common/AppFillWeekHours.vue";
import RequestProjectInfo from "./RequestProjectInfo.vue";
import RequestAddEmployee from "./RequestAddEmployee.vue";
import RequestDatePicker from "./RequestDatePicker.vue";

import { storeDataPropertiesMixin } from "../../Mixins/storeDataProperties.js";

export default {
  name: "RequestsList",

  components: {
    "request-priority": RequestPriority,
    "app-fill-week-hours": AppFillWeekHours,
    "request-project-info": RequestProjectInfo,
    "request-add-employee": RequestAddEmployee,
    "request-date-picker": RequestDatePicker
  },

  mixins: [storeDataPropertiesMixin],

  data() {
    return {
      dialog: false,
      request_loader: false,
      autofill: false,
      weekend: false,
      selected: [],
      requests: {},
      pm: 19,
      disability_control: false,
      today: this.$moment(),
      week_start: this.$moment()
        .startOf("isoWeek")
        .add(1, "week"),
      week_end: this.$moment()
        .startOf("isoWeek")
        .add(1, "week")
        .add(6, "days"),
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
          align: "start"
        },
        {
          text: "Priority",
          value: "priority",
          align: "center"
        },
        {
          text: "Requested Hours",
          value: "hours",
          align: "center"
        },
        {
          text: "Status",
          value: "status",
          align: "center"
        }
      ]
    };
  },

  methods: {
    print(week) {
      (this.week_start = week[0]), (this.week_end = week[1]);
    },

    previousWeek() {
      this.week_start = this.$moment(this.week_start.subtract(1, "week"));
      this.week_end = this.$moment(this.week_end.subtract(1, "week"));
    },

    nextWeek() {
      this.week_start = this.$moment(this.week_start.add(1, "week"));
      this.week_end = this.$moment(this.week_end.add(1, "week"));
    },

    currentWeek() {
      this.week_start = this.$moment()
        .startOf("isoWeek")
        .add(1, "week");
      this.week_end = this.$moment()
        .startOf("isoWeek")
        .add(1, "week")
        .add(6, "days");
    },

    convertToDate(date) {
      return date.format("DD-MM-YYYY");
    },

    convertToWeek(start, end) {
      return [this.convertToDate(start), this.convertToDate(end)];
    },

    refresh() {
      this.loadRequests(
        this.convertToDate(this.week_start),
        this.convertToDate(this.week_end)
      );
    },

    addNewEmployees(id, employee_list) {
      employee_list.forEach(emp => {
        this.requests[id].push(emp);
      });
      console.log(this.requests);
    },

    check(employee_id, requested_hours) {
      // console.log(employee_id)
      // console.log(this.convertToWeek(this.next_week_start, this.next_week_end))
      this.$checkHours(
        employee_id,
        this.convertToDate(this.next_week_start),
        this.convertToDate(this.next_week_end)
      )
        .then(response => {
          for (let i = 0; i < 6; i++) {
            if (requested_hours[i] + response.data[i] > 8) {
              this.$notify({
                title: "Warning",
                text: `Day ${i + 1} hours have to be ${8 -
                  response.data[i]} or less than ${8 - response.data[i]}`,
                type: "warning"
              });
            }
          }
        })
        .catch(error => console.log(error));
    },

    // loadRequests(weekArray) {
    //   let empty = {};
    //   this.requests = Object.assign({}, empty);
    //   console.log("Start", this.requests);
    //   this.request_loader = true;

    //   this.$getRequestsByDate({
    //     week: weekArray
    //   })
    //     .then(response => {
    //       if (response.data.length === 0) {
    //         this.loadPreviousWeekRequests();
    //       } else {
    //         response.data.forEach(element => {
    //           let request_object = {
    //             request_id: element["request_id"],
    //             project_id: element["project_id"],
    //             pm_id: element["pm_id"],
    //             employee_id: element["employee_id"],
    //             priority: element["priority"],
    //             requested_week: element["requested_week"],
    //             requested_hours: element["requested_hours"],
    //             request_date: element["request_date"],
    //             request_status: element["request_status"]
    //           };

    //           if (request_object.project_id in this.requests) {
    //             this.requests[request_object.project_id].push(request_object);
    //           } else {
    //             this.requests[request_object.project_id] = [];
    //             this.requests[request_object.project_id].push(request_object);
    //           }
    //         });
    //       }

    //       console.log("End", this.requests);
    //     })
    //     .catch(error => console.log(error))
    //     .finally(() => {
    //       this.request_loader = false;
    //     });
    // },

    loadRequests(week_start, week_end) {
      this.requests = {};
      let requests = {};
      console.log("Start", this.requests);
      this.request_loader = true;

      this.$getRequestsByDate(this.pm, week_start, week_end)
        .then(response => {
          if (response.data.length === 0) {
            this.loadPreviousWeekRequests();
          } else {
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
          console.log("End", this.requests);
        })
        .catch(error => console.log(error))
        .finally(() => {
          this.request_loader = false;
        });
    },

    loadPreviousWeekRequests() {
      let prev_requests = {};
      console.log("PreStart", this.requests);
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
          console.log("PrevEnd", this.requests);
        })
        .catch(error => console.log(error));
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
          console.log(request_obj);
          this.$saveRequest(request_obj)
            .then(resp => console.log(resp))
            .catch(error => console.log(error));
        });
        this.$notify({
          title: "Success",
          text: "Request For next week has been made successfully.",
          type: "success"
        });
        this.loadRequests(
          this.convertToDate(this.next_week_start),
          this.convertToDate(this.next_week_end)
        );
      }
    }
  },

  computed: {
    week() {
      let filters = this.$options.filters;
      return `${filters.formatDate(this.week_start)} - 
      ${filters.formatDate(this.week_end)}`;
    }
  },

  watch: {
    week() {
      this.loadRequests(
        this.convertToDate(this.week_start),
        this.convertToDate(this.week_end)
      );
    }
  },

  created() {
    this.loadRequests(
      this.convertToDate(this.week_start),
      this.convertToDate(this.week_end)
    );
  }
};
</script>

<style scoped></style>
