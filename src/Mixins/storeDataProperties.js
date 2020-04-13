export const storeDataPropertiesMixin = {
  computed: {
    appEmployees() {
      return this.$store.getters.getEmployees;
    },

    appProjects() {
      return this.$store.getters.getAllProjects;
    },

    appLeads() {
      return this.$store.getters.getAllPms;
    },

    appSkills() {
      return this.$store.getters.getAllSkills;
    }
  }
};
