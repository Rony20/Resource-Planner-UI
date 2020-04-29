<template>
  <div class="text-center">
    <v-menu>
      <template v-slot:activator="{ on }">
        <v-chip
          light
          dark
          label
          small
          v-on="on"
          :value="priority"
          :color="getColor(priority)"
          :disabled="disabilityControl"
        >
          {{ priority }}
        </v-chip>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in priorities"
          :key="index"
          @click="changePriority(item)"
        >
          <v-list-item-title>{{ item }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: "RequestPriority",

  props: {
    priority: {
      type: String,
      default: null
    },
    disabilityControl: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      priorities: ["Urgent", "Medium"],
      new_priority: ""
    };
  },

  methods: {
    changePriority(item) {
      this.new_priority = item;
      this.$emit("priorityChanged", this.new_priority);
    },
    getColor(priority) {
      switch (priority) {
        case "Urgent":
          return "red";
        case "Medium":
          return "green";
        case null:
          return "white";
      }
    }
  }
};
</script>

<style></style>
