/// <reference types="cypress" />

beforeEach(() => {
	cy.request('POST', '/api/auth/signin', {
		email: Cypress.env('email'),
		password: Cypress.env('password'),
	}).then((response) => {
		cy.log(JSON.stringify(response.body));
	});
});

describe('API test Garage page', () => {
	it('Add car', () => {
		cy.request({
			method: 'POST',
			url: '/api/cars',
			body: {
				carBrandId: 3,
				carModelId: 13,
				mileage: 885522,
			},
		}).then((response) => {
			cy.log(JSON.stringify(response.body));
		});
	});

	it('Add an expenses', () => {
		cy.request('GET', '/api/cars').then((res) => {
			const car = res.body.data[0];
			cy.request('POST', '/api/expenses', {
				carId: car.id,
				reportedAt: new Date().toISOString().split('T')[0],
				mileage: car.mileage + 1,
				liters: 10,
				totalCost: 5500,
			})
				.its('status')
				.should('eq', 200);
		});
	});

	it('PUT an expenses', () => {
		cy.request('GET', '/api/cars').then((res) => {
			const car = res.body.data[0];
			const carId = car.id;
			const currentMileage = car.mileage;

			cy.request('GET', `/api/expenses?carId=${carId}&page=1`).then((expensesRes) => {
				const expenseId = expensesRes.body.data[0].id;
				cy.request({
					method: 'PUT',
					url: `/api/expenses/${expenseId}`,
					body: {
						carId: carId,
						reportedAt: new Date().toISOString(),
						mileage: currentMileage + 1,
						liters: 15,
						totalCost: 25,
						forceMileage: false,
					},
				})
					.its('status')
					.should('eq', 200);
			});
		});
	});

	it('Delete all cars', () => {
		cy.request('GET', '/api/cars').then((res) => {
			const cars = res.body.data;

			if (cars.length > 0) {
				cars.forEach((car) => {
					cy.request('DELETE', `/api/cars/${car.id}`).then((deleteResponse) => {
						expect(deleteResponse.status).to.eq(200);
					});
				});
			}
		});
	});

	it('Profile name user', () => {
		cy.request('GET', '/api/users/profile').then((response) => {
			expect(response.status).to.eq(200);

			const profile = response.body.data;
			expect(profile).to.have.property('name');
			expect(profile).to.have.property('lastName');

			cy.log(`User: ${profile.name} ${profile.lastName}`);
		});
	});
});
