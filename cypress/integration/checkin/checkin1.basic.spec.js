import { cy } from 'date-fns/locale';
import uuid from 'uuid';

describe('ui-checkin: actions', () => {
  beforeEach('navigates Service point', () => {
    cy.login(Cypress.env('diku_login'), Cypress.env('diku_password'));
    cy.visit('/setting');
  });
  it('check', () => {
    cy.request({
      method: 'POST',
      url: 'https://folio-snapshot-okapi.dev.folio.org/service-points',
      headers: {
        'x-okapi-tenant': Cypress.env('OKAPI_TENANT'),
        'x-okapi-token': Cypress.env('token'),
        'content-type': Cypress.env('content_type'),
      },
      body: {
        code: '1',
        discoveryDisplayName: 'test1',
        id: this.svid, // id
        name: 'test1',
      }
    })
      .then((resp) => {
        expect(resp.body).property('id');
      });
  });
});


