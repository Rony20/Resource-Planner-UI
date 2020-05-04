<template>
  <div>
    <div v-if="false" class="d-flex flex-row justify-end">
      <v-btn
        depressed
        x-small
        class="ma-2 success"
        @click="saveHours()"
        :disabled="disabilityControl"
      >
        <v-icon small>save</v-icon>
      </v-btn>
      <v-btn
        depressed
        x-small
        class="ma-2 info"
        :disabled="!disabilityControl"
        @click="disabilityControl = !disabilityControl"
      >
        <v-icon small>edit</v-icon>
      </v-btn>
      <v-btn
        depressed
        x-small
        class="ma-2 error"
        @click="clearHours()"
        :disabled="disabilityControl"
      >
        <v-icon small>clear</v-icon>
      </v-btn>
    </div>
    <v-simple-table dense class="elevation-2 mt-2">
      <tbody>
        <tr v-if="false">
          <td
            v-for="day in range"
            :key="day"
            class="text-center caption font-weight-bold"
          >
            {{ days[day - 1] }}
          </td>
        </tr>
        <tr>
          <td v-for="n in range" :key="n" class="text-center">
            <v-menu offset-y top>
              <template v-slot:activator="{ on }">
                <v-btn
                  x-small
                  depressed
                  v-on="on"
                  class="my-1 white--text"
                  color="black"
                  :disabled="disabilityControl"
                >
                  {{ filledHour[n - 1] }}
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(item, index) in hours"
                  :key="'B' + index"
                  @click="setHour(n - 1, item)"
                >
                  <v-list-item-title>{{ item }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
    <div v-if="false" class="d-flex flex-row justify-space-around">
      <v-checkbox
        dense
        v-model="autofill"
        label="Autofill"
        :disabled="disabilityControl"
      ></v-checkbox>
      <v-checkbox dense v-model="weekend" label="Weekends"></v-checkbox>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    hoursArray: {
      type: Array,
      default: () => {
        return [0, 0, 0, 0, 0, 0, 0];
      }
    },
    autofill: {
      type: Boolean,
      default: false
    },
    weekend: {
      type: Boolean,
      default: false
    },
    disabilityControl: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      hours: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      filledHour: [],
      days: ["MO", "TU", "WE", "TH", "FR", "SA", "SU"],
      clear: false,
      range: 5
    };
  },

  methods: {
    getClass(val) {
      if (val === 8) return "success";
      if (val === 0) return "error";
      if (val > 0 && val < 8) return "warning";
    },

    setHour(index, hour) {
      this.filledHour[index] = hour;
      this.$emit("filledHours", this.filledHour);
    },

    saveHours() {
      this.$emit("filledHours", this.filledHour);
      this.disabilityControl = true;
    },

    clearHours() {
      this.filledHour = [0, 0, 0, 0, 0, 0, 0];
      this.autofill = false;
    },

    resetValues() {
      this.filledHour = [0, 0, 0, 0, 0, 0, 0];
      this.autofill = false;
      this.weekend = false;
      this.clear = false;
      this.range = 5;
      this.disabilityControl = false;
    }
  },

  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    combined() {
      if (this.autofill && this.weekend) return 0;
      else if (this.autofill && !this.weekend) return 1;
      else return 2;
    }
  },

  watch: {
    weekend() {
      if (this.weekend === true) this.range = 7;
      if (this.weekend === false) this.range = 5;
    },

    combined() {
      if (this.combined === 0) this.filledHour = [8, 8, 8, 8, 8, 8, 8];
      else if (this.combined === 1) this.filledHour = [8, 8, 8, 8, 8, 0, 0];
      else this.filledHour = [8, 8, 8, 8, 8, 0, 0];
      this.$emit("filledHours", this.filledHour);
    },

    disabilityControl() {
      this.$emit("filledHours", this.filledHour);
    }
  },

  mounted() {
    this.filledHour = this.hoursArray;
  }
};
</script>
