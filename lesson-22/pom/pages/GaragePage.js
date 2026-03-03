class GaragePage {
	get addCarButton() {
		return cy.contains('button.btn-primary', 'Add car');
	}

	get modalAddCar() {
		return cy.get('.modal-header');
	}

	get editCar() {
		return cy.get('.icon-edit');
	}

	get removeCar() {
		return cy.get('.btn-outline-danger');
	}

	get approveRemoveCar() {
		return cy.get('.btn-danger');
	}

	get addFuelExpence() {
		return cy.get('.btn-success');
	}

	get expensesPageButton() {
		return cy.get('.icon-fuel');
	}

	get profileButton() {
		return cy.get('.-profile');
	}

	get profileName() {
		return cy.get('.display-4');
	}

	deleteCar() {
		this.editCar.first().click();
		this.removeCar.click();
		this.approveRemoveCar.click();
	}

	deleteAllCars() {
		cy.url().should('include', '/garage');
		cy.get('body').then(($body) => {
			// Проверяем, есть ли кнопка редактирования на странице
			if ($body.find('.icon-edit').length > 0) {
				this.deleteCar(); // Вызываем вашу функцию
				this.deleteAllCars(); // Рекурсивно вызываем себя снова, пока машины не закончатся
			}
		});
	}
	openAddCarForm() {
		this.addCarButton.click();
	}
}

export default new GaragePage();
