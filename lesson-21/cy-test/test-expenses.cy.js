/// <reference types="cypress" />

import AddAnExpenseForm from '../pom/forms/AddAnExpenseForm';
import AddCarForm from '../pom/forms/AddCarForm';
import SignInForm from '../pom/forms/SignInForm';
import ExpensesPage from '../pom/pages/ExpensesPage';
import GaragePage from '../pom/pages/GaragePage';
import HomePage from '../pom/pages/HomePage';

beforeEach(() => {
	HomePage.visit();
	HomePage.openSignInForm();
	SignInForm.login(Cypress.env('email'), Cypress.env('password'));
});

describe('Add an expense', () => {
	context('Add and delete fuel expenses to the car', () => {
		beforeEach(() => {
			GaragePage.openAddCarForm();
			AddCarForm.fillCarAddingForm('Porsche', '911', 450);
			AddCarForm.modalAddButton.click();
			GaragePage.addFuelExpence.first().click();
		});
		afterEach(() => {
			ExpensesPage.garagePageButton.click();
			GaragePage.deleteCar();
		});

		it('Add valid data', () => {
			AddAnExpenseForm.incrementMileage();
			AddAnExpenseForm.addLitersField.type('10');
			AddAnExpenseForm.totalCostField.type('5000');
			AddAnExpenseForm.addButton.click();
			ExpensesPage.expensesAddedMassage.should('have.text', 'Fuel expense added');
		});
	});

	context('Add liters and cost in field', () => {
		beforeEach(() => {
			GaragePage.openAddCarForm();
			AddCarForm.fillCarAddingForm('Ford', 'Fiesta', 8002);
			AddCarForm.modalAddButton.click();
			GaragePage.expensesPageButton.click();
			ExpensesPage.addAnExpenseButton.click();
		});

		it('Add number of liters', () => {
			AddAnExpenseForm.addLitersField.type('9');
			AddAnExpenseForm.addLitersField.should('have.value', '9');
		});

		it('Empty number of liters field', () => {
			AddAnExpenseForm.addLitersField.focus();
			AddAnExpenseForm.addLitersField.blur();
			AddAnExpenseForm.errorText.should('have.text', 'Liters required');
		});

		it('Add total cost', () => {
			AddAnExpenseForm.totalCostField.type('5000');
			AddAnExpenseForm.totalCostField.should('have.value', '5000');
		});

		it('Empty total cost field', () => {
			AddAnExpenseForm.totalCostField.focus();
			AddAnExpenseForm.totalCostField.blur();
			AddAnExpenseForm.errorText.should('have.text', 'Total cost required');
		});

		it('Do not change the mileage field', () => {
			AddAnExpenseForm.addLitersField.type('9');
			AddAnExpenseForm.totalCostField.type('5000');
			AddAnExpenseForm.addButton.click();
			AddAnExpenseForm.alertMassege.should('include.text', `First expense mileage must not be less or equal to car initial mileage.`);
		});
	});
});

describe('Delete all cars', () => {
	it('Detele all cars', () => {
		GaragePage.deleteAllCars();
	});
});
