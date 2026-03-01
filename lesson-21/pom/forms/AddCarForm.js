class AddCarForm {
	get brandSelect() {
		return cy.get('#addCarBrand');
	}

	get modelSelect() {
		return cy.get('#addCarModel');
	}

	get addCarMileage() {
		return cy.get('#addCarMileage');
	}

	get modalAddButton() {
		return cy.get('.modal-footer .btn-primary');
	}

	get cancelModalAddCar() {
		return cy.get('.modal-footer .btn-secondary');
	}

	get errorMileage() {
		return cy.get('.invalid-feedback');
	}

	selectParam(brand, model, mileage) {
		this.brandSelect.select(brand);
		this.modelSelect.select(model);
		this.addCarMileage.type(mileage);
	}

	enterMileage(number) {
		this.addCarMileage.type(number).blur();
	}

	emptyMileage() {
		this.addCarMileage.focus();
		this.addCarMileage.blur();
	}

	
}

export default new AddCarForm();
