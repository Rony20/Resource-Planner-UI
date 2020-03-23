<template>
  <v-card id="tablecard">
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
      item-key="name"
      show-expand
    >
      <template v-slot:top>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.name"
                      readonly
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-autocomplete
                      v-model="editedItem.currentAllocation"
                      :items="projects"
                      clearable
                      outlined
                    ></v-autocomplete>
                  </v-col>
                </v-row>
              </v-container>
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
        <v-icon small class="mr-2" @click.stop="editItem(item)"
          >assignment</v-icon
        >
      </template>
      <v-switch
        v-model="singleExpand"
        label="Single expand"
        class="mt-2"
      ></v-switch>

      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <v-card>
            <v-card-text
              v-for="(value, key, index) in item"
              :key="index"
              class="font-weight-medium subtitle-2 text-capitalize text-left"
              >{{ key }}: {{ value }}</v-card-text
            >
          </v-card>
        </td>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  name: "listitems",
  data() {
    return {
      search: "",
      singleExpand: true,
      dialog: false,
      expanded: [],
      model: "",
      projects: this.$store.state.projects,
      headers: [
        {
          text: "Id",
          align: "center",
          value: "id"
        },
        {
          text: "Name",
          align: "center",
          value: "name"
        },
        {
          text: "Designation",
          align: "center",
          value: "desgn"
        },
        {
          text: "Allocated",
          align: "center",
          value: "isAllocated"
        },
        {
          text: "Skills",
          align: "center",
          value: "skills"
        },
        {
          text: "Current Allocation",
          align: "center",
          value: "currentAllocation"
        },
        {
          text: "Availability",
          align: "center",
          value: "availability"
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
      editedItem: {
        name: "",
        currentAllocation: ""
      },
      defaultItem: {
        name: "",
        currentAllocation: ""
      }
    };
  },
  components: {},
  created() {
    this.$getAllEmployeesData()
      .then(response => {
        let x = response.data;
        this.$store.state.employees = x["all_employees"];
        this.$store.state.employees.forEach(emp => {
          let empObj = {
            id: emp["employee_id"],
            name: emp["employee_name"],
            desgn: emp["designation"],
            isAllocated: emp["is_allocated"] ? "Yes" : "No",
            skills: emp["skills"],
            currentAllocation: emp["current_projects"][0]["project"],
            availability: emp["availability"]
          };
          this.employees.push(empObj);
        });
      })
      .then(() => {
        this.color = "green";
        this.message = "Employees Data Successfully fetched !!!";
        this.snackbar = true;
      });
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Assign to Project Team";
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
        Object.assign(this.employees[this.editedIndex], this.editedItem);

        var respObj = await this.$updateEmployee(this.editedItem.id, {
          current_projects: [
            {
              project: this.editedItem.currentAllocation,
              allocation: [8, 8, 8, 8, 8]
            }
          ]
        });

        if (respObj.data["modified_documents"] > 0) {
          this.$store.state.snackbar.text = "updation successful !!!";
          this.$store.state.snackbar.color = "green";
        } else {
          this.$store.state.snackbar.text = "updation failed !!!";
          this.$store.state.snackbar.color = "red";
        }

        this.$store.state.snackbar.show = true;
      }

      this.close();
    }
  }
};
</script>

<style scoped>
#tablecard {
  margin: 10px;
}
</style>
