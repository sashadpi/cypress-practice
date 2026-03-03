class EditCar {
	get editBrandSelect() {
		return cy.get('#addCarBrand');
	}

	get editModelSelect() {
		return cy.get('#addCarModel');
	}

	get editCarMileageField() {
		return cy.get('#addCarMileage');
	}

	get carCreationDateField() {
		return cy.get('#carCreationDate');
	}

	get editCalendarButton() {
		return cy.get('.icon-calendar');
	}
}

export default new EditCar();
