<template>
  <v-card id="employee-card">
    <v-card-title>
      <v-row>
        <v-col cols="12" sm="8"></v-col>
        <v-col cols="12" sm="4">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
            id="searchbar"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :search="search"
      :items="employees"
      :single-expand="singleExpand"
      :items-per-page="10"
      :expanded.sync="expanded"
      item-key="employee_name"
      show-expand
    >
      <!-- dialog box -->
      <template v-slot:top>
        <v-dialog v-model="dialog" max-width="700px">
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-form ref="form">
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.employee_name" readonly></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-autocomplete
                      v-model="new_project.project"
                      :items="projects"
                      item-text="name"
                      item-value="key"
                      clearable
                      outlined
                      auto-select-first
                    ></v-autocomplete>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <weekly-Timeline-Component
                      :hours="new_project.allocation"
                      @hoursChanged="new_project.allocation = $event"
                    />
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click.stop="editItem(item)">assignment</v-icon>
      </template>
      <template v-slot:item.availability="{ item }">
        <v-chip small class="mr-2" v-for="(hour, key) in item.availability" :key="key">{{ hour }}</v-chip>
      </template>
      <v-switch v-model="singleExpand" label="Single expand" class="mt-2"></v-switch>

      <template v-slot:expanded-item="{ item }">
        <td :colspan="headers.length">
          <expand-row-details :empObject="item" />
        </td>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import expandRowDetails from "../ExpandRowDetails/expandrowdetails.vue";
import weeklyTimelineComponent from "../WeeklyTimelineComponent/weeklytimelinecomponent";
export default {
  name: "listitems",
  components: {
    expandRowDetails,
    weeklyTimelineComponent
  },
  data() {
    return {
      search: "",
      singleExpand: true,
      dialog: false,
      expanded: [],
      model: "",
      headers: [
        {
          text: "Id",
          align: "center",
          value: "employee_id"
        },
        {
          text: "Name",
          align: "center",
          value: "employee_name"
        },
        {
          text: "Designation",
          align: "center",
          value: "designation"
        },
        {
          text: "Actions",
          value: "actions",
          align: "center",
          sortable: false
        }
      ],
      employees: [],
      actions: {
        edit: "edit",
        remove: "remove_circle_outline"
      },
      editedIndex: -1,
      editedItem: {},
      new_project: {
        project: "",
        allocation: [0, 0, 0, 0, 0]
      }
    };
  },
  created() {
    this.$getAllEmployeesData()
      .then(response => {
        let x = response.data;
        this.$store.state.employees = x["all_employees"];
        this.$store.state.employees.forEach(emp => {
          let empObj = {
            employee_id: emp["employee_id"],
            employee_name: emp["employee_name"],
            designation: emp["designation"],
            is_allocated: emp["is_allocated"] ? "Yes" : "No",
            skills: emp["skills"],
            current_projects: emp["current_projects"],
            past_projects: emp["past_projects"],
            availability: emp["availability"]
          };
          this.employees.push(empObj);
        });
      })
      .then(() => {
        this.color = "green";
        this.message = "Employees Data Successfully fetched !!!";
        this.snackbar = true;
      })
      .catch(err => {
        this.color = "red";
        this.message = err;
        this.snackbar = true;
      });
      console.log(this.projects)
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Assign to Project Team";
    },

    projects(){
      return this.$store.getters.getProjectKeyList
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.employees.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    async save() {
      if (this.editedIndex > -1) {
        await this.$updateEmployee(this.editedItem.employee_id, {
          current_projects: this.new_project
        })
          .then(respObj => {
            if (respObj.data["modified_documents"]) {
              let updatedEmp = respObj.data["modified_documents"];
              console.log(updatedEmp)
              Object.assign(this.employees[this.editedIndex], updatedEmp);
              this.$store.state.snackbar.text = "updation successful !!!";
              this.$store.state.snackbar.color = "green";
            } else {
              this.$store.state.snackbar.text = "updation failed !!!";
              this.$store.state.snackbar.color = "red";
            }
          })
          .catch(err => {
            this.$store.state.snackbar.text = err;
            this.$store.state.snackbar.color = "red";
          })
          .finally(() => {
            this.$store.state.snackbar.show = true;
          });
      }

      this.close();
    }
  }
};
</script>

<style scoped>
#employee-card {
  margin: 30px 100px;
}
</style>
