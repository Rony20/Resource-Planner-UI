<template>
  <v-app>
    <v-content
      >This is Reports Page
      <weekly-timeline-component />
    </v-content>

    <!-- <weekly-calendar-component v-show="false"/> -->
  </v-app>
</template>

<script>
// import weeklyCalendarComponent from "../WeeklyCalendarComponent/weeklycalendarcomponent.vue";
import weeklyTimelineComponent from "../WeeklyTimelineComponent/weeklytimelinecomponent.vue";
export default {
  name: "Reports",
  components: {
    // weeklyCalendarComponent,
    weeklyTimelineComponent
  }
};
</script>

<style></style>
