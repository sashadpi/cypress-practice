class Expense {
	get vehicleSelect() {
		return cy.get('#addExpenseCar');
	}

	get calendarButton() {
		return cy.get('.icon-calendar');
	}

	get mileageField() {
		return cy.get('#addExpenseMileage');
	}

	get addLitersField() {
		return cy.get('#addExpenseLiters');
	}

	get totalCostField() {
		return cy.get('#addExpenseTotalCost');
	}

	get addButton() {
		return cy.get('.modal-footer .btn-primary');
	}

	get cencelButton() {
		return cy.get('.modal-footer .btn-secondary');
	}

	get errorText() {
		return cy.get('.invalid-feedback');
	}

	get alertMassege() {
		return cy.get('.alert-danger');
	}

	incrementMileage() {
		this.mileageField.invoke('val').then((val) => {
			const nextValue = Number(val) + 1;
			this.mileageField.clear().type(nextValue.toString());
		});
	}
}

export default new Expense();
