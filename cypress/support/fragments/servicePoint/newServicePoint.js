
import getRandomPostfix from '../../utils/stringTools';
import { Button, TextField } from '../../../../interactors';
import uuid from 'uuid';
import { cy } from 'date-fns/locale';

cy.request ({
  method: 'POST',
  url: 'https://folio-snapshot-okapi.dev.folio.org/service-points',
 
  headers: {
    'x-okapi-tenant': 'diku',
    'x-okapi-token': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkaWt1X2FkbWluIiwidXNlcl9pZCI6ImE2ZmVjYWMzLWQ1ZWQtNTU1NS1hNmU3LTJjODk5N2I2YjU2NSIsImlhdCI6MTYzOTU2MTQwMCwidGVuYW50IjoiZGlrdSJ9.hhhQGnan1_aaKmPXOvReA-aiWjLeKabbBun37tpOMuI',
    'content-type': 'application/json',
   },
  body: {
    code: '98765432',
    discoveryDisplayName: 'testing-13',
    id: uuid(),// id
    name: 'testing-13',  
   }  
})
.then((resp)=> {
   expect(resp.body).property('id')
  });

cy.request ({
  method: 'POST',
  url: 'https://folio-snapshot-okapi.dev.folio.org/location-units/institutions',

  headers: {
    'x-okapi-tenant': 'diku',
    'x-okapi-token': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkaWt1X2FkbWluIiwidXNlcl9pZCI6ImE2ZmVjYWMzLWQ1ZWQtNTU1NS1hNmU3LTJjODk5N2I2YjU2NSIsImlhdCI6MTYzOTU2MTQwMCwidGVuYW50IjoiZGlrdSJ9.hhhQGnan1_aaKmPXOvReA-aiWjLeKabbBun37tpOMuI',
    'content-type': 'application/json',
  },
  body: {
    code: '125',
    id: uuid(),
    name: 'retesting',
  }
}).then((resp) => {
  expect(resp.body).property('id')
})
