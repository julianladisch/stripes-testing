import ServicePoint  from '../../support/fragments/servicePoint/servicePoint'

describe('ui-checkin: actions', () => {
    beforeEach('navigates Service point', () => {
      cy.login(Cypress.env('diku_login'), Cypress.env('diku_password'));
      cy.visit('/settings');
    });

    it('Create Service Point', () => {
        cy.do(ServicePoint.open());
    });

});