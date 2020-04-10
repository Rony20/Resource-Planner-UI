import Vue from "vue";
import Vuex from "vuex";

import ProjectsData from "./module/projects.js"
import EmployeesData from "./module/employees.js"
import DropdownsData from "./module/dropdowns.js"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user_role: "PMO",
    useWeekends: false,
    snackbar: {
      show: false,
      text: "",
      color: "",
      timeout: 3000
    },
    my_projects: [
      "AWS Guard Duty",
      "AWS Usage Splunk App for Interns",
      "AWS instance management of Illumio",
      "Account & Finance",
      "Asset Management System for interns",
      "Autodesk Chef",
      "Autodesk Cloud Automation",
      "Autodesk ELK",
      "Autodesk JIRA",
      "Autodesk Splunk",
      "Autodesk devops",
      "Automation Testing ServiceNow",
      "AvidSecure JIRA Integration",
      "AvidSecure ServiceNow Integration",
      "AvidSecure Slack Integration",
      "AvidSecure for Splunk",
      "Azure Sentinel Integration For Vectra Cognito Detect",
      "BD Pipeline",
      "BMC Jitterbit",
      "BNW SAP PowerConnect",
      "BeyondTrust Ansible",
      "BeyondTrust Splunk",
      "Bit_JIRA_sample_project ",
      "Bitbucket Splunk App and Addon for interns",
      "Box Integration",
      "Box Shield Splunk App",
      "CDS - Knowledge Bank",
      "CDS-Inhouse-Projects",
      "CISCO ACI Terraform",
      "CMX",
      "CMX pxGrid",
      "CUIOP - Token Changes",
      "CUIOP-DataGen",
      "CUIOP-Resolution Configurations",
      "CUIOP-Schedule Reports",
      "CUIOP-SplunkUpgrade",
      "CX-T-TEN",
      "Centrify",
      "CentrifyOps",
      "Checkpoint AR",
      "Checkpoint Dome9 ServiceNow"
    ],
    r_projects: [
      {
        project: "Checkpoint Dome9 ServiceNow",
        employees: [
          {
            name: "Mehul Jadav",
            priority: "Urgent",
            demandedHours: [8, 8, 8, 8, 8]
          },
          {
            name: "Maulik Kotak",
            priority: "Medium",
            demandedHours: [8, 8, 8, 8, 8]
          }
        ]
      },
      {
        project: "Resource Planner",
        employees: [
          {
            name: "Mehul Jadav",
            priority: "Low",
            demandedHours: [8, 8, 8, 8, 8]
          },
          {
            name: "Sameer Karli",
            priority: "Medium",
            demandedHours: [8, 8, 8, 8, 8]
          }
        ]
      },
      {
        project: "HRMS",
        employees: [
          {
            name: "Rohan B",
            priority: "Urgent",
            demandedHours: [8, 8, 8, 8, 8]
          },
          {
            name: "Dhruvil Megha",
            priority: "Low",
            demandedHours: [8, 8, 8, 8, 8]
          }
        ]
      }
    ]
  },
  mutations: {},
  actions: {},
  modules: {
    ProjectsData,
    EmployeesData,
    DropdownsData
  }
});
