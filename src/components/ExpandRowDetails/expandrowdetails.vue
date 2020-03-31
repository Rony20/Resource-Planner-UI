<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12" md="6">
        <div class="d-flex caption grey--text">Employee Name</div>
        <div class="subtitle-1">{{ this.empObject.employee_name }}</div>
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <div class="d-flex caption grey--text">Designation</div>
        <div class="subtitle-1">{{ this.empObject.designation }}</div>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="12" sm="6" md="6">
        <div class="d-flex caption grey--text">Skills</div>
        <div class="my-2">
          <v-chip
            small
            dark
            class="mr-2 mt-2"
            v-for="(skill, key) in this.empObject.skills"
            :key="'A' + key"
            >{{ skill }}</v-chip
          >
        </div>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <div class="d-flex caption grey--text">Is Allocated</div>
        <div class="my-2">
          <v-chip dark label small class="mt-2">
            {{ this.empObject.is_allocated }}
          </v-chip>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6" sm="12">
        <div class="d-flex caption grey--text">Current Projects</div>
      </v-col>
      <v-col cols="12" md="6" sm="12">
        <div class="d-flex caption grey--text">Allocation</div>
      </v-col>
    </v-row>

    <v-row
      v-for="(project, key) in this.empObject.current_projects"
      :key="'B' + key"
    >
      <v-col cols="12" sm="12" md="6">
        <v-data>{{ project.project }}</v-data>
      </v-col>
      <v-col cols="12" md="6" sm="12">
        <v-chip
          class="mr-2"
          v-for="(hour, key) in project.allocation"
          :key="'C' + key"
          >{{ hour }}</v-chip
        >
      </v-col>
    </v-row>
    <v-divider></v-divider>

    <v-row>
      <v-col cols="12" md="6" sm="12">
        <div class="d-flex caption grey--text">Past Projects</div>
      </v-col>
      <v-col cols="12" md="6" sm="12">
        <div class="d-flex caption grey--text">Worked Hours</div>
      </v-col>
    </v-row>

    <v-row
      v-for="(project, key) in this.empObject.past_projects"
      :key="'D' + key"
    >
      <v-col cols="12" sm="12" md="6">
        <v-data>{{ project.project }}</v-data>
      </v-col>
      <v-col cols="12" md="6" sm="12">
        <v-chip class="mr-2">{{ project.worked_hours }}</v-chip>
      </v-col>
    </v-row>

    <!-- <allocation-table :team="project.team"></allocation-table> -->
  </v-container>
</template>
<script>
export default {
  name: "expandRowDetails",
  props: {
    empObject: {
      type: Object,
      required: true
    }
  }
};
</script>
<style scoped></style>
