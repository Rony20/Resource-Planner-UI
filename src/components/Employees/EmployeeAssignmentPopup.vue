<template>
  <v-dialog max-width="600px" v-model="dialog" persistent>
    <template v-slot:activator="{ on }">
      <v-btn icon slot="activator" v-on="on">
        <v-icon>assignment</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <v-icon left>assignment</v-icon>Assign to Project
        <v-spacer></v-spacer>
        <v-btn
          icon
          @click="
            dialog = false;
            valueAssignment();
          "
        >
          <v-icon>close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="mt-3">
        <v-form class="px-2">
          <p class="subtitle-1 font-weight-bold">
            <v-avatar class="mr-2" size="28" tile left>
              <v-img src="@/assets/avatar.png"></v-img>
            </v-avatar>
            {{ employee_name }}
          </p>

          <v-autocomplete
            v-model="project"
            :items="projectKeyList"
            item-text="name"
            item-value="key"
            label="Project to be Assigned"
            prepend-icon="note"
          ></v-autocomplete>
          <div class="caption font-weight-bold">
            From <code>{{ week_start | formatDate }}</code> to
            <code>{{ week_end | formatDate }}</code>
          </div>
          <app-fill-week-hours
            ref="resethours"
            @filledHours="allocation = $event"
          ></app-fill-week-hours>
        </v-form>
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
            valueAssignment();
          "
        >
          <v-icon left>cancel</v-icon>Cancel
        </v-btn>
        <v-btn
          color="primary"
          class="ma-2"
          raised
          @click="
            dialog = false;
            assignEmployeeToProject();
          "
        >
          <v-icon left>save</v-icon>Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import AppFillWeekHours from "../Common/AppFillWeekHours.vue";

import { storeDataPropertiesMixin } from "../../Mixins/storeDataProperties.js";

export default {
  props: {
    employeeId: Number
  },

  components: {
    "app-fill-week-hours": AppFillWeekHours
  },

  mixins: [storeDataPropertiesMixin],

  data() {
    return {
      dialog: false,
      employee_name: null,
      project: null,
      allocation: [],
      week_start: this.$moment()
        .startOf("isoWeek")
        .add(1, "week"),
      week_end: this.$moment()
        .startOf("isoWeek")
        .add(1, "week")
        .add(6, "days")
    };
  },

  methods: {
    valueAssignment() {
      this.employee_name = this.appEmployee.employee_name;
      // this.$refs.resethours.resetValues();
      // this.project = null
    },

    assignEmployeeToProject() {
      this.$createUpdateTeam(this.project, {
        allocated_employees: [this.employeeId]
      })
        .then()
        .catch(error => console.log(error));

      this.$updateEmployee(this.employeeId, {
        current_projects: {
          project: this.project,
          allocation: [
            {
              week: [
                this.week_start.format("YYYY-MM-DD"),
                this.week_end.format("YYYY-MM-DD")
              ],
              hours: this.allocation
            }
          ]
        }
      })
        .then(() => {
          this.$notify({
            title: "Success",
            text: `${
              this.appEmployee["employee_name"]
            } is assigned in "${this.$options.filters.mapProjects(
              this.project,
              this.appProjects
            )}"`,
            type: "success"
          });
        })
        .catch(error => {
          this.$notify({
            title: "Error",
            text: `Error in assigning ${
              this.appEmployee["employee_name"]
            } to "${this.$options.filters.mapProjects(
              this.project,
              this.appProjects
            )}"`,
            type: "error"
          });
          console.log(error);
        })
        .finally(() => {
          setTimeout(() => {
            this.$emit("refresh");
          }, 500);
        });
      // this.$refs.resethours.resetValues();
    },
  },

  mounted() {
    this.valueAssignment();
  },
  computed: {
    appEmployee() {
      return this.$store.getters.getEmployeeById(this.employeeId);
    },

    projectKeyList() {
      return this.$store.getters.getProjectKeyList;
    }
  },

  watch: {},
};
</script>

<style scoped></style>
