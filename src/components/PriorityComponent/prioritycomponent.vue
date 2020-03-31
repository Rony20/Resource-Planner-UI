<template>
  <div class="text-center">
    <v-menu>
      <template v-slot:activator="{ on }">
        <v-chip
          light
          dark
          v-on="on"
          text-color="black"
          :value="priority"
          :color="getcolor(priority)"
        >
          {{ priority }}
        </v-chip>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in priorities"
          :key="index"
          @click="change_priority(item)"
        >
          <v-list-item-title>{{ item }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: "priorityComponent",
  data() {
    return {
      priorities: ["Urgent", "Medium", "Low"],
      new_priority: ""
    };
  },
  props: {
    priority: {
      type: String,
      default: null
    }
  },
  methods: {
    change_priority(item) {
      this.new_priority = item;
      this.$emit("priorityChanged", this.new_priority);
    },
    getcolor(priority) {
      switch (priority) {
        case "Urgent":
          return "red";
        case "Medium":
          return "green";
        case "Low":
          return "yellow";
        case null:
          return "white";
      }
    }
  }
};
</script>

<style></style>
