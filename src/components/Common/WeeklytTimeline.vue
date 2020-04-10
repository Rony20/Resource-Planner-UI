<template>
  <v-item-group>
    <v-row dense no-gutters align-content="center">
      <v-col align-self="center" v-for="n in 5" :key="n" id="col" cols="12" sm="1" md="1">
        <v-menu>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" depressed>{{ filledHour[n - 1] }}</v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(item, index) in hours" :key="index" @click="setHour(n, item)">
              <v-list-item-title>{{ item }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
      <v-col align-self="center" v-for="n in 2" :key="'A'+n" id="col" cols="12" sm="1" md="1">
        <v-menu>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" depressed :disabled="disableButton">{{ filledHour[n - 1] }}</v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(item, index) in hours" :key="'A'+index" @click="setHour(n, item)">
              <v-list-item-title>{{ item }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
      <v-btn @click="automaticHours=true" depressed>AUTOFILL</v-btn>
    </v-row>
  </v-item-group>
</template>

<script>
export default {
  name: "weeklyTimeline",
  props: {},
  data() {
    return {
      hours: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      filledHour: [0, 0, 0, 0, 0, 0, 0],
      useWeekends: this.$store.state.useWeekends,
      disableButton: true
    };
  },
  created() {
    if (this.automaticHours && this.useWeekends)
      this.filledHour = [8, 8, 8, 8, 8, 8, 8];
    else if (this.automaticHours && !this.useWeekends)
      this.filledHour = [8, 8, 8, 8, 8, 0, 0];
  },
  methods: {
    getColor(val) {
      if (4 <= val <= 8) return "green";
      else if (val == 4) return "orange";
      else if (0 < val < 4) return "blue";
      else return "red";
    },
    setHour(index, hour) {
      this.filledHour[index - 1] = hour;
      this.$emit("hoursChanged", this.filledHour);
    }
  }
};
</script>

<style>
#col {
  max-width: 65px;
}
</style>
