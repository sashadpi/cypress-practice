class SignInForm {
	get emailField() {
		return cy.get('#signinEmail');
	}

	get passwordField() {
		return cy.get('#signinPassword');
	}

	get loginButton() {
		return cy.get('.modal-footer .btn-primary');
	}

	get wrongDataErrorMassege() {
		return cy.get('.alert-danger');
	}

	get incorrectData() {
		return cy.get('.invalid-feedback');
	}

	get loginButtonDisabled() {
		return cy.get('.modal-footer .btn-primary');
	}

	get openGaragePage() {
		return cy.get('h1');
	}

	enterEmail(email) {
		this.emailField.type(email);
	}

	enterPassword(password) {
		this.passwordField.type(password);
	}

	login(email, password) {
		this.enterEmail(email);
		this.enterPassword(password);
		this.loginButton.click();
	}
}

export default new SignInForm();
