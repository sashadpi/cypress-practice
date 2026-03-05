/// <reference types="cypress" />

import AddCarForm from '../pom/forms/AddCarForm';
import SignInForm from '../pom/forms/SignInForm';
import GaragePage from '../pom/pages/GaragePage';
import HomePage from '../pom/pages/HomePage';

beforeEach(() => {
	HomePage.visit();
	HomePage.openSignInForm();
	SignInForm.login(Cypress.env('email'), Cypress.env('password'));
	GaragePage.openAddCarForm();
});

describe('Garage Tests', () => {
	context('Add cars', () => {
		it('Add a first car', () => {
			AddCarForm.fillCarAddingForm('Ford', 'Fiesta', 250);
			AddCarForm.modalAddButton.click();
		});

		it('Add a second car', () => {
			AddCarForm.fillCarAddingForm('Audi', 'TT', 54000);
			AddCarForm.modalAddButton.click();
		});

		it('Add a third car', () => {
			AddCarForm.fillCarAddingForm('BMW', '5', 4500);
			AddCarForm.modalAddButton.click();
		});
	});

	context('Delete cars', () => {
		it('Delete all cars', () => {
			cy.request('GET', '/api/cars').then((carsResponse) => {
				const cars = carsResponse.body.data;

				if (cars.length > 0) {
					cars.forEach((car) => {
						cy.request('DELETE', `/api/cars/${car.id}`).then((deleteResponse) => {
							expect(deleteResponse.status).to.eq(200);
						});
					});
				}
			});
		});
	});
});
