<template>
  <div>
    <v-autocomplete
      v-model="selected_employee"
      :items="filteredEmployee"
      chips
      label="Select Employee"
      item-text="name"
      item-value="id"
      multiple
      hide-selected
      deletable-chips
      hide-no-data
    >
      <template v-slot:selection="data">
        <v-chip
          v-bind="data.attrs"
          :input-value="data.selected"
          close
          @click="data.select"
          @click:close="remove(data.item.id)"
        >
          <v-avatar left>
            <v-img src="@/assets/avatar.png"></v-img>
          </v-avatar>
          {{ data.item.name }}
        </v-chip>
      </template>
      <template v-slot:item="data">
        <v-list-item-avatar>
          <v-img src="@/assets/avatar.png"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>
            <v-row>
              <v-col md="4" cols="10">{{ data.item.name }}</v-col>
              <v-col md="6" cols="10">
                <v-chip
                  small
                  label
                  dark
                  color="primary"
                  class="mx-1"
                  v-for="skill in data.item.skills"
                  :key="skill"
                  >{{ skill }}</v-chip
                >
              </v-col>
            </v-row>
          </v-list-item-title>
          <v-list-item-subtitle v-if="false">
            <v-chip
              small
              label
              dark
              color="green"
              class="mx-1"
              v-for="hour in data.item.availability"
              :key="hour"
              >{{ hour }}</v-chip
            >
          </v-list-item-subtitle>
        </v-list-item-content>
      </template>
    </v-autocomplete>
    <v-btn
      dark
      icon
      large
      :disabled="show_added"
      class="primary"
      @click="addEmployee()"
    >
      <v-icon>add_circle</v-icon>
    </v-btn>

    <v-card class="mt-6" v-if="show_card">
      <v-card-title>
        {{ projectDetail.name }}
        <v-spacer></v-spacer>
        <v-btn icon @click="clearAddedEmployee">
          <v-icon>clear</v-icon>
        </v-btn>
      </v-card-title>
      <v-list>
        <v-list-item v-for="emp in added_employee" :key="emp.id">
          <v-chip label close @click:close="removeFromAddedEmployee(emp.id)">
            <v-avatar left>
              <v-img src="@/assets/avatar.png"></v-img>
            </v-avatar>
            {{ emp.name }}
          </v-chip>
        </v-list-item>
      </v-list>
    </v-card>
    <v-btn dark class="primary mt-4" v-if="show_card" @click="createTeam"
      >Create Team</v-btn
    >

    <v-card class="mt-4">
      <v-card-title>Current Team</v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item
            v-for="employee in projectDetail.team"
            :key="employee.id"
          >
            <v-chip label>
              <v-avatar left>
                <v-img src="@/assets/avatar.png"></v-img>
              </v-avatar>
              {{ employee.id | mapEmployees(appEmployees) }}
            </v-chip>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["projectDetail"],

  data() {
    return {
      selected_employee: [],
      added_employee: [],
      show_card: false,
      show_added: true
    };
  },

  methods: {
    remove(item) {
      const index = this.selected_employee.indexOf(item);
      if (index >= 0) {
        this.selected_employee.splice(index, 1);
      }
    },

    removeFromAddedEmployee(id) {
      console.log(id);
      const index = this.added_employee.findIndex(emp => emp.id === id);
      if (index >= 0) {
        this.added_employee.splice(index, 1);
      }
    },

    addEmployee() {
      for (let emp_id of this.selected_employee) {
        this.added_employee.push(
          this.appEmployees.find(emp => emp.id === emp_id)
        );
      }
      this.selected_employee = [];
    },

    createTeam() {
      let team_list = [];
      this.added_employee.forEach(emp => {
        team_list.push(emp.id);
      });
      console.log(team_list);
      this.added_employee = [];

      this.$createUpdateTeam(this.projectDetail.key, {
        allocated_employees: team_list
      })
        .then(response => {
          this.$store.dispatch("CREATE_UPDATE_TEAM", response.data)
        })
        .catch(error => console.log(error));
    },

    clearAddedEmployee() {
      this.added_employee = [];
    }
  },

  computed: {
    appEmployees() {
      return this.$store.getters.getEmployees;
    },

    filteredEmployee() {
      return this.appEmployees.filter(
        ({ id: id1 }) => !this.added_employee.some(({ id: id2 }) => id2 === id1)
      );
    }
  },

  watch: {
    added_employee() {
      if (this.added_employee.length > 0) this.show_card = true;
      else this.show_card = false;
    },

    selected_employee() {
      if (this.selected_employee.length > 0) this.show_added = false;
      else this.show_added = true;
    }
  }
};
</script>

<style scoped></style>
