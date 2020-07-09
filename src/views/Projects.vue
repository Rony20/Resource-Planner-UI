<template>
  <div id="app">
    <v-app id="inspire">
      <v-card color="grey lighten-4" flat height="50px" tile>
        <v-toolbar dense dark flat color="grey darken-1">
          <v-toolbar-title>
            <v-icon left>note</v-icon>Projects
          </v-toolbar-title>

          <v-spacer></v-spacer>
          <div id="my-select" class="d-flex flex-row mt-7">
            <v-select
              v-model="projects_type"
              :items="items"
              dense
              solo
              outlined
              single-line
              flat
            ></v-select>

            <v-btn
              class="ml-2"
              color="info"
              :loading="jira_loader"
              @click="syncWithJira"
            >
              <v-icon left>autorenew</v-icon>Sync Jira
            </v-btn>
          </div>
        </v-toolbar>
      </v-card>

      <project-list
        ref="syncloadjira"
        :projectType="projects_type"
      ></project-list>
    </v-app>
  </div>
</template>

<script>
import ProjectList from "../components/Projects/ProjectList";

export default {
  name: "Projects",

  components: {
    "project-list": ProjectList
  },

  data() {
    return {
      jira_loader: false,
      projects_type: "All",
      items: ["All", "Ongoing", "Archived"]
    };
  },

  methods: {
    syncWithJira() {
      this.jira_loader = true;
      this.$syncJira()
        .then(response => {
          if (response.data === "success") {
            this.$notify({
              title: "Information",
              text: "Projects are synced with JIRA!",
              type: "info"
            });
            this.$refs.syncloadjira.loadProjects();
          }
        })
        .catch(error => {
          this.$notify({
            title: "Error",
            text: "Error in sync with JIRA!",
            type: "error"
          });
          console.error(error);
        })
        .finally(() => {
          this.jira_loader = false;
        });
    }
  }
};
</script>

<style scoped>
#my-select {
  width: 300px;
}
</style>
