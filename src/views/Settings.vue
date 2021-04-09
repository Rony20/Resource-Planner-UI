<template>
  <div id="app">
    <v-app id="inspire">
      <v-card color="grey lighten-4" flat height="50px" tile>
        <v-toolbar dense dark flat color="grey darken-1">
          <v-toolbar-title>
            <v-icon left>settings</v-icon>Settings
          </v-toolbar-title>
        </v-toolbar>
      </v-card>

      <v-card class="settings-card" min-width="400px">
        <v-tabs vertical>
          <v-tab>
            <v-icon left>mdi-sync</v-icon>
            Sync Options
          </v-tab>
          <v-tab>
            <v-icon left>mdi-lock</v-icon>
            Other Options
          </v-tab>

          <v-tab-item>
            <v-container>
              <v-row justify="center">
                <v-col
                  v-for="(item, index) in settingsSyncList"
                  :key="index"
                  cols="12"
                  md="10"
                  sm="12"
                >
                  <v-card
                    :loading="item.loading"
                    min-width="350px"
                    elevation="3"
                  >
                    <v-card-text>
                      <v-row>
                        <v-col md="7">
                          <p class="mx-4 font-weight-bold">
                            {{ index + 1 }}. {{ item.text }}
                          </p>
                        </v-col>
                        <v-divider class="mx-4" vertical></v-divider>
                        <v-col md="4">
                          <v-btn
                            outlined
                            class="mx-4"
                            @click="settingsAction(item.action)"
                          >
                            {{ item.button }}
                          </v-btn>
                        </v-col>
                      </v-row>
                      <v-card-subtitle>
                        {{ item.subtitle }}
                      </v-card-subtitle>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-tab-item>
          <v-tab-item>
            <v-container>
              <v-row align="center" justify="center">
                Other settings
              </v-row>
            </v-container>
          </v-tab-item>
        </v-tabs>
      </v-card>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "Settings",
  components: {},
  data() {
    return {
      settingsSyncList: [
        {
          text: "Sync all the projects with JIRA",
          button: "Sync JIRA",
          action: "syncWithJira",
          subtitle: "Updates team planner database with changes in Jira.",
          loading: false
        },
        {
          text: "Sync all the employees with HRMS",
          button: "Sync HRMS",
          action: "syncWithHRMS",
          subtitle: "Updates team planner database with changes in HRMS.",
          loading: false
        }
      ]
    };
  },
  methods: {
    settingsAction(action) {
      switch (action) {
        case "syncWithJira":
          this.settingsSyncList[0].loading = true;
          this.$syncJira()
            .then(response => {
              if (response.data === "success") {
                this.$notify({
                  title: "Information",
                  text: "Projects are synced with JIRA!",
                  type: "info"
                });
              }
            })
            .catch(error => {
              this.$notify({
                title: "Error",
                text: "Error in sync with JIRA!",
                type: "error"
              });
              console.error(error);
            })
            .finally(() => {
              this.settingsSyncList[0].loading = false;
            });
          break;

        case "syncWithHRMS":
          this.settingsSyncList[1].loading = true;
          this.$syncHRMS()
            .then(response => {
              if (response.data === "success") {
                this.$notify({
                  title: "Information",
                  text: "Employees are synced with HRMS!",
                  type: "info"
                });
              }
            })
            .catch(error => {
              this.$notify({
                title: "Error",
                text: "Error in sync with HRMS!",
                type: "error"
              });
              console.error(error);
            })
            .finally(() => {
              this.settingsSyncList[1].loading = false;
            });
          break;
      }
    }
  }
};
</script>

<style scoped>
.settings-card {
  margin: 30px 100px;
}
</style>
