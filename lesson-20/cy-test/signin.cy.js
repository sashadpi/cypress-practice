/// <reference types="cypress" />

describe('Sign in check all field', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	it('Valid Sign-in', () => {
		cy.get('.header_right .header_signin').click();
		cy.get('#signinEmail').type(Cypress.env('email'));
		cy.get('#signinPassword').type(Cypress.env('password'));
		cy.get('.modal-footer .btn-primary').click();
		cy.get('h1').should('have.text', 'Garage');
	});

	it('Invalid email Sign-in', () => {
		cy.get('.header_right .header_signin').click();
		cy.get('#signinEmail').type('1');
		cy.get('#signinPassword').type(Cypress.env('password'));
		cy.get('.invalid-feedback').should('have.text', 'Email is incorrect');
		cy.get('.invalid-feedback').should('have.css', 'color', 'rgb(220, 53, 69)');
	});

	it('Invalid password Sign-in', () => {
		cy.get('.header_right .header_signin').click();
		cy.get('#signinEmail').type(Cypress.env('email'));
		cy.get('#signinPassword').type('1');
		cy.get('.modal-footer .btn-primary').click();
		cy.get('.alert-danger').should('have.text', 'Wrong email or password');
	});

	it('Forgot password valid email', () => {
		cy.get('.header_right .header_signin').click();
		cy.get('.form-group .btn-link').click();
		cy.get('#signinEmail').type(Cypress.env('email'));
		cy.get('.modal-footer .btn-primary').click();
		cy.get('.alert-success').should('have.text', 'Email with restore instructions was sent');
	});

	it('Forgot password wrong email', () => {
		cy.get('.header_right .header_signin').click();
		cy.get('.form-group .btn-link').click();
		cy.get('#signinEmail').type(`sashadpi68+${Date.now()}@gmail.com`);
		cy.get('.modal-footer .btn-primary').click();
		cy.get('.alert-success').should('have.text', 'Email with restore instructions was sent');
	});

	it('Forgot password incorrect email', () => {
		cy.get('.header_right .header_signin').click();
		cy.get('.form-group .btn-link').click();
		cy.get('#signinEmail').type('1');
		cy.get('.modal-footer .btn-primary').should('be.disabled');
	});

	it('Sign-in with remember me', () => {
		cy.get('.header_right .header_signin').click();
		cy.get('#signinEmail').type(Cypress.env('email'));
		cy.get('#signinPassword').type(Cypress.env('password'));
		cy.get('#remember').check();
		cy.get('.modal-footer .btn-primary').click();
		cy.get('.alert-success').should('have.text', 'You have been successfully logged in');
	});

	it('Sign-in without remember me', () => {
		cy.get('.header_right .header_signin').click();
		cy.get('#signinEmail').type(Cypress.env('email'));
		cy.get('#signinPassword').type(Cypress.env('password'));
		cy.get('#remember').check();
		cy.get('#remember').uncheck();
		cy.get('.modal-footer .btn-primary').click();
		cy.get('.alert-success').should('have.text', 'You have been successfully logged in');
	});
});

describe('Sign-in buttons', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	it('Sign-in close button', () => {
		cy.get('.header_right .header_signin').click();
		cy.get('.modal-header span').click();
		cy.get('.modal-content').should('not.be.visible');
	});

	it('Sign-in to registration', () => {
		cy.get('.header_right .header_signin').click();
		cy.get('.modal-footer .btn-link').click();
		cy.get('.modal-content').should('be.visible');
	});

	it('Forgote close button', () => {
		cy.get('.header_right .header_signin').click();
		cy.get('.form-group .btn-link').click();
		cy.get('.close').eq(0).click();
		cy.get('.modal-content').should('not.be.visible');
	});
});
