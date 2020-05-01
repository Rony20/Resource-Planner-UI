<template>
  <div>From Project Request List</div>
</template>

<script>
export default {
  data() {
    return {
      requests: {},
      pm: 19
    };
  },

  methods: {
    loadRequestsFromProject() {
      this.$projectTeamByPm(this.pm)
        .then(response => {
          this.requests = {};
          let requests = {};
          for (let key in response.data) {
            requests[key] = [];
            response.data[key].forEach(id => {
              let request_object = {
                project_id: key,
                pm_id: this.pm,
                employee_id: id,
                priority: "Urgent",
                requested_hours: [8, 8, 8, 8, 8, 0, 0],
                request_status: "Initiated"
              };
              requests[key].push(request_object);
            });
          }
          this.requests = Object.assign({}, requests)
        })
        .catch(error => console.log(error));
    }
  },

  created() {
    this.loadRequestsFromProject();
  }
};
</script>

<style scoped></style>
