/// <reference types="cypress" />

import SignInForm from '../pom/forms/SignInForm';
import GaragePage from '../pom/pages/GaragePage';
import HomePage from '../pom/pages/HomePage';

beforeEach(() => {});

describe('Intercept name profile', () => {
	it('Valid Sign-in', () => {
		let response = {
			status: 'ok',
			data: {
				userId: 332473,
				photoFilename: 'default-user.png',
				name: 'Polar',
				lastName: 'Bear',
				dateBirth: '2021-03-17T15:21:05.000Z',
				country: 'Ukraine',
			},
		};
		cy.intercept('GET', '/api/users/profile', response);
		HomePage.visit();
		HomePage.openSignInForm();
		SignInForm.login(Cypress.env('email'), Cypress.env('password'));
		GaragePage.profileButton.click();
		GaragePage.profileName.should('have.text', 'Polar Bear');
	});
});
