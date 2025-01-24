const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    reporter: 'mochawesome',
    reporterOptions: {
    reportDir: 'cypress/results',
    overwrite: false,
    html: true,
    json: true,
    video: false,
    },

  baseUrl: "https://pushing-it.vercel.app/",
  
  env: {
    user: "roberto",
    password: "123456!",
    token: null
  }

  },
});
