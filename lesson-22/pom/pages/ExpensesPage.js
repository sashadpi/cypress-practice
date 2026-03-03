class ExpensesPage {
	get expensesAddedMassage() {
		return cy.get('.alert-success');
	}

	get garagePageButton() {
		return cy.get('.icon-garage');
	}

	get addAnExpenseButton() {
		return cy.get('.btn-primary');
	}
}

export default new ExpensesPage();
