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

describe('Garage Tests', () => {
	context('Open/close modal form Add car', () => {
		it('Open modal form', () => {
			GaragePage.openAddCarForm();
			GaragePage.modalAddCar.should('be.visible');
		});

		it('Cencel modal form', () => {
			GaragePage.openAddCarForm();
			GaragePage.modalAddCar.should('be.visible');
			AddCarForm.cancelModalAddCar.click();
			GaragePage.modalAddCar.should('not.be.visible');
		});

		it('Select brand, model, mileage', () => {
			GaragePage.openAddCarForm();
			AddCarForm.selectParam('Ford', 'Fiesta', 20);
		});
	});

	context('Mileage incorect input', () => {
		beforeEach(() => {
			GaragePage.openAddCarForm();
		});

		it('Input negative value', () => {
			AddCarForm.enterMileage('-1');
			AddCarForm.errorMileage.should('have.text', 'Mileage has to be from 0 to 999999');
		});

		it('Empty field', () => {
			AddCarForm.emptyMileage();
			AddCarForm.errorMileage.should('have.text', 'Mileage cost required');
		});

		it('More than the maximum', () => {
			AddCarForm.enterMileage('1000000');
			AddCarForm.modalAddButton.should('be.disabled');
		});
	});

	context('Creation and Cleanup', () => {
		afterEach(() => {
			GaragePage.deleteCar();
		});
		it('Add car to Garage', () => {
			GaragePage.openAddCarForm();
			AddCarForm.selectParam('BMW', 'X5', 150);
			AddCarForm.modalAddButton.click();
			GaragePage.editCar.should('be.visible');
		});
	});

	context('Add liters and cost in field', () => {
		beforeEach(() => {
			GaragePage.openAddCarForm();
			AddCarForm.selectParam('Ford', 'Fiesta', 250);
			AddCarForm.modalAddButton.click();
			GaragePage.addFuelExpence.first().click();
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

	context('Add expense fuel', () => {
		beforeEach(() => {
			GaragePage.openAddCarForm();
			AddCarForm.selectParam('Porsche', '911', 450);
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
});

describe('Delete all cars', () => {
	it('Detele all cars', () => {
		GaragePage.deleteAllCars();
	});
});
