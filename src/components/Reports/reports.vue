<template>
  <v-app>
    <v-content>
      This is Reports Page
      <weekly-timeline-component />
    </v-content>
  </v-app>
</template>

<script>
import weeklyTimelineComponent from "../Common/WeeklytTimeline";
export default {
  name: "Reports",
  components: {
    weeklyTimelineComponent
  }
};
</script>

<style></style>
