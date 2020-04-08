const state = {
  my_employees: [
    {
      id: 1,
      name: "Mehul Jadav",
      skills: ["React", "Vue.js", "Docker"],
      availability: [8, 8, 8, 8, 8]
    },
    {
      id: 2,
      name: "Rohan Borakhatariya",
      skills: ["Python", "Vue.js", "Docker", "React"],
      availability: [8, 8, 8, 8, 8]
    },
    {
      id: 3,
      name: "Maulik Kotak",
      skills: ["Vuetify", "Vue.js", "Docker"],
      availability: [8, 8, 8, 8, 8]
    },
    {
      id: 4,
      name: "Sameer Karli",
      skills: ["Angular", "Vue.js", "Docker"],
      availability: [8, 8, 8, 8, 8]
    },
    {
      id: 5,
      name: "Dhruvil Megha",
      skills: ["FastAPI", "Vue.js", "Docker"],
      availability: [8, 8, 8, 8, 8]
    }
  ]
};

const getters = {
  getEmployees: state => {
    return state.my_employees;
  }
};

const mutations = {};

const actions = {};

export default {
  state,
  getters,
  actions,
  mutations
};
