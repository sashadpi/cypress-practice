/// <reference types="cypress" />

describe('Validation input field', () => {
	beforeEach(() => {
		cy.visit('/');
		cy.get('.btn-primary').click();
	});
	context('First name validation', () => {
		it('Empty name', () => {
			cy.get('#signupName').focus();
			cy.get('#signupName').blur();
			cy.get('.invalid-feedback').should('have.text', 'Name required');
			cy.get('.invalid-feedback').should('have.css', 'color', 'rgb(220, 53, 69)');
		});

		it('Short name', () => {
			cy.get('#signupName').type('a').blur();
			cy.get('.invalid-feedback').should('have.text', 'Name has to be from 2 to 20 characters long');
			cy.get('.invalid-feedback').should('have.css', 'color', 'rgb(220, 53, 69)');
		});

		it('Long name', () => {
			cy.get('#signupName').type('aaaaaaaaaaaaaaaaaaaaa').blur();
			cy.get('.invalid-feedback').should('have.text', 'Name has to be from 2 to 20 characters long');
			cy.get('.invalid-feedback').should('have.css', 'color', 'rgb(220, 53, 69)');
		});

		it('Invalid name', () => {
			cy.get('#signupName').type('@123456').blur();
			cy.get('.invalid-feedback').should('have.text', 'Name is invalid');
			cy.get('.invalid-feedback').should('have.css', 'color', 'rgb(220, 53, 69)');
		});
	});

	context('Last name validation', () => {
		it('Empty last name', () => {
			cy.get('#signupLastName').focus();
			cy.get('#signupLastName').blur();
			cy.get('.invalid-feedback').should('have.text', 'Last name required');
			cy.get('.invalid-feedback').should('have.css', 'color', 'rgb(220, 53, 69)');
		});

		it('Short last name', () => {
			cy.get('#signupLastName').type('a').blur();
			cy.get('.invalid-feedback').should('have.text', 'Last name has to be from 2 to 20 characters long');
			cy.get('.invalid-feedback').should('have.css', 'color', 'rgb(220, 53, 69)');
		});

		it('Long last name', () => {
			cy.get('#signupLastName').type('aaaaaaaaaaaaaaaaaaaaa').blur();
			cy.get('.invalid-feedback').should('have.text', 'Last name has to be from 2 to 20 characters long');
			cy.get('.invalid-feedback').should('have.css', 'color', 'rgb(220, 53, 69)');
		});

		it('Invalid last name', () => {
			cy.get('#signupLastName').type('!er456').blur();
			cy.get('.invalid-feedback').should('have.text', 'Last name is invalid');
			cy.get('.invalid-feedback').should('have.css', 'color', 'rgb(220, 53, 69)');
		});
	});

	context('Email validation', () => {
		it('Empty email', () => {
			cy.get('#signupEmail').focus();
			cy.get('#signupEmail').blur();
			cy.get('.invalid-feedback').should('have.text', 'Email required');
			cy.get('.invalid-feedback').should('have.css', 'color', 'rgb(220, 53, 69)');
		});

		it('Invalid email', () => {
			cy.get('#signupEmail').type('asaasasasasfgfgfgdfsd').blur();
			cy.get('.invalid-feedback').should('have.text', 'Email is incorrect');
			cy.get('.invalid-feedback').should('have.css', 'color', 'rgb(220, 53, 69)');
		});

		it('Invalid email', () => {
			cy.get('#signupEmail').type('asaasasasasfgfgfgdfsd').blur();
			cy.get('.invalid-feedback').should('have.text', 'Email is incorrect');
			cy.get('.invalid-feedback').should('have.css', 'color', 'rgb(220, 53, 69)');
		});
	});

	context.only('Password validation', () => {
		it('Empty password', () => {
			cy.get('#signupPassword').focus();
			cy.get('#signupPassword').blur();
			cy.get('.invalid-feedback').should('have.text', 'Password required');
			cy.get('.invalid-feedback').should('have.css', 'color', 'rgb(220, 53, 69)');
		});

		it('Password too short (less than 8)', () => {
			cy.get('#signupPassword').type('Ab12345').blur();
			cy.get('.invalid-feedback').should(
				'have.text',
				'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
			);
		});

		it('Password too long (more than 15)', () => {
			cy.get('#signupPassword').type('Ab12345678901234').blur();
			cy.get('.invalid-feedback').should(
				'have.text',
				'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
			);
		});

		it('Password without integers', () => {
			cy.get('#signupPassword').type('PasswordLong').blur();
			cy.get('.invalid-feedback').should(
				'have.text',
				'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
			);
		});

		it('Password without capital letters', () => {
			cy.get('#signupPassword').type('password123').blur();
			cy.get('.invalid-feedback').should(
				'have.text',
				'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
			);
		});

		it('Password without small letters', () => {
			cy.get('#signupPassword').type('PASSWORD123').blur();
			cy.get('.invalid-feedback').should(
				'have.text',
				'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
			);
		});

		it('Valid password should not show error', () => {
			cy.get('#signupPassword').type('ValidPass123').blur();
			cy.get('.invalid-feedback').should('not.exist');
		});
	});

	context('Re-enter password validation', () => {
		it('Empty re-enter password', () => {
			cy.get('#signupRepeatPassword').focus();
			cy.get('#signupRepeatPassword').blur();
			cy.get('.invalid-feedback').should('have.text', 'Re-enter password required');
			cy.get('.invalid-feedback').should('have.css', 'color', 'rgb(220, 53, 69)');
		});

		it('Invalid Re-enter password', () => {
			cy.get('#signupRepeatPassword').type('asaasasasasfgfgfgdfsd').blur();
			cy.get('.invalid-feedback').should(
				'have.text',
				'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
			);
			cy.get('.invalid-feedback').should('have.css', 'color', 'rgb(220, 53, 69)');
		});

		it('Passwords do not match', () => {
			cy.get('#signupPassword').type('Qwerty!@12');
			cy.get('#signupRepeatPassword').type('Qwerty!@11').blur();
			cy.get('.invalid-feedback').should('have.text', 'Passwords do not match');
			cy.get('.invalid-feedback').should('have.css', 'color', 'rgb(220, 53, 69)');
		});
	});
});

describe('Sign-up and Sign-in', () => {
	beforeEach(() => {
		cy.visit('/');
	});
	it('Valid Sign-up', () => {
		cy.get('.btn-primary').click();
		cy.get('#signupName').type('John');
		cy.get('#signupLastName').type('Wick');
		cy.get('#signupEmail').type(`sashadpi68+${Date.now()}@gmail.com`);
		cy.get('#signupPassword').type(Cypress.env('password'));
		cy.get('#signupRepeatPassword').type(Cypress.env('password'));
		cy.get('.modal-content .btn-primary').click();
		cy.get('h1').should('have.text', 'Garage');
	});

	it('Valid Sign-in', () => {
		cy.get('.header_right .header_signin').click();
		cy.get('#signinEmail').type(Cypress.env('email'));
		cy.get('#signinPassword').type(Cypress.env('password'));
		cy.get('.modal-footer .btn-primary').click();
		cy.get('h1').should('have.text', 'Garage');
	});

	it('Invalid email Sign-in', () => {
		cy.get('.header_right .header_signin').click();
		cy.get('#signinEmail').type('1');
		cy.get('#signinPassword').type(Cypress.env('password'));
		cy.get('.invalid-feedback').should('have.text', 'Email is incorrect');
		cy.get('.invalid-feedback').should('have.css', 'color', 'rgb(220, 53, 69)');
	});

	it('Invalid password Sign-in', () => {
		cy.get('.header_right .header_signin').click();
		cy.get('#signinEmail').type(Cypress.env('email'));
		cy.get('#signinPassword').type('1');
		cy.get('.modal-footer .btn-primary').click();
		cy.get('.alert-danger').should('have.text', 'Wrong email or password');
	});

	it('Forgot password valid email', () => {
		cy.get('.header_right .header_signin').click();
		cy.get('.form-group .btn-link').click();
		cy.get('#signinEmail').type(Cypress.env('email'));
		cy.get('.modal-footer .btn-primary').click();
		cy.get('.alert-success').should('have.text', 'Email with restore instructions was sent');
	});

	it('Forgot password wrong email', () => {
		cy.get('.header_right .header_signin').click();
		cy.get('.form-group .btn-link').click();
		cy.get('#signinEmail').type(`sashadpi68+${Date.now()}@gmail.com`);
		cy.get('.modal-footer .btn-primary').click();
		cy.get('.alert-success').should('have.text', 'Email with restore instructions was sent');
	});

	it('Forgot password incorrect email', () => {
		cy.get('.header_right .header_signin').click();
		cy.get('.form-group .btn-link').click();
		cy.get('#signinEmail').type('1');
		cy.get('.modal-footer .btn-primary').should('be.disabled');
	});

	it('Sign-in with remember me', () => {
		cy.get('.header_right .header_signin').click();
		cy.get('#signinEmail').type(Cypress.env('email'));
		cy.get('#signinPassword').type(Cypress.env('password'));
		cy.get('#remember').check();
		cy.get('.modal-footer .btn-primary').click();
		cy.get('.alert-success').should('have.text', 'You have been successfully logged in');
	});

	it('Sign-in without remember me', () => {
		cy.get('.header_right .header_signin').click();
		cy.get('#signinEmail').type(Cypress.env('email'));
		cy.get('#signinPassword').type(Cypress.env('password'));
		cy.get('#remember').check();
		cy.get('#remember').uncheck();
		cy.get('.modal-footer .btn-primary').click();
		cy.get('.alert-success').should('have.text', 'You have been successfully logged in');
	});
});

describe('Sign-up and Sign-in buttons', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	it('Sign-up close button', () => {
		cy.get('.btn-primary').click();
		cy.get('.modal-header span').click();
		cy.get('.modal-content').should('not.be.visible');
	});

	it('Sign-up login button', () => {
		cy.get('.btn-primary').click();
		cy.get('.modal-footer .btn-primary').should('be.disabled');
	});

	it('Sign-in close button', () => {
		cy.get('.header_right .header_signin').click();
		cy.get('.modal-header span').click();
		cy.get('.modal-content').should('not.be.visible');
	});

	it('Sign-in to registration', () => {
		cy.get('.header_right .header_signin').click();
		cy.get('.modal-footer .btn-link').click();
		cy.get('.modal-content').should('be.visible');
	});

	it('Forgote close button', () => {
		cy.get('.header_right .header_signin').click();
		cy.get('.form-group .btn-link').click();
		cy.get('.close').eq(0).click();
		cy.get('.modal-content').should('not.be.visible');
	});
});
