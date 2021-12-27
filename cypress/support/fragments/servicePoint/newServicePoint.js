/* eslint-disable no-undef */
import { cy } from 'date-fns/locale';
import uuid from 'uuid';

export default {
  svid:uuid(), //
  inid:uuid(), // institution id
  cmid:uuid(), // campus id
  lbid:uuid(), // libraries id
  lcid:uuid(), // location id
  uuid:uuid(),
  isid:uuid(),
  hlind:uuid(),
  itid:uuid(),
  itpid:uuid(),
  hsid:uuid(),
  mtid:uuid(),
  pltid:uuid(),
  newServicePoint() {
    cy.request({
      method: 'POST',
      url: 'https://folio-snapshot-okapi.dev.folio.org/service-points',
      headers: {
        'x-okapi-tenant': 'diku',
        'x-okapi-token': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkaWt1X2FkbWluIiwidXNlcl9pZCI6IjE2ZjAwNDA0LTM4M2UtNWMyOS1hMjZiLTY4YTFlNGMxMzZjZiIsImlhdCI6MTY0MDA3Nzc4OSwidGVuYW50IjoiZGlrdSJ9.Y3v4sn9jQezuHegnjPTxPOy5n3zdywSBUUxxAOhECyQ',
        'content-type': 'application/json',
      },
      body: {
        code: '7',
        discoveryDisplayName: 'test5',
        id: this.svid, // id
        name: 'test7',
      }
    })
      .then((resp) => {
        expect(resp.body).property('id');
      });
    cy.request({
      method: 'POST',
      url: 'https://folio-snapshot-okapi.dev.folio.org/location-units/institutions',

      headers: {
        'x-okapi-tenant': 'diku',
        'x-okapi-token': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkaWt1X2FkbWluIiwidXNlcl9pZCI6IjE2ZjAwNDA0LTM4M2UtNWMyOS1hMjZiLTY4YTFlNGMxMzZjZiIsImlhdCI6MTY0MDA3Nzc4OSwidGVuYW50IjoiZGlrdSJ9.Y3v4sn9jQezuHegnjPTxPOy5n3zdywSBUUxxAOhECyQ',
        'content-type': 'application/json',
      },
      body: {
        code: '7',
        id: this.inid,
        name: 'test7',
      }
    })
      .then((resp) => {
        expect(resp.body).property('id');
      })
    cy.request({
      method: 'POST',
      url: 'https://folio-snapshot-okapi.dev.folio.org/location-units/campuses',
      headers: {
        'x-okapi-tenant': 'diku',
        'x-okapi-token': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkaWt1X2FkbWluIiwidXNlcl9pZCI6IjE2ZjAwNDA0LTM4M2UtNWMyOS1hMjZiLTY4YTFlNGMxMzZjZiIsImlhdCI6MTY0MDA3Nzc4OSwidGVuYW50IjoiZGlrdSJ9.Y3v4sn9jQezuHegnjPTxPOy5n3zdywSBUUxxAOhECyQ',
        'content-type': 'application/json',
      },
      body: {
        code: '7',
        id: this.cmid,
        institutionId: this.inid,
        name: 'test7',
      }
    })
      .then((resp) => {
        expect(resp.body).property('id');
      });
    cy.request({
      method: 'POST',
      url: 'https://folio-snapshot-okapi.dev.folio.org/location-units/libraries',

      headers: {
        'x-okapi-tenant': 'diku',
        'x-okapi-token': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkaWt1X2FkbWluIiwidXNlcl9pZCI6IjE2ZjAwNDA0LTM4M2UtNWMyOS1hMjZiLTY4YTFlNGMxMzZjZiIsImlhdCI6MTY0MDA3Nzc4OSwidGVuYW50IjoiZGlrdSJ9.Y3v4sn9jQezuHegnjPTxPOy5n3zdywSBUUxxAOhECyQ',
        'content-type': 'application/json',
      },
      body: {
        campusId: this.cmid,
        code: '7',
        id: this.lbid,
        name: 'test7',

      }
    })
      .then((resp) => {
        expect(resp.body).property('id');
      })
    cy.request({
      method: 'POST',
      url: 'https://folio-snapshot-okapi.dev.folio.org/locations',

      headers: {
        'x-okapi-tenant': 'diku',
        'x-okapi-token': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkaWt1X2FkbWluIiwidXNlcl9pZCI6IjE2ZjAwNDA0LTM4M2UtNWMyOS1hMjZiLTY4YTFlNGMxMzZjZiIsImlhdCI6MTY0MDA3Nzc4OSwidGVuYW50IjoiZGlrdSJ9.Y3v4sn9jQezuHegnjPTxPOy5n3zdywSBUUxxAOhECyQ',
        'content-type': 'application/json'
      },
      body: {
        campusId: this.cmid,
        code: '7',
        details: {
          testing: '7'
        },
        discoveryDisplayName: 'test7',
        id: this.lcid,
        institutionId: this.inid,
        isActive: true,
        libraryId: this.lbid,
        name: 'test7',
        primaryServicePoint: this.svid,
        servicePointIds: [
          this.svid
        ]
      }
    })
      .then((resp) => {
        expect(resp.body).property('id');
      })
  },
  newItem() {
    cy.request({ // create instance type
      method: 'POST',
      url: 'https://folio-snapshot-okapi.dev.folio.org/instance-types',
      headers: {
        'x-okapi-tenant': 'diku',
        'x-okapi-token': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkaWt1X2FkbWluIiwidXNlcl9pZCI6IjE2ZjAwNDA0LTM4M2UtNWMyOS1hMjZiLTY4YTFlNGMxMzZjZiIsImlhdCI6MTY0MDA3Nzc4OSwidGVuYW50IjoiZGlrdSJ9.Y3v4sn9jQezuHegnjPTxPOy5n3zdywSBUUxxAOhECyQ',
        'content-type': 'application/json',
      },
      body: {
        code: 'testing7',
        id: this.itpid,
        name: 'test7',
        source: 'local',
      }
    })
      .then((resp) => {
        expect(resp.body).property('id');
      })
    cy.request({ // create instance
      method: 'POST',
      url: 'https://folio-snapshot-okapi.dev.folio.org/inventory/instances',
      headers: {
        'x-okapi-tenant': 'diku',
        'x-okapi-token': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkaWt1X2FkbWluIiwidXNlcl9pZCI6IjE2ZjAwNDA0LTM4M2UtNWMyOS1hMjZiLTY4YTFlNGMxMzZjZiIsImlhdCI6MTY0MDA3Nzc4OSwidGVuYW50IjoiZGlrdSJ9.Y3v4sn9jQezuHegnjPTxPOy5n3zdywSBUUxxAOhECyQ',
        'content-type': 'application/json',
      },
      body: {
        childInstances: [],
        discoverySuppress: false,
        id: this.isid,
        instanceTypeId: this.itpid, // как указывать определенное ид
        arentInstances: [],
        precedingTitles: [],
        previouslyHeld: false,
        source: 'FOLIO', // check
        staffSuppress: false,
        succeedingTitles: [],
        title: 'testing7',
      }
    })
      .then((resp) => {
        expect(resp.body).property('id');
      })
    // cy.request({ // create holdings source
    //   method: 'POST',
    //   url: 'https://folio-snapshot-okapi.dev.folio.org/holdings-sources',
    //   headers: {
    //     'x-okapi-tenant': 'diku',
    //     'x-okapi-token': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkaWt1X2FkbWluIiwidXNlcl9pZCI6IjE2ZjAwNDA0LTM4M2UtNWMyOS1hMjZiLTY4YTFlNGMxMzZjZiIsImlhdCI6MTY0MDA3Nzc4OSwidGVuYW50IjoiZGlrdSJ9.Y3v4sn9jQezuHegnjPTxPOy5n3zdywSBUUxxAOhECyQ',
    //     'content-type': 'application/json',
    //   },
    //   body: {
    //     id: this.hsid,
    //     name: 'TESTING',
    //     source: 'local',
    //   }
    // })
    //   .then((resp) => {
    //     expect(resp.body).property('id');
    //   })
    cy.request({ // create holdings
      method: 'POST',
      url: 'https://folio-snapshot-okapi.dev.folio.org/holdings-storage/holdings',
      headers: {
        'x-okapi-tenant': 'diku',
        'x-okapi-token': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkaWt1X2FkbWluIiwidXNlcl9pZCI6IjE2ZjAwNDA0LTM4M2UtNWMyOS1hMjZiLTY4YTFlNGMxMzZjZiIsImlhdCI6MTY0MDA3Nzc4OSwidGVuYW50IjoiZGlrdSJ9.Y3v4sn9jQezuHegnjPTxPOy5n3zdywSBUUxxAOhECyQ',
        'content-type': 'application/json',
      },
      body: {
        id: this.hlid,
        instanceId: this.isid,
        permanentLocationId: this.lcid,
        sourceId: 'f32d531e-df79-46b3-8932-cdd35f7a2264',
      }
    })
      .then((resp) => {
        expect(resp.body).property('id');
      })
    cy.request({ // create mt for intem
      method: 'POST',
      url: 'https://folio-snapshot-okapi.dev.folio.org/material-types',
      headers: {
        'x-okapi-tenant': 'diku',
        'x-okapi-token': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkaWt1X2FkbWluIiwidXNlcl9pZCI6IjE2ZjAwNDA0LTM4M2UtNWMyOS1hMjZiLTY4YTFlNGMxMzZjZiIsImlhdCI6MTY0MDA3Nzc4OSwidGVuYW50IjoiZGlrdSJ9.Y3v4sn9jQezuHegnjPTxPOy5n3zdywSBUUxxAOhECyQ',
        'content-type': 'application/json',
      },
      body: {
        id: this.mtid,
        name: 'testing7',
        source: 'local',
      }
    })
      .then((resp) => {
        expect(resp.body).property('id');
      })
    cy.request({
      method: 'POST',
      url: 'https://folio-snapshot-okapi.dev.folio.org/loan-types',
      headers: {
        'x-okapi-tenant': 'diku',
        'x-okapi-token': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkaWt1X2FkbWluIiwidXNlcl9pZCI6IjE2ZjAwNDA0LTM4M2UtNWMyOS1hMjZiLTY4YTFlNGMxMzZjZiIsImlhdCI6MTY0MDA3Nzc4OSwidGVuYW50IjoiZGlrdSJ9.Y3v4sn9jQezuHegnjPTxPOy5n3zdywSBUUxxAOhECyQ',
        'content-type': 'application/json',
      },
      body: {
        id: this.pltid,
        name: 'testing1',
      }
    })
      .then((resp) => {
        expect(resp.body).property('barcode');
      })
    cy.request({ // create item
      method: 'POST',
      url: 'https://folio-snapshot-okapi.dev.folio.org/inventory/items',
      headers: {
        'x-okapi-tenant': 'diku',
        'x-okapi-token': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkaWt1X2FkbWluIiwidXNlcl9pZCI6IjE2ZjAwNDA0LTM4M2UtNWMyOS1hMjZiLTY4YTFlNGMxMzZjZiIsImlhdCI6MTY0MDA3Nzc4OSwidGVuYW50IjoiZGlrdSJ9.Y3v4sn9jQezuHegnjPTxPOy5n3zdywSBUUxxAOhECyQ',
        'content-type': 'application/json',
      },
      body: {
        barcode: '107',
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
      })
  }
};
