class HomePage {
	get signInButton() {
		return cy.get('.header_signin');
	}

	visit() {
		cy.visit('/');
	}

	openSignInForm() {
		this.signInButton.click();
	}
}
export default new HomePage();
