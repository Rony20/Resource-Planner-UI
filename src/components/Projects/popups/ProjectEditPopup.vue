<template>
  <v-dialog max-width="600px" v-model="dialog" persistent>
    <template v-slot:activator="{ on }">
      <v-btn icon slot="activator" v-on="on">
        <v-icon>edit</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <v-icon left>edit</v-icon>Edit Project
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
          <v-text-field
            label="Project Name"
            prepend-icon="note"
            v-model="project_name"
          ></v-text-field>

          <v-autocomplete
            v-model="project_lead"
            :items="appLeads"
            item-text="value"
            item-value="code"
            label="Project Manager"
            prepend-icon="person"
          ></v-autocomplete>

          <v-row>
            <v-col cols="12" sm="6">
              <v-menu
                v-model="start_date_selector"
                :close-on-content-click="false"
                :nudge-right="60"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="start_date"
                    label="Start Date"
                    prepend-icon="event"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="start_date"
                  @input="start_date_selector = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" sm="6">
              <v-menu
                v-model="end_date_selector"
                :close-on-content-click="false"
                :nudge-right="60"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="end_date"
                    label="End Date"
                    prepend-icon="event"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="end_date"
                  @input="end_date_selector = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" sm="12">
              <div class="caption">
                <v-icon left>list_alt</v-icon>Skillsets Required
              </div>
            </v-col>
            <v-col cols="12" sm="12">
              <v-autocomplete
                v-model="skillsets"
                :items="appSkills"
                item-text="value"
                item-value="code"
                chips
                deletable-chips
                small-chips
                multiple
                clearable
                counter
                label="Skillsets"
                hide-selected
                hide-no-data
                solo
              ></v-autocomplete>
            </v-col>
          </v-row>
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
          :disabled="!isValidate"
          @click="
            dialog = false;
            saveProjectDetails();
            $emit('refresh')
          "
        >
          <v-icon left>save</v-icon>Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["projectKey"],

  data() {
    return {
      dialog: false,
      project_name: null,
      project_lead: null,
      start_date: null,
      start_date_selector: false,
      end_date: null,
      end_date_selector: false,
      skillsets: null,
      skills: null,
      leads: null
    };
  },

  methods: {
    valueAssignment() {
      this.project_name = this.appProject.name;
      this.project_lead = this.appProject.lead;
      this.start_date = this.appProject.start_date;
      this.end_date = this.appProject.end_date;
      this.skillsets = this.appProject.skillsets;
    },

    saveProjectDetails() {
      let edit_object = {
        project_name: this.project_name
          ? this.project_name
          : this.appProject.name,
        assigned_pm: this.project_lead
          ? this.project_lead
          : this.appProject.lead,
        start_date: this.start_date
          ? this.start_date
          : this.appProject.start_date,
        end_date: this.end_date ? this.end_date : this.appProject.end_date,
        skillset: this.skillsets
      };
      this.$editProjectDetailsPmo(this.appProject.key, edit_object)
        .then(response => {
          this.$store.dispatch("UPDATE_PROJECT_PMO", response.data)
          this.valueAssignment();
        })
        .catch(error => console.log(error));
      console.log(edit_object);
    }
  },

  computed: {
    isValidate() {
      return (
        this.appProject.name !== this.project_name ||
        this.appProject.lead !== this.project_lead ||
        this.appProject.start_date !== this.start_date ||
        this.appProject.end_date !== this.end_date ||
        JSON.stringify([...this.appProject.skillsets].sort()) !==
          JSON.stringify([...this.skillsets].sort())
      );
    },

    appProject() {
      return this.$store.getters.getProjectByKey(this.projectKey)
    },

    appLeads() {
      return this.$store.getters.getAllPms;
    },

    appSkills() {
      return this.$store.getters.getAllSkills;
    }
  },

  mounted() {
    this.valueAssignment();
  },

};
</script>

<style scoped></style>
