<template>
  <div>
    <v-simple-table fixed-header class="elevation-2" dense>
      <template v-slot:default>
        <tbody>
          <tr v-if="showDays">
            <td
              class="text-center"
              v-for="n in 7"
              :key="n + Math.random() * Date.now()"
            >
              <div class="caption font-weight-bold">{{ days[n - 1] }}</div>
            </td>
          </tr>
          <tr>
            <td
              class="text-center"
              v-for="m in hoursArray"
              :key="m + Math.random() * Date.now()"
            >
              <v-btn depressed x-small dark class="my-1">
                {{ m }}
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
export default {
  props: {
    hoursArray: Array,
    showDays: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      days: ["MO", "TU", "WE", "TH", "FR", "SA", "SU"]
    };
  },

  methods: {
    getHourColor(value) {
      if (value === 8) return "success";
      else if (value === 0) return "error";
      else return "warning";
    }
  }
};
</script>

<style scoped></style>
