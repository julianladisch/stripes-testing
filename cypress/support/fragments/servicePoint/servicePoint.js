import { cy } from 'date-fns/locale';
import uuid from 'uuid';

export default {
  
  spid:uuid(),//servise point id
  inid:uuid(),//institution id
  cmid:uuid(),//campus id
  lbid:uuid(),//libraries id
  newServicePoint() {
  
  cy.request({
    method: 'POST',
    url: 'https://folio-snapshot-okapi.dev.folio.org/service-points',
       
    headers: {
      'x-okapi-tenant': 'diku',
      'x-okapi-token': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkaWt1X2FkbWluIiwidXNlcl9pZCI6ImRmMjg3NDJmLTFlMWEtNTg2Ni1hZmE5LTczOGM2ZjExOGM5NSIsImlhdCI6MTYzOTY1MDU0NywidGVuYW50IjoiZGlrdSJ9.n9d3QKqmj2zNTj2TLw21O0bZpOgabtnWb76XHbhOI1c',
      'content-type': 'application/json',
    },
    body: {
      code: '78',
      discoveryDisplayName: 'test89797',
      id: this.spid,// id
      name: 'test65487',  
      }  
    })
    .then((resp)=> {
      expect(resp.body).property('id')
    })
  },
  newLocation () {

    cy.request({
      method: 'POST',
      url: 'https://folio-snapshot-okapi.dev.folio.org/location-units/institutions',

      headers: {
        'x-okapi-tenant': 'diku',
        'x-okapi-token': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkaWt1X2FkbWluIiwidXNlcl9pZCI6ImRmMjg3NDJmLTFlMWEtNTg2Ni1hZmE5LTczOGM2ZjExOGM5NSIsImlhdCI6MTYzOTY1MDU0NywidGVuYW50IjoiZGlrdSJ9.n9d3QKqmj2zNTj2TLw21O0bZpOgabtnWb76XHbhOI1c',
        'content-type': 'application/json',
      },
      body: {
        code: '12',
        id: this.uuid,
        name: 'test',
      }
    })
    .then((resp)=> {
      epexted(resp.body).property('id')
    })
  },
  newCapuses () {
    
    cy.request({
      method: 'POST',
      url: 'https://folio-snapshot-okapi.dev.folio.org/location-units/campuses',
      
      headers: {
        'x-okapi-tenant': 'diku',
        'x-okapi-token': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkaWt1X2FkbWluIiwidXNlcl9pZCI6ImRmMjg3NDJmLTFlMWEtNTg2Ni1hZmE5LTczOGM2ZjExOGM5NSIsImlhdCI6MTYzOTY1MDU0NywidGVuYW50IjoiZGlrdSJ9.n9d3QKqmj2zNTj2TLw21O0bZpOgabtnWb76XHbhOI1c',
        'content-type': 'application/json',
      },
      body: {
        code: '12',
        id: this.cmid,
        institutionId: this.inid,
        name: 'test',
      }
    })
    .then((resp) => {
      expected(resp.body).property('id')
    })

  },
  newLibraries () {
    cy.request({
      method: 'POST',
      url: 'https://folio-snapshot-okapi.dev.folio.org/location-units/libraries',

      headers: {
        'x-okapi-tenant': 'diku',
        'x-okapi-token': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkaWt1X2FkbWluIiwidXNlcl9pZCI6ImRmMjg3NDJmLTFlMWEtNTg2Ni1hZmE5LTczOGM2ZjExOGM5NSIsImlhdCI6MTYzOTY1MDU0NywidGVuYW50IjoiZGlrdSJ9.n9d3QKqmj2zNTj2TLw21O0bZpOgabtnWb76XHbhOI1c',
        'content-type': 'application/json',
      },
      body: {
        campusId: this.cmid,
        code: '12',
        id: this.lbid,
        name: 'test',

      }
    })
    .then((resp) => {
      expected(resp.body).property('id')
    })
  }
  // newLocations () {
  //   cy.request({
  //     method: 'POST',
  //     url: 'https://folio-snapshot.dev.folio.org/settings/tenant-settings/location-locations',

  //     headers: {
  //       'x-okapi-tenant': 'diku',
  //       'x-okapi-token': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkaWt1X2FkbWluIiwidXNlcl9pZCI6ImRmMjg3NDJmLTFlMWEtNTg2Ni1hZmE5LTczOGM2ZjExOGM5NSIsImlhdCI6MTYzOTY1MDU0NywidGVuYW50IjoiZGlrdSJ9.n9d3QKqmj2zNTj2TLw21O0bZpOgabtnWb76XHbhOI1c',
  //       'content-type': 'application/json'
  //     },
  //     body: {
           

  //     }
  //   })
  
}
