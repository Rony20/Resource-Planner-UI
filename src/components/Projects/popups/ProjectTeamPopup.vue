<template>
  <v-dialog max-width="900px" v-model="dialog" persistent>
    <template v-slot:activator="{ on }">
      <v-btn icon slot="activator" v-on="on">
        <v-icon>input</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <v-icon left>people</v-icon>Team
        <v-spacer></v-spacer>
        <v-btn icon @click="dialog = false">
          <v-icon>close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="mt-3">
        <v-container fluid>
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <v-btn-toggle v-model="team_type" mandatory>
                <v-btn text small>Current Team</v-btn>
                <v-btn text small>Get Suggestions</v-btn>
              </v-btn-toggle>
            </v-col>
            <v-col cols="12" sm="12">
              <component
                :is="current_component"
                v-bind="current_properties"
              ></component>
            </v-col>
            <v-col cols="12" sm="12" v-if="false">
              <project-allocation-table
                :team="project.team"
              ></project-allocation-table>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" class="ma-2" raised @click="dialog = false">
          <v-icon left>cancel</v-icon>Cancel
        </v-btn>
        <v-btn color="primary" class="ma-2" raised @click="dialog = false">
          <v-icon left>save</v-icon>Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import ProjectAllocationTable from "../ProjectAllocationTable";
import SerachEmployee from "../SearchEmployee";

export default {
  props: ["project"],

  components: {
    "project-allocation-table": ProjectAllocationTable,
    "search-employee": SerachEmployee
  },

  data() {
    return {
      dialog: false,
      team_type: 0,
      current_component: "search-employee",
      current_properties: {
        projectDetail: {
          key: this.project.key,
          name: this.project.name,
          team: this.project.team
        }
      },
      automatic_hours: true,
      use_weekends: false
    };
  },

  watch: {
    team_type() {
      if (this.team_type === 0) {
        this.current_component = "search-employee";
        this.current_properties = {
          projectDetail: {
            key: this.project.key,
            name: this.project.name,
            team: this.project.team
          }
        };
      } else if (this.team_type === 1) {
        this.current_component = "project-allocation-table";
        this.current_properties = { team: this.project.team };
      }
    }
  }
};
</script>

<style scoped></style>
