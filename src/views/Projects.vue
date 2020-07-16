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
          </div>
        </v-toolbar>
      </v-card>

      <project-list :projectType="projects_type"></project-list>
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
      projects_type: "All",
      items: ["All", "Ongoing", "Archived"]
    };
  }
};
</script>

<style scoped>
#my-select {
  width: 200px;
}
</style>
