<template>
  <v-dialog max-width="600px" v-model="dialog" persistent>
    <template v-slot:activator="{ on }">
      <v-btn icon slot="activator" v-on="on">
        <v-icon>info</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <v-icon left>info</v-icon>Project Info
        <v-spacer></v-spacer>
        <v-btn icon @click="dialog = false">
          <v-icon>close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="mt-3">
        <project-expand-detail :projectKey="projectKey"></project-expand-detail>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn small color="error" class="ma-2" raised @click="dialog = false">
          <v-icon left>close</v-icon>Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import ProjectExpandDetail from "../Projects/ProjectExpandDetail.vue";

export default {
  props: { projectKey: String },

  components: {
    "project-expand-detail": ProjectExpandDetail
  },

  data() {
    return {
      dialog: false
    };
  }
};
</script>

<style scoped></style>
