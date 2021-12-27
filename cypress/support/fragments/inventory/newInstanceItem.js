import uuid from 'uuid';
import lcid from '../../support/fragments/servicePoint/servicePoint';

export default {
  uuid:uuid(), // id
  inid:uuid(),
  hlind:uuid(),
  itid:uuid(),
  newInstance() {
    cy.request({
      method: 'POST',
      url: 'https://folio-snapshot-okapi.dev.folio.org/inventory/instances',
      headers: {
        'x-okapi-tenant': 'diku',
        'x-okapi-token': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkaWt1X2FkbWluIiwidXNlcl9pZCI6IjcwYWEyMmUxLWYwZTItNWM0Yi1iMjQ1LTUzZDVlNGY2ZDcwZSIsImlhdCI6MTYzOTk4NDM2NywidGVuYW50IjoiZGlrdSJ9.8RbwPSRVBxemQ7xxdIvMQACk32ftAX7Tl__1S6o2Ogs',
        'content-type': 'application/json',
      },
      body: {
        childInstances: [],
        discoverySuppress: false,
        id: this.inid,
        instanceTypeId: 'a2c91e87-6bab-44d6-8adb-1fd02481fc4f', // как указывать определенное ид
        arentInstances: [],
        precedingTitles: [],
        previouslyHeld: false,
        source: 'FOLIO',
        staffSuppress: false,
        succeedingTitles: [],
        title: 'testing789587',
      }
    })
  },
  newHoldings() {
    cy.request({
      method: 'POST',
      url: 'https://folio-snapshot-okapi.dev.folio.org/holdings-storage/holdings',
      headers: {
        'x-okapi-tenant': 'diku',
        'x-okapi-token': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkaWt1X2FkbWluIiwidXNlcl9pZCI6IjcwYWEyMmUxLWYwZTItNWM0Yi1iMjQ1LTUzZDVlNGY2ZDcwZSIsImlhdCI6MTYzOTk4NDM2NywidGVuYW50IjoiZGlrdSJ9.8RbwPSRVBxemQ7xxdIvMQACk32ftAX7Tl__1S6o2Ogs',
        'content-type': 'application/json',
      },
      body: {
        administrativeNotes: [],
        bareHoldingsItems: [],
        effectiveLocationId: 'a3454b39-3862-4bcb-955c-c2008fa0c589',
        electronicAccess: [],
        formerIds: [],
        holdingsItems: [],
        holdingsStatements: [],
        holdingsStatementsForIndexes: [],
        holdingsStatementsForSupplements: [],
        hrid: 'ho00001000019',
        id: this.hlid,
        instanceId: this.inid,
        notes: [],
        permanentLocationId: this.lcid,
        sourceId: 'f32d531e-df79-46b3-8932-cdd35f7a2264',
        statisticalCodeIds: [],
      }
    })
  },
  newItem() {
    cy.request({
      method: 'POST',
      url: 'https://folio-snapshot-okapi.dev.folio.org/inventory/items',
      headers: {
        'x-okapi-tenant': 'diku',
        'x-okapi-token': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkaWt1X2FkbWluIiwidXNlcl9pZCI6IjcwYWEyMmUxLWYwZTItNWM0Yi1iMjQ1LTUzZDVlNGY2ZDcwZSIsImlhdCI6MTYzOTk4NDM2NywidGVuYW50IjoiZGlrdSJ9.8RbwPSRVBxemQ7xxdIvMQACk32ftAX7Tl__1S6o2Ogs',
        'content-type': 'application/json',
      },
      body: {
        administrativeNotes: [],
        barcode: '107',
        circulationNotes: [],
        contributorNames: [],
        discoverySuppress: null,
        effectiveCallNumberComponents: {
          callNumber: null,
          prefix: null,
          suffix: null,
          typeId: null,
        },
        effectiveLocation: {
          id: 'a3454b39-3862-4bcb-955c-c2008fa0c589',
          name: 'test2'
        },
        electronicAccess: [],
        formerIds: [],
        holdingsRecordId: '69723c0b-3e47-413a-8833-d3ef55409cdb',
        hrid: 'it00000000101',
        id: this.itid,
        isBoundWith: false,
        materialType: {
          id: '1a54b431-2e4f-452d-9cae-9cee66c9a892',
          name: 'book'
        },
        notes: [],
        permanentLoanType: {
          id: '2b94c631-fca9-4892-a730-03ee529ffe27',
          name: 'Can circulate'
        },
        title: 'testing',
      }
    })
  }
};