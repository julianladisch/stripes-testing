
import ServicePoint from '../../support/fragments/servicePoint/servicePoint';
// import NewUser from '../../support/fragments/users/newUser';
// import NewInstanceItem from '../../support/fragments/inventory/newInstanceItem';
import { TextField, MultiColumnList, including, querySelector, Button, Pane, Checkbox, Modal } from '../../../interactors';








// describe('Create New Sevice point, Item, User and Checout item', () => {
//   it('Create Service Point and Item', () => {
//     ServicePoint.servicePoint();
//     ServicePoint.createItem();
//     ServicePoint.newUser();
//     ServicePoint.newCheckOutItem();
//   });
// });

describe('ui-checkin: actions', () => {
  beforeEach('add Service point', () => {
    cy.login(Cypress.env('diku_login'), Cypress.env('diku_password'));
    cy.visit('/users');
  });

  it('Chenge Service point', () => {
    cy.do(TextField({ id: 'input-user-search' }).fillIn('diku_admin'));
    cy.do(Button('Search').click());
    cy.do(MultiColumnList().click({ row: 0, column: 'diku_admin' }));
    cy.do(Pane({ id: 'pane-userdetails' }).find(Button('Actions')).click());
    cy.do(Button({ id: 'clickable-edituser' }).click());
    cy.do(Button({ id: 'accordion-toggle-button-editUserInfo' }).click());
    cy.do(Button({ id: 'accordion-toggle-button-servicePoints' }).click());
    cy.do(Button({ id: 'add-service-point-btn' }).click());
    cy.do(Modal({ id: 'service-points-modal' }).find(Checkbox({ id: 'checkbox-4384' })).click());
  });
});