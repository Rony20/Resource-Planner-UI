<template>
  <v-dialog max-width="1000px">
    <template v-slot:activator="{ on }">
      <v-icon slot="activator" v-on="on">person_add</v-icon>
    </template>
    <v-card>
      <!-- fomr title -->
      <v-card-title>
        <span class="headline">Add New Teammate</span>
      </v-card-title>
      <v-divider></v-divider>
      <!-- toggle button for find and get suggestions -->
      <v-card-actions>
        <v-card-text>
          <v-row>
            <v-btn-toggle mandatory>
              <v-btn @click="currentTabComponent = 'addTeammateComponent'">Find</v-btn>
              <v-btn @click="currentTabComponent = 'mlSuggestionsComponent'">Get Suggestions</v-btn>
            </v-btn-toggle>
          </v-row>
          <br />
          <keep-alive>
            <component
              :is="currentTabComponent"
              :requestObj="requestObj"
              @empAdded="requestObj = $event"
            ></component>
          </keep-alive>
        </v-card-text>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import addTeammateComponent from "./addteammatecomponent.vue";
import mlSuggestionsComponent from "./mlsuggestionscomponent.vue";
export default {
  name: "editRequestDialog",
  components: {
    addTeammateComponent,
    mlSuggestionsComponent
  },
  data() {
    return {
      toggle_exclusive: undefined,
      currentTabComponent: "addTeammateComponent"
    };
  },
  computed: {},
  props: {
    requestObj: {
      type: Object,
      required: true
    }
  },
  method: {}
};
</script>

<style></style>
