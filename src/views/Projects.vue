<template>
  <div id="app">
    <v-app id="inspire">
      <v-card color="grey lighten-4" flat height="50px" tile>
        <v-toolbar dense>
          <v-toolbar-title>
            <v-icon color="black" left>note</v-icon>Projects
          </v-toolbar-title>

          <v-spacer></v-spacer>

          <v-card-actions>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-select
                  v-model="projects_type"
                  :items="items"
                  dense
                  solo
                  outlined
                  single-line
                  flat
                  class="mt-6"
                ></v-select>
              </v-col>
            </v-row>

            <v-btn
              class="ma-2"
              color="info"
              :loading="jira_loader"
              @click="syncWithJira"
            >
              <v-icon left>autorenew</v-icon>Sync Jira
            </v-btn>
          </v-card-actions>
        </v-toolbar>
      </v-card>

      <project-list ref="syncload" :projectType="projects_type"></project-list>
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
            this.$refs.syncload.loadProjects();
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

<style scoped></style>
