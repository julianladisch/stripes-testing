// import { cy } from 'date-fns/locale';
import uuid from 'uuid';

export default {
  svid:uuid(), //
  inid:uuid(), // institution id
  cmid:uuid(), // campus id
  lbid:uuid(), // libraries id
  lcid:uuid(), // location id
  uuid:uuid(),
  isid:uuid(),
  hlind:uuid(), // holdings id
  itid:uuid(),
  itpid:uuid(),
  hsid:uuid(),
  mtid:uuid(),
  pltid:uuid(),

  servicePoint() {
    this.newServicePoint();
    this.newInstitutions();
    this.newCapuses();
    this.newLibraries();
    this.newLocations();
  },

  createItem() {
    this.newInstanceType();
    this.newHoldingsSources();
    this.newInstance();
    this.newHoldings();
    this.newMeterialType();
    this.newLoanType();
    this.newItem();
  },

  newServicePoint() {
    return cy.request({
      method: 'POST',
      url: 'https://folio-snapshot-okapi.dev.folio.org/service-points',
      headers: {
        'x-okapi-tenant': 'diku',
        'x-okapi-token': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkaWt1X2FkbWluIiwidXNlcl9pZCI6IjAyNjMxMTc0LTRhYTEtNWE4NS05OWJlLTI3YjVkMzZhNGMwMyIsImlhdCI6MTY0MDE2ODE5OSwidGVuYW50IjoiZGlrdSJ9.sO_nXvl3ruGdpOYkguGjUIMr9MseFRVFMHhkf1qW83M',
        'content-type': 'application/json',
      },
      body: {
        code: '11',
        discoveryDisplayName: 'test11',
        id: this.svid, // id
        name: 'test11',
      }
    })
      .then((resp) => {
        expect(resp.body).property('id');
      });
  },
  newInstitutions() {
    return cy.request({
      method: 'POST',
      url: 'https://folio-snapshot-okapi.dev.folio.org/location-units/institutions',

      headers: {
        'x-okapi-tenant': Cypress.env('OKAPI_TENANT'),
        'x-okapi-token': Cypress.env('token'),
        'content-type': Cypress.env('content_type'),
      },
      body: {
        code: '11',
        id: this.inid,
        name: 'test11',
      }
    })
      .then((resp) => {
        expect(resp.body).property('id');
      });
  },
  newCapuses() {
    return cy.request({
      method: 'POST',
      url: 'https://folio-snapshot-okapi.dev.folio.org/location-units/campuses',
      headers: {
        'x-okapi-tenant': Cypress.env('OKAPI_TENANT'),
        'x-okapi-token': Cypress.env('token'),
        'content-type': Cypress.env('content_type'),
      },
      body: {
        code: '11',
        id: this.cmid,
        institutionId: this.inid,
        name: 'test11',
      }
    })
      .then((resp) => {
        expect(resp.body).property('id');
      });
  },
  newLibraries() {
    return cy.request({
      method: 'POST',
      url: 'https://folio-snapshot-okapi.dev.folio.org/location-units/libraries',

      headers: {
        'x-okapi-tenant': Cypress.env('OKAPI_TENANT'),
        'x-okapi-token': Cypress.env('token'),
        'content-type': Cypress.env('content_type'),
      },
      body: {
        campusId: this.cmid,
        code: '11',
        id: this.lbid,
        name: 'test11',

      }
    })
      .then((resp) => {
        expect(resp.body).property('id');
      });
  },
  newLocations() {
    return cy.request({
      method: 'POST',
      url: 'https://folio-snapshot-okapi.dev.folio.org/locations',

      headers: {
        'x-okapi-tenant': Cypress.env('OKAPI_TENANT'),
        'x-okapi-token': Cypress.env('token'),
        'content-type': Cypress.env('content_type'),
      },
      body: {
        campusId: this.cmid,
        code: '11',
        details: {
          testing: '11'
        },
        discoveryDisplayName: 'test11',
        id: this.lcid,
        institutionId: this.inid,
        isActive: true,
        libraryId: this.lbid,
        name: 'test11',
        primaryServicePoint: this.svid,
        servicePointIds: [
          this.svid
        ]
      }
    })
      .then((resp) => {
        expect(resp.body).property('id');
      });
  },
  newInstanceType() {
    return cy.request({
      method: 'POST',
      url: 'https://folio-snapshot-okapi.dev.folio.org/instance-types',
      headers: {
        'x-okapi-tenant': Cypress.env('OKAPI_TENANT'),
        'x-okapi-token': Cypress.env('token'),
        'content-type': Cypress.env('content_type'),
      },
      body: {
        code: 'testing11',
        id: this.itpid,
        name: 'testing11',
        source: 'local',
      }
    })
      .then((resp) => {
        expect(resp.body).property('id');
      });
  },
  newHoldingsSources() {
    return cy.request({
      method: 'POST',
      url: 'https://folio-snapshot-okapi.dev.folio.org/holdings-sources',
      headers: {
        'x-okapi-tenant': Cypress.env('OKAPI_TENANT'),
        'x-okapi-token': Cypress.env('token'),
        'content-type': Cypress.env('content_type'),
      },
      body: {
        id: this.hsid,
        name: 'TESTING11',
        source: 'local',
      }
    })
      .then((resp) => {
        expect(resp.body).property('id');
      });
  },
  newInstance() {
    return cy.request({
      method: 'POST',
      url: 'https://folio-snapshot-okapi.dev.folio.org/inventory/instances',
      headers: {
        'x-okapi-tenant': Cypress.env('OKAPI_TENANT'),
        'x-okapi-token': Cypress.env('token'),
        'content-type': Cypress.env('content_type'),
      },
      body: {
        childInstances: [''],
        discoverySuppress: false,
        id: this.isid,
        instanceTypeId: this.itpid,
        arentInstances: [''],
        precedingTitles: [''],
        previouslyHeld: false,
        source: 'TESTING11',
        staffSuppress: false,
        succeedingTitles: [''],
        title: 'testing11',
      }
    })
      .then((resp) => {
        expect(resp.body).property('id');
      });
  },
  newHoldings() {
    return cy.request({
      method: 'POST',
      url: 'https://folio-snapshot-okapi.dev.folio.org/holdings-storage/holdings',
      headers: {
        'x-okapi-tenant': Cypress.env('OKAPI_TENANT'),
        'x-okapi-token': Cypress.env('token'),
        'content-type': Cypress.env('content_type'),
      },
      body: {
        id: this.hlid,
        instanceId: this.isid,
        permanentLocationId: this.lcid,
        sourceId: this.hsid,
      }
    })
      .then((resp) => {
        expect(resp.body).property('id');
      });
  },
  newMeterialType() {
    return cy.request({ // create mt for intem
      method: 'POST',
      url: 'https://folio-snapshot-okapi.dev.folio.org/material-types',
      headers: {
        'x-okapi-tenant': Cypress.env('OKAPI_TENANT'),
        'x-okapi-token': Cypress.env('token'),
        'content-type': Cypress.env('content_type'),
      },
      body: {
        id: this.mtid,
        name: 'testing11',
        source: 'local',
      }
    })
      .then((resp) => {
        expect(resp.body).property('id');
      });
  },
  newLoanType() {
    return cy.request({
      method: 'POST',
      url: 'https://folio-snapshot-okapi.dev.folio.org/loan-types',
      headers: {
        'x-okapi-tenant': Cypress.env('OKAPI_TENANT'),
        'x-okapi-token': Cypress.env('token'),
        'content-type': Cypress.env('content_type'),
      },
      body: {
        id: this.pltid,
        name: 'testing11',
      }
    })
      .then((resp) => {
        expect(resp.body).property('id');
      });
  },
  newItem() {
    return cy.request({
      method: 'POST',
      url: 'https://folio-snapshot-okapi.dev.folio.org/inventory/items',
      headers: {
        'x-okapi-tenant': Cypress.env('OKAPI_TENANT'),
        'x-okapi-token': Cypress.env('token'),
        'content-type': Cypress.env('content_type'),
      },
      body: {
        barcode: '111',
        holdingsRecordId: this.hlind,
        materialType: {
          id: this.mtid,
        },
        permanentLoanType: {
          id: this.pltid,
        },
        status: {
          name: 'Available'
        },
      }
    })
      .then((resp) => {
        expect(resp.body).property('barcode');
      });
  }
};
