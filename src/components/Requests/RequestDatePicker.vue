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
    <v-btn small :disabled="next_button_control" @click="nextWeek()">
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
      next_button_control: false,
      week_start: this.$moment()
        .startOf("isoWeek")
        .add(1, "week"),
      week_end: this.$moment()
        .startOf("isoWeek")
        .add(1, "week")
        .add(6, "days"),
      next_week_start: this.$moment()
        .startOf("isoWeek")
        .add(1, "week"),
      next_week_end: this.$moment()
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

    convertToDate(date) {
      return date.format("DD-MM-YYYY");
    },

    convertToWeek(start, end) {
      return [this.convertToDate(start), this.convertToDate(end)];
    },

    refresh() {
      this.$emit("reload");
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
      if (
        this.convertToDate(this.week_start) ===
        this.convertToDate(this.next_week_start)
      ) {
        this.next_button_control = true;
      } else this.next_button_control = false;
    }
  },

  created() {
    this.next_button_control = true;
  }
};
</script>

<style scoped></style>
