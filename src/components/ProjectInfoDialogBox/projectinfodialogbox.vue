<template>
  <v-dialog max-width="500px">
    <template v-slot:activator="{ on }">
      <v-icon v-on="on">info</v-icon>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Project Info</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field readonly></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-autocomplete></v-autocomplete>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1">Cancel</v-btn>
        <v-btn color="blue darken-1">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "projectInfoDialogBox"
};
</script>

<style></style>
