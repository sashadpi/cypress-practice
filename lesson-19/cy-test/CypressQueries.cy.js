/// <reference types="cypress" />

describe('Lesson19', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	it('Registration form', () => {
		cy.get('.btn-primary').click();
		cy.get('.modal-content').within(() => {
			cy.get('span').click();
		});
	});

	it('Header buttons', () => {
		cy.get('.header_inner button');
	});

	it('Contacts icon', () => {
		cy.get('.align-items-md-start').find('.socials_icon');
	});
});
