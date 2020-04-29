<template>
  <v-dialog max-width="850px" v-model="dialog" persistent>
    <template v-slot:activator="{ on }">
      <v-btn icon slot="activator" v-on="on">
        <v-icon>input</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <v-icon left>people</v-icon>Team - {{ appProject.name }}
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
            <v-col cols="12" sm="12" md="12">
              <component
                :is="current_component"
                :projectKey="appProject.key"
                @close="dialog = $event"
                @refresh="$emit('refresh')"
              ></component>
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
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import ProjectAllocationTable from "../ProjectAllocationTable";
import SerachEmployee from "../SearchEmployee";

export default {
  props: { projectKey: String },

  components: {
    "project-allocation-table": ProjectAllocationTable,
    "search-employee": SerachEmployee
  },

  data() {
    return {
      dialog: false,
      team_type: 0,
      current_component: "search-employee",
      automatic_hours: true,
      use_weekends: false
    };
  },

  computed: {
    appProject() {
      return this.$store.getters.getProjectByKey(this.projectKey)
    }
  },

  watch: {
    team_type() {
      if (this.team_type === 0) {
        this.current_component = "search-employee";
      } else if (this.team_type === 1) {
        this.current_component = "project-allocation-table";
      }
    }
  }
};
</script>

<style scoped></style>
