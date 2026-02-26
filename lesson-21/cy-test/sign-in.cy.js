/// <reference types="cypress" />

import SignInForm from '../pom/forms/SignInForm';
import HomePage from '../pom/pages/HomePage';

beforeEach(() => {
	HomePage.visit();
	HomePage.openSignInForm();
});

describe('Sign in form', () => {
	context.only('Email and password field', () => {
		it('Valid Sign-in', () => {
			SignInForm.login(Cypress.env('email'), Cypress.env('password'));
			SignInForm.openGaragePage.should('have.text', 'Garage');
		});

		it('Invalid email Sign-in', () => {
			SignInForm.enterEmail('1');
			SignInForm.enterPassword(Cypress.env('password'));
			SignInForm.incorrectData.should('have.text', 'Email is incorrect').and('have.css', 'color', 'rgb(220, 53, 69)');
			SignInForm.loginButtonDisabled.should('be.disabled');
		});

		it('Invalid password Sign-in', () => {
			SignInForm.enterEmail(Cypress.env('email'));
			SignInForm.enterPassword('1');
			SignInForm.loginButtonDisabled.click();
			SignInForm.wrongDataErrorMassege.should('have.text', 'Wrong email or password');
		});
	});
	context('Forgot password', () => {
		it('Forgot password valid email', () => {
			cy.get('.form-group .btn-link').click();
			cy.get('#signinEmail').type(Cypress.env('email'));
			cy.get('.modal-footer .btn-primary').click();
			cy.get('.alert-success').should('have.text', 'Email with restore instructions was sent');
		});

		it('Forgot password wrong email', () => {
			cy.get('.form-group .btn-link').click();
			cy.get('#signinEmail').type(`sashadpi68+${Date.now()}@gmail.com`);
			cy.get('.modal-footer .btn-primary').click();
			cy.get('.alert-success').should('have.text', 'Email with restore instructions was sent');
		});

		it('Forgot password incorrect email', () => {
			cy.get('.form-group .btn-link').click();
			cy.get('#signinEmail').type('1');
			cy.get('.modal-footer .btn-primary').should('be.disabled');
		});
	});

	context('Remember me', () => {
		it('Sign-in with remember me', () => {
			cy.get('#signinEmail').type(Cypress.env('email'));
			cy.get('#signinPassword').type(Cypress.env('password'));
			cy.get('#remember').check();
			cy.get('.modal-footer .btn-primary').click();
			cy.get('.alert-success').should('have.text', 'You have been successfully logged in');
		});

		it('Sign-in without remember me', () => {
			cy.get('#signinEmail').type(Cypress.env('email'));
			cy.get('#signinPassword').type(Cypress.env('password'));
			cy.get('#remember').check();
			cy.get('#remember').uncheck();
			cy.get('.modal-footer .btn-primary').click();
			cy.get('.alert-success').should('have.text', 'You have been successfully logged in');
		});
	});
});

describe('Sign-in buttons', () => {
	it('Sign-in close button', () => {
		cy.get('.modal-header span').click();
		cy.get('.modal-content').should('not.be.visible');
	});

	it('Sign-in to registration', () => {
		cy.get('.modal-footer .btn-link').click();
		cy.get('.modal-content').should('be.visible');
	});

	it('Forgote close button', () => {
		cy.get('.form-group .btn-link').click();
		cy.get('.close').eq(0).click();
		cy.get('.modal-content').should('not.be.visible');
	});
});
