import {
  MultiColumnList,
  HTML,
  including,
  Button,
  Section,
  QuickMarcEditor,
  KeyValue,
  MultiColumnListHeader,
  MultiColumnListCell,
  Accordion,
  Modal,
  Dropdown,
  Checkbox, MultiColumnListRow,
} from '../../../../interactors';
import InventoryActions from './inventoryActions';
import InventoryInstanceEdit from './InventoryInstanceEdit';
import HoldingsRecordView from './holdingsRecordView';
import InventoryViewSource from './inventoryViewSource';
import NewHoldingsRecord from './newHoldingsRecord';

const _section = Section({ id: 'pane-instancedetails' });
const actionsButton = _section.find(Button('Actions'));
const identifiers = MultiColumnList({ id:'list-identifiers' });
const editMARCBibRecordButton = Button({ id:'edit-instance-marc' });
const editInstanceButton = Button({ id:'edit-instance' });
const viewSourceButton = Button({ id:'clickable-view-source' });
const overlaySourceBibRecord = Button({ id:'dropdown-clickable-reimport-record' });
const deriveNewMarcBibRecord = Button({ id:'duplicate-instance-marc' });
const addMarcHoldingRecordButton = Button({ id:'create-holdings-marc' });
const viewHoldingsButton = Button('View holdings');
const notesSection = Section({ id: 'instance-details-notes' });
const moveItemsButton = Button({ id: 'move-instance-items' });


const instanceHRID = 'Instance HRID';
const validOCLC = { id:'176116217',
  // TODO: hardcoded count related with interactors getters issue. Redesign to cy.then(QuickMarkEditor().rowsCount()).then(rowsCount => {...}
  lastRowNumber: 31,
  // it should be presented in marc bib one time to correct work(applicable in update of record)
  existingTag: '100' };

const pressAddHoldingsButton = () => {
  cy.do(Button({ id:'clickable-new-holdings-record' }).click());
  NewHoldingsRecord.waitLoading();
};
const waitLoading = () => cy.expect(actionsButton.exists());

export default {
  validOCLC,
  pressAddHoldingsButton,
  waitLoading,
  checkExpectedOCLCPresence: (OCLCNumber = validOCLC.id) => {
    cy.expect(identifiers.find(HTML(including(OCLCNumber))).exists());
  },

  checkExpectedMARCSource: () => {
    cy.expect(_section.find(HTML(including('MARC'))).exists());
    cy.expect(_section.find(HTML(including('FOLIO'))).absent());
  },

  goToEditMARCBiblRecord:() => {
    cy.do(actionsButton.click());
    cy.do(editMARCBibRecordButton.click());
  },

  viewSource: () => {
    cy.do(actionsButton.click());
    cy.do(viewSourceButton.click());
    InventoryViewSource.waitLoading();
  },
  overlaySourceBibRecord:(specialOCLCWorldCatidentifier = validOCLC.id) => {
    cy.do(actionsButton.click());
    cy.do(overlaySourceBibRecord.click());
    InventoryActions.fillImportFields(specialOCLCWorldCatidentifier);
    const startTime = Date.now();
    InventoryActions.pressImportInModal();
    return startTime;
  },
  editInstance:() => {
    cy.do(actionsButton.click());
    cy.do(editInstanceButton.click());
    InventoryInstanceEdit.waitLoading();
  },
  checkInstanceNotes:(noteType, noteContent) => {
    cy.expect(Button({ id: 'accordion-toggle-button-instance-details-notes' }).exists());
    cy.expect(notesSection.find(MultiColumnListHeader(noteType)).exists());
    cy.expect(notesSection.find(MultiColumnListCell(noteContent)).exists());
  },

  deriveNewMarcBib:() => {
    cy.do(actionsButton.click());
    cy.do(deriveNewMarcBibRecord.click());
    cy.expect(QuickMarcEditor().exists());
  },

  getAssignedHRID:() => {
    return cy.then(() => KeyValue(instanceHRID).value());
  },

  checkUpdatedHRID: (oldHRID) => {
    cy.expect(KeyValue(instanceHRID, { value: oldHRID }).absent());
  },

  checkPresentedText: (expectedText) => {
    cy.expect(_section.find(HTML(including(expectedText))).exists());
  },

  runMarcHoldingRecordAdding:() => {
    cy.do(actionsButton.click());
    cy.do(addMarcHoldingRecordButton.click());
  },

  goToHoldingView: () => {
    cy.do(viewHoldingsButton.click());
    HoldingsRecordView.waitLoading();
  },
  createHoldingsRecord:() => {
    pressAddHoldingsButton();
    NewHoldingsRecord.fillRequiredFields();
    NewHoldingsRecord.saveAndClose();
    waitLoading();
  },

  checkHoldingsTable: (locationName, rowNumber, caption, barcode, status) => {
    const accordionHeader = `Holdings: ${locationName} >`;
    const indexRowumber = `row-${rowNumber}`;
    // wait for data to be loaded
    cy.intercept(
      {
        method: 'GET',
        url: '/inventory/items?*',
      }
    ).as('getItems');
    cy.wait('@getItems');
    cy.do([
      Accordion(accordionHeader).clickHeader(),
    ]);

    cy.expect(Accordion(accordionHeader)
      .find(MultiColumnListRow({ indexRow: indexRowumber }))
      .find(MultiColumnListCell({ content: barcode })).exists());
    // TODO: uncomment once MODORDERS-569 will be implemented
    // cy.expect(Accordion(accordionHeader)
    //   .find(MultiColumnListRow({ rowNumber }))
    //   .find(MultiColumnListCell({ content: caption })).exists());
    cy.expect(Accordion(accordionHeader)
      .find(MultiColumnListRow({ indexRow: indexRowumber }))
      .find(MultiColumnListCell({ content: status })).exists());
  },

  openHoldings(holdingToBeOpened) {
    const openActions = [];
    for (let i = 0; i < holdingToBeOpened.length; i++) {
      openActions.push(Accordion({ label: including(`Holdings: ${holdingToBeOpened[i]}`) }).clickHeader());
    }
    return cy.do(openActions);
  },

  moveItemToAnotherHolding(firstHoldingName, secondHoldingName) {
    this.openHoldings([firstHoldingName, secondHoldingName]);

    cy.do([
      Accordion({ label: including(`Holdings: ${firstHoldingName}`) }).find(MultiColumnListRow()).find(Checkbox()).click(),
      Accordion({ label: including(`Holdings: ${firstHoldingName}`) }).find(Dropdown({ label: 'Move to' })).choose(including(secondHoldingName)),
    ]);
  },

  returnItemToFirstHolding(firstHoldingName, secondHoldingName) {
    this.openHoldings([firstHoldingName, secondHoldingName]);

    cy.do([
      Accordion({ label: including(`Holdings: ${secondHoldingName}`) }).find(MultiColumnListRow()).find(Checkbox()).click(),
      Accordion({ label: including(`Holdings: ${secondHoldingName}`) }).find(Dropdown({ label: 'Move to' })).choose(including(firstHoldingName)),
      Modal().find(Button('Continue')).click()
    ]);
  },

  openMoveItemsWithinAnInstance: () => {
    return cy.do([
      actionsButton.click(),
      moveItemsButton.click()
    ]);
  }
};
