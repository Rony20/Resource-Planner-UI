<template>
  <v-content>
    <v-list v-for="(project, key) in projects" :key="key" class="text=center">
      <v-row>
        <v-col cols="12" sm="4">{{ project.project }}</v-col>
        <v-col cols="12" sm="4"></v-col>
        <v-col cols="12" sm="4">
          <v-row>
            <v-col cols="12" sm="4"></v-col>
            <v-col cols="12" sm="4"></v-col>
            <edit-request-dialog v-bind:requestObj="Object.assign({}, project)" />
            <project-info-dialog />
          </v-row>
        </v-col>
      </v-row>
      <v-data-table
        :headers="employee_headers"
        :items="project.employees"
        hide-default-footer
        class="elevation-1"
        :single-select="singleSelect"
        item-key="name"
        show-select
        id="employeetable"
      >
        <template v-slot:item.priority="{ item }">
          <div class="mt-2">
            <priority-component
              :priority="item.priority"
              @priorityChanged="item.priority = $event"
            />
          </div>
        </template>

        <template v-slot:item.demandedHours="{ item }">
          <v-chip class="mr-2" small v-for="(hour, key) in item.demandedHours" :key="key">{{ hour }}</v-chip>
          <!-- <weekly-timeline-component
            :hours="item.demandedHours"
            @hoursChanged="item.demandedHours = $event"
          />-->
        </template>
      </v-data-table>
    </v-list>
  </v-content>
</template>

<script>
import editRequestDialog from "../EditRequestDialogBox/editrequestdialogbox.vue";
import projectInfoDialog from "../ProjectInfoDialogBox/projectinfodialogbox.vue";
import priorityComponent from "../PriorityComponent/prioritycomponent.vue";
// import weeklyTimelineComponent from "../WeeklyTimelineComponent/weeklytimelinecomponent.vue";
export default {
  name: "requestslist",
  components: {
    editRequestDialog,
    projectInfoDialog,
    priorityComponent
    // weeklyTimelineComponent
  },
  data() {
    return {
      projects: this.$store.state.r_projects,
      priority: "",
      editRequestDialog: false,
      projectInfoDialog: false,
      singleSelect: false,
      hours: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      employee_headers: [
        {
          text: "Name",
          value: "name",
          align: "center"
        },
        {
          text: "Priority",
          value: "priority",
          align: "center",
          width: "250px"
        },
        {
          text: "Demanded Hours",
          value: "demandedHours",
          align: "center",
          sortable: false
        }
      ]
    };
  },
  methods: {
    remove(item) {
      this.priority_chips.splice(this.chips.indexOf(item), 1);
      this.priority_chips = [...this.priority_chips];
    },
    addTeammate(item) {
      console.log(item);
      this.editRequestDialog = true;
    },
    showTeamInfo(item) {
      console.log(item);
      this.projectInfoDialog = true;
    }
  }
};
</script>

<style scoped></style>
