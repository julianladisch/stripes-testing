// import { cy } from 'date-fns/locale';
import uuid from 'uuid';
import ServicePoint from '../../support/fragments/servicePoint/servicePoint';

export default {

  newUser() {
    this.newPatronGroup();
    this.newPatron();
  },

  newCheckOutItem() {
    this.chechOutItem();
  },

  pgid:uuid(),
  usid:uuid(),
  ckid:uuid(),
  newPatronGroup() {
    return cy.request({
      method: 'POST',
      url: 'https://folio-snapshot-okapi.dev.folio.org/groups',
      headers: {
        'x-okapi-tenant': Cypress.env('OKAPI_TENANT'),
        'x-okapi-token': Cypress.env('token'),
        'content-type': Cypress.env('content_type'),
      },
      body: {
        desc: 'testing',
        group: 'testing1',
        id: this.pgid,
      }
    })
      .then((resp) => {
        expect(resp.body).property('id');
      });
  },
  newPatron() {
    return cy.request({
      method: 'POST',
      url: 'https://folio-snapshot-okapi.dev.folio.org/users',
      headers: {
        'x-okapi-tenant': Cypress.env('OKAPI_TENANT'),
        'x-okapi-token': Cypress.env('token'),
        'content-type': Cypress.env('content_type'),
      },
      body: {
        active: true,
        barcode: '12345',
        departments: [],
        id: this.usid,
        patronGroup: this.pgid,
        personal: {
          email: 'drshalina20gmail.com',
          firstName: '',
          lastName: 'testing',
          preferredContactTypeId: '002',
        }
      }
    })
      .then((resp) => {
        expect(resp.body).property('id');
      });
  },
  chechOutItem() {
    return cy.request({
      method: 'POST',
      url: 'https://folio-snapshot-okapi.dev.folio.org/circulation/check-out-by-barcode',
      headers: {
        'x-okapi-tenant': Cypress.env('OKAPI_TENANT'),
        'x-okapi-token': Cypress.env('token'),
        'content-type': Cypress.env('content_type'),
      },
      body: {
        id: this.ckid,
        itemBarcode: '110',
        loanDate: '2021-12-22T12:38:14.858Z',
        servicePointId: this.Servisepoint,
        userBarcode: '12345'
      }
    })
      .then((resp) => {
        expect(resp.body).property('id');
      });
  }

};