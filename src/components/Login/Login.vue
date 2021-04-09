<template>
  <v-app id="inspire">
    <v-container fluid v-if="showPage">
      <v-row justify="center" dense>
        <v-img src="@/assets/crest_logo.png" contain max-width="200px"></v-img>
      </v-row>
      <v-row align="center" class="pt-8" justify="center" dense>
        <v-card class="elevation-12 mx-auto" width="400px">
          <v-toolbar :color="color" class="mx-auto" dark flat>
            <v-spacer></v-spacer>
            <v-icon left large>how_to_reg</v-icon>
            <v-toolbar-title>Crest Team Planner</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-container fluid>
              <v-row>
                <v-row justify="center" class="pt-8" dense>
                  <v-avatar size="100">
                    <v-img contain src="@/assets/login.jpeg"></v-img>
                  </v-avatar>
                </v-row>
              </v-row>
              <br />
              <v-row justify="center" dense>
                <h2>
                  Login to your Account
                </h2>
              </v-row>
              <br />
              <template v-if="invalidCred">
                <div style="color: red; text-align: center;" class="text-h3-sm">
                  Invalid Credentials, Please re-enter valid credentials.
                </div>
              </template>
              <form @keyup.enter="login">
                <v-row>
                  <v-text-field
                    label="Username"
                    name="username"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model="userData.username"
                  ></v-text-field>
                </v-row>
                <v-row>
                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="userData.password"
                  ></v-text-field>
                </v-row>
                <v-row justify="center" dense>
                  <v-btn
                    :color="color"
                    :loading="loading"
                    large
                    block
                    dark
                    @click.enter="login"
                  >
                    Login
                  </v-btn>
                </v-row>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-row>
    </v-container>
    <div class="text-center" v-else>
      <v-progress-circular
        indeterminate
        :color="color"
        size="54"
        width="6"
      ></v-progress-circular>
    </div>
  </v-app>
</template>

<script>
export default {
  name: "Login",

  data() {
    return {
      color: "#55595B",
      userData: {
        username: "",
        password: ""
      },
      invalidCred: false,
      loading: false,
      showPage: false
    };
  },

  created() {
    const token = localStorage.getItem("token");
    if (token !== null) {
      this.$checkToken(token)
        .then(response => {
          const data = {
            token: token,
            id: response.data.id,
            role: response.data.role,
            name: response.data.name
          };
          this.$store.commit("setAuthenticated", data);
        })
        .catch(() => {
          this.$notify({
            title: "Error",
            text: "Token Expired Please Login Again",
            type: "error"
          });
          this.showPage = true;
        });
    } else {
      this.showPage = true;
    }
  },

  methods: {
    login() {
      this.invalidCred = false;
      this.loading = true;
      this.$login(this.userData.username, this.userData.password)
        .then(response => {
          this.$store.commit("setAuthenticated", response.data);
          this.loading = false;
        })
        .catch(() => {
          this.invalidCred = true;
          this.loading = false;
        });
    }
  }
};
</script>
