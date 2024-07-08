/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when email is empty
 *   - should display alert when password is empty
 *   - should display alert when username and password are wrong
 *   - should display homepage when username and password are correct
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should display login page correctly', () => {
    // verify items
    cy.get('input[id="email"]').should('be.visible');
    cy.get('input[id="password"]').should('be.visible');
    cy.get('button')
        .contains(/^Login$/)
        .should('be.visible');
  });

  it('should display alert when email is empty', () => {
    // actions
    cy.get('button')
        .contains(/^Login$/)
        .click();

    cy.get('#email:invalid')
        .invoke('prop', 'validationMessage')
        .should('equal', 'Please fill out this field.');
  });

  it('should display alert when password is empty', () => {
    // actions
    cy.get('input[id="email"]').type('user@mail.com');
    cy.get('button')
        .contains(/^Login$/)
        .click();

    cy.get('#password:invalid')
        .invoke('prop', 'validationMessage')
        .should('equal', 'Please fill out this field.');
  });

  it('should display alert when email and password are wrong', () => {
    // actions
    cy.get('input[id="email"]').type('malika@gmail.com');
    cy.get('input[id="password"]').type('password');
    cy.get('button')
        .contains(/^Login$/)
        .click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('email or password is wrong');
    });
  });

  it('should display homepage when email and password are correct', () => {
    cy.get('input[id="email"]').type('malika@gmail.com');
    cy.get('input[id="password"]').type('password');

    cy.get('button').contains(/^Login$/).click();

    cy.get('h1').contains(/^Top Thread$/).should('be.visible');
    cy.get('button').contains('Logout').should('be.visible');
  });
});
