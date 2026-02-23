const { defineConfig } = require('cypress');

module.exports = defineConfig({
	allowCypressEnv: true,
	env: {
		email: 'sashadpi68@gmail.com',
		password: '!Pre2225500',
	},

	e2e: {
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
		specPattern: 'lesson-20/cy-test/*.cy.{js,jsx,ts,tsx}',
		video: false,
		screenshotOnRunFailure: true,
		defaultCommandTimeout: 5000,
		baseUrl: 'https://guest:welcome2qauto@qauto.forstudy.space',
	},
});
