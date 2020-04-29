<template>
  <v-btn-toggle>
    <v-btn small @click="previousWeek()">
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
    <v-btn small>
      <div class="caption font-weight-bold">
        {{ week }}
      </div>
    </v-btn>
    <v-btn small @click="nextWeek()">
      <v-icon>mdi-chevron-right</v-icon>
    </v-btn>
    <v-btn small @click="currentWeek()">
      <v-icon small>today</v-icon>
    </v-btn>
    <v-btn small @click="refresh()">
      <v-icon small>refresh</v-icon>
    </v-btn>
  </v-btn-toggle>
</template>

<script>
export default {
  data() {
    return {
      week_start: this.$moment()
        .startOf("isoWeek")
        .add(1, "week"),
      week_end: this.$moment()
        .startOf("isoWeek")
        .add(1, "week")
        .add(6, "days")
    };
  },

  methods: {
    previousWeek() {
      this.week_start = this.$moment(this.week_start.subtract(1, "week"));
      this.week_end = this.$moment(this.week_end.subtract(1, "week"));
    },

    nextWeek() {
      this.week_start = this.$moment(this.week_start.add(1, "week"));
      this.week_end = this.$moment(this.week_end.add(1, "week"));
    },

    currentWeek() {
      this.week_start = this.$moment()
        .startOf("isoWeek")
        .add(1, "week");
      this.week_end = this.$moment()
        .startOf("isoWeek")
        .add(1, "week")
        .add(6, "days");
    },

    refresh() {
      this.loadRequests(
        this.convertToDate(this.week_start),
        this.convertToDate(this.week_end)
      );
    }
  },

  computed: {
    week() {
      let filters = this.$options.filters;
      return `${filters.formatDate(this.week_start)} - 
      ${filters.formatDate(this.week_end)}`;
    }
  },

  watch: {
    week() {
      this.$emit("weekChanged", [this.week_start, this.week_end]);
    }
  },

  created() {
    // this.$emit("weekChanged", [this.week_start, this.week_end]);
  }
};
</script>

<style scoped></style>
