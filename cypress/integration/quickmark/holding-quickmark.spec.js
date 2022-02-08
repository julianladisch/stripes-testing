/// <reference types="cypress" />

import TopMenu from '../../support/fragments/topMenu';
import InventoryActions from '../../support/fragments/inventory/inventoryActions';
import InventoryInstance from '../../support/fragments/inventory/inventoryInstance';
import HoldingsRecordView from '../../support/fragments/inventory/holdingsRecordView';
import QuickMarcEditor from '../../support/fragments/quickMarcEditor';
import InventoryViewSource from '../../support/fragments/inventory/inventoryViewSource';
import testTypes from '../../support/dictionary/testTypes';
import features from '../../support/dictionary/features';
import { Button } from '../../../interactors';

describe('Manage holding records through quickmarc editor', () => {
  beforeEach(() => {
    cy.login(Cypress.env('diku_login'), Cypress.env('diku_password'));
    cy.visit(TopMenu.inventoryPath);
    // TODO: redesign to api step
    InventoryActions.import();
    // TODO: redesign to api step
    InventoryInstance.addMarcHoldingRecord();
    HoldingsRecordView.gotoEditInQuickMarc();
  });
  it('C345390 Add a field to a record using quickMARC', { tags: [testTypes.smoke, features.quickMarcEditor] }, () => {
    // TODO: redesign to dynamic reading of rows count
    QuickMarcEditor.addRow(HoldingsRecordView.newHolding.rowsCountInQuickMarcEditor);
    QuickMarcEditor.checkInitialContent(HoldingsRecordView.newHolding.rowsCountInQuickMarcEditor + 1);
    const expectedInSourceRow = QuickMarcEditor.fillAllAvailableValues(undefined, undefined, HoldingsRecordView.newHolding.rowsCountInQuickMarcEditor);
    QuickMarcEditor.pressSaveAndClose();
    HoldingsRecordView.waitLoading();

    HoldingsRecordView.viewSource();
    InventoryViewSource.contains(expectedInSourceRow);
  });

  it('C345398 Add/Edit MARC 008', { tags: [testTypes.smoke, features.quickMarcEditor] }, () => {
    QuickMarcEditor.checkInitial008TagValueFromHoldingsRecord();
    QuickMarcEditor.checkNotExpectedByteLabelsInHoldingsRecordTag008();

    const changed008TagValue = QuickMarcEditor.updateAllDefaultValuesIn008Tag();
    HoldingsRecordView.viewSource();
    InventoryViewSource.contains(changed008TagValue);
    InventoryViewSource.close();
    HoldingsRecordView.gotoEditInQuickMarc();

    const cleared008TagValue = QuickMarcEditor.clearTag008();
    HoldingsRecordView.viewSource();
    InventoryViewSource.contains(cleared008TagValue);
    InventoryViewSource.close();
    HoldingsRecordView.gotoEditInQuickMarc();
    QuickMarcEditor.checkReplacedVoidValuesInTag008();
  });

  it.only('C345400 Attempt to save a record without a MARC 852', { tags: [testTypes.smoke, features.quickMarcEditor] }, () => {
    QuickMarcEditor.getRegularTagContent('852')
      .then(initialTagContent => {
        cy.log(initialTagContent);
        QuickMarcEditor.deleteTag('852');
        QuickMarcEditor.pressSaveAndClose();
        QuickMarcEditor.confirmDelete();
        cy.expect(Button('asd').exists());
      });


    // HoldingsRecordView.viewSource();
    // InventoryViewSource.contains(changed008TagValue);
    // InventoryViewSource.close();
    // HoldingsRecordView.gotoEditInQuickMarc();

    // const cleared008TagValue = QuickMarcEditor.clearTag008();
    // HoldingsRecordView.viewSource();
    // InventoryViewSource.contains(cleared008TagValue);
    // InventoryViewSource.close();
    // HoldingsRecordView.gotoEditInQuickMarc();
    // QuickMarcEditor.checkReplacedVoidValuesInTag008();
  });
});
