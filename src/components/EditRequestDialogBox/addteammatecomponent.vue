<template>
  <v-card>
    <v-card-text>
      <!-- search bar -->
      <v-row>
        <v-col cols="12" sm="12">
          <v-autocomplete
            v-model="newEmployee"
            label="Search"
            :items="employees"
            single-line
            hide-details
          >
            <template v-slot:selection="data">
              <v-chip
                v-bind="data.attrs"
                :input-value="data.selected"
                close
                @click="data.select"
                @click:close="remove(data.item)"
              >{{ data.item.employee_name }}</v-chip>
            </template>
            <template v-slot:item="data">
              <v-list-item-content>
                <v-row>
                  <v-col>
                    <v-list-item-title v-html="data.item.employee_name"></v-list-item-title>
                  </v-col>
                  <v-col>
                    <v-chip
                      class="mr-2"
                      small
                      v-for="(hour, key) in data.item.availability"
                      :key="key"
                    >{{ hour }}</v-chip>
                  </v-col>
                </v-row>
              </v-list-item-content>
            </template>
          </v-autocomplete>
        </v-col>
      </v-row>
      <!-- team data table -->

      <v-data-table
        :headers="empTableHeaders"
        :items="requestObj.employees"
        show-select
        hide-default-footer
        item-key="name"
      >
        <template v-slot:item.priority="{ item }">
          <div class="mt-2">
            <priority-component
              :priority="item.priority"
              @priorityChanged="item.priority = $event"
            />
          </div>
        </template>
        <template v-slot:item.demandedHours="{ item }">
          <v-chip class="mr-2" small v-for="(hour, key) in item.demandedHours" :key="key">{{ hour }}</v-chip>
        </template>
      </v-data-table>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1">Cancel</v-btn>
      <v-btn color="blue darken-1" @click="save()">Save</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import priorityComponent from "../PriorityComponent/prioritycomponent.vue";
export default {
  name: "addTeammateComponent",
  components: {
    priorityComponent
  },
  data() {
    return {
      search: "",
      employees: this.$store.state.employees,
      newEmployee: {
        employee_name: "",
        priority: "",
        demandedHours: [8, 8, 8, 8, 8]
      },
      empTableHeaders: [
        {
          text: "Name",
          value: "name",
          align: "center"
        },
        {
          text: "Priority",
          value: "priority",
          align: "center",
          width: "250px"
        },
        {
          text: "Demanded Hours",
          value: "demandedHours",
          align: "center",
          sortable: false
        }
      ]
    };
  },
  props: {
    requestObj: {
      type: Object,
      required: true
    }
  },
  methods: {
    save() {},
    remove(item) {
      const index = this.friends.indexOf(item.name);
      if (index >= 0) this.friends.splice(index, 1);
    }
  }
};
</script>

<style></style>
