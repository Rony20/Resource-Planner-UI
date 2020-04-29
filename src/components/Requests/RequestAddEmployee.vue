<template>
  <v-dialog max-width="600px" v-model="dialog" persistent>
    <template v-slot:activator="{ on }">
      <v-btn icon slot="activator" v-on="on">
        <v-icon>person_add</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <v-icon left>person_add</v-icon>Add New Employee
        <v-spacer></v-spacer>
        <v-btn
          icon
          @click="
            dialog = false;
            resetData();
          "
        >
          <v-icon>close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="mt-3">
        <v-container fluid>
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <v-btn-toggle v-model="emp_type" mandatory>
                <v-btn text small>Find</v-btn>
                <v-btn text small>Get Suggestions</v-btn>
              </v-btn-toggle>
            </v-col>
            <v-col cols="12" sm="12" md="12">
              <v-autocomplete
                v-model="selected_employees"
                :items="appEmployees"
                item-text="employee_name"
                item-value="employee_id"
                label="Select Employee"
                multiple
                hide-selected
              >
                <template v-slot:selection="data">
                  <v-chip
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    close
                    @click="data.select"
                    @click:close="remove(data.item.employee_id)"
                  >
                    <v-avatar left>
                      <v-img src="@/assets/avatar.png"></v-img>
                    </v-avatar>
                    {{ data.item.employee_name }}
                  </v-chip>
                </template>

                <template v-slot:item="data">
                  <v-list-item-avatar>
                    <v-img src="@/assets/avatar.png"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>
                      <v-row>
                        <v-col md="4" cols="10">{{
                          data.item.employee_name
                        }}</v-col>
                        <v-col md="6" cols="10">
                          <v-chip
                            small
                            label
                            dark
                            color="primary"
                            class="mx-1"
                            v-for="skill in data.item.skills"
                            :key="skill"
                            >{{ skill | mapSkills(appSkills) }}</v-chip
                          >
                        </v-col>
                      </v-row>
                    </v-list-item-title>
                  </v-list-item-content>
                </template>
              </v-autocomplete>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="error"
          class="ma-2"
          raised
          @click="
            dialog = false;
            resetData();
          "
        >
          <v-icon left>cancel</v-icon>Cancel
        </v-btn>
        <v-btn
          color="info"
          class="ma-2"
          raised
          @click="
            dialog = false;
            saveRequest();
          "
        >
          <v-icon left>save</v-icon>Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
// import AppFillWeekHours from "../Common/AppFillWeekHours.vue";

import { storeDataPropertiesMixin } from "../../Mixins/storeDataProperties.js";

export default {
  props: { projectKey: String },

  components: {},

  mixins: [storeDataPropertiesMixin],

  data() {
    return {
      dialog: false,
      emp_type: 0,
      selected_employees: [],
      today: this.$moment(),
      next_week_start: this.$moment()
        .startOf("isoWeek")
        .add(1, "week"),
      next_week_end: this.$moment()
        .startOf("isoWeek")
        .add(1, "week")
        .add(6, "days")
    };
  },

  methods: {
    remove(item) {
      const index = this.selected_employees.indexOf(item);
      if (index >= 0) {
        this.selected_employees.splice(index, 1);
      }
    },

    resetData() {
      this.selected_employees = [];
    },

    // saveRequest() {
    //   this.selected_employees.forEach(employee_id => {
    //     let request_obj = {
    //       request_id: `${
    //         this.projectKey
    //       }-${employee_id}-${this.next_week_start.format("DDMMYYYY")}`,
    //       project_id: this.projectKey,
    //       pm_id: this.appProject.lead,
    //       employee_id: employee_id,
    //       priority: "Urgent",
    //       requested_week: [
    //         this.next_week_start.format("DD-MM-YYYY"),
    //         this.next_week_end.format("DD-MM-YYYY")
    //       ],
    //       requested_hours: [0, 0, 0, 0, 0, 0, 0],
    //       request_date: this.today.format("DD-MM-YYYY"),
    //       request_status: "Intialized"
    //     };
    //     this.$saveRequest(request_obj)
    //       .then(resp => console.log(resp))
    //       .catch(error => console.log(error));
    //   });
    //   this.$emit("refresh")
    // },

    saveRequest() {
      let new_employee_list = [];
      this.selected_employees.forEach(employee_id => {
        let request_obj = {
          project_id: this.projectKey,
          pm_id: this.appProject.lead,
          employee_id: employee_id,
          priority: "Urgent",
          requested_hours: [8, 8, 8, 8, 8, 0, 0],
          request_status: "Intialized"
        };
        new_employee_list.push(request_obj);
      });
      this.$emit("addNewEmployee", new_employee_list);
    }
  },
  computed: {
    appProject() {
      return this.$store.getters.getProjectByKey(this.projectKey);
    }
  }
};
</script>

<style scoped></style>
