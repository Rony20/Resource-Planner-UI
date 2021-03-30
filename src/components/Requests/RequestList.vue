<template>
  <div>
    <div class="d-flex flex-row mt-2 ml-2">
      <request-date-picker
        @weekChanged="changeWeek($event)"
        @reload="refresh()"
      ></request-date-picker>
    </div>
    <component
      :ref="ref_value"
      :is="current_component"
      v-bind="currentProperties"
    ></component>
  </div>
</template>

<script>
import RequestDatePicker from "./RequestDatePicker.vue";
import RequestListEditable from "./RequestListEditable.vue";
import RequestListShow from "./RequestListShow.vue";

import { storeDataPropertiesMixin } from "../../Mixins/storeDataProperties.js";

export default {
  name: "RequestsList",

  components: {
    "request-date-picker": RequestDatePicker,
    "request-list-editable": RequestListEditable,
    "request-list-show": RequestListShow
  },

  mixins: [storeDataPropertiesMixin],

  data() {
    return {
      current_component: "request-list-editable",
      ref_value: "editable",
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
        .add(6, "days"),
      current_week_start: this.$moment().startOf("isoWeek"),
      current_week_end: this.$moment()
        .startOf("isoWeek")
        .add(6, "days")
    };
  },

  methods: {
    changeWeek(week) {
      (this.week_start = week[0]), (this.week_end = week[1]);
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
      this.$refs[this.ref_value].reload();
    }
  },

  computed: {
    week() {
      let filters = this.$options.filters;
      return `${filters.formatDate(this.week_start)} - 
      ${filters.formatDate(this.week_end)}`;
    },

    currentProperties() {
      if (this.current_component === "request-list-show") {
        return {
          week_start: this.convertToDate(this.week_start),
          week_end: this.convertToDate(this.week_end)
        };
      } else return null;
    }
  },

  watch: {
    week() {
      if (
        this.convertToDate(this.week_start) !==
          this.convertToDate(this.next_week_start) &&
        this.convertToDate(this.week_end) !==
          this.convertToDate(this.next_week_end)
      ) {
        this.current_component = "request-list-show";
        this.ref_value = "show";
      } else {
        this.current_component = "request-list-editable";
        this.ref_value = "editable";
      }
    }
  },

  created() {
    this.current_component = "request-list-editable";
  }
};
</script>

<style scoped></style>
