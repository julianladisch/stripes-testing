import uuid from 'uuid';
import {
  Button,
  TextField,
  Selection,
  SelectionList,
  Accordion,
  Modal,
  Checkbox,
  MultiSelect,
  SearchField,
  Section,
  HTML,
  including,
  KeyValue,
  Pane,
  MultiColumnListRow,
  MultiColumnListCell
} from '../../../../../interactors';
import { statusActive, statusInactive, statusFrozen } from '../financeHelper';
import TopMenu from '../../topMenu';
import getRandomPostfix from '../../../utils/stringTools';
import Describer from '../../../utils/describer';

const createdFundNameXpath = '//*[@id="paneHeaderpane-fund-details-pane-title"]/h2/span';
const numberOfSearchResultsHeader = '//*[@id="paneHeaderfund-results-pane-subtitle"]/span';
const zeroResultsFoundText = '0 records found';
const budgetTitleXpath = '//*[@id="paneHeaderpane-budget-pane-title"]/h2/span';
const noItemsMessage = 'The list contains no items';
const viewTransactionsLinkXpath = '//a[text()="View transactions"]';
const budgetPaneId = 'pane-budget';
const transactionResultPaneId = 'transaction-results-pane';
const actionsButtonName = 'Actions';


export default {
  waitForFundDetailsLoading : () => {
    cy.do(Section({ id: 'pane-fund-details' }).visible());
  },

  createFund(fund) {
    cy.do([
      Button('New').click(),
      TextField('Name*').fillIn(fund.name),
      TextField('Code*').fillIn(fund.code),
      TextField('External account*').fillIn(fund.externalAccount),
      Selection('Ledger*').open(),
      SelectionList().select(fund.ledgerName),
      Button('Save & Close').click()
    ]);
    this.waitForFundDetailsLoading();
  },

  checkCreatedFund: (fundName) => {
    cy.xpath(createdFundNameXpath)
      .should('be.visible')
      .and('have.text', fundName);
  },

  tryToCreateFundWithoutMandatoryFields: (fundName) => {
    cy.do([
      Button('New').click(),
      TextField('Name*').fillIn(fundName),
      Button('Save & Close').click(),
      TextField('Code*').fillIn('some code'),
      Button('Save & Close').click(),
      TextField('External account*').fillIn('some account'),
      Button('Save & Close').click(),
      // try to navigate without saving
      Button('Agreements').click(),
      Button('Keep editing').click,
      Button('Cancel').click(),
      Button('Close without saving').click()
    ]);
  },

  checkZeroSearchResultsHeader: () => {
    cy.xpath(numberOfSearchResultsHeader)
      .should('be.visible')
      .and('have.text', zeroResultsFoundText);
  },

  deleteFundViaActions: () => {
    cy.do([
      cy.expect(Button(actionsButtonName).exists()),
      Button(actionsButtonName).click(),
      Button('Delete').click(),
      Button('Delete', { id:'clickable-fund-remove-confirmation-confirm' }).click()
    ]);
  },

  addBudget: (allocatedQuantity) => {
    cy.do(Accordion('Current budget').find(Button('New')).click());
    cy.expect(Modal('Current budget').exists());
    cy.do([
      Modal('Current budget').find(TextField({ name: 'allocated' })).fillIn(allocatedQuantity.toString()),
      Button('Save').click()
    ]);
  },

  checkCreatedBudget: (fundCode, fiscalYear) => {
    cy.expect(Accordion('Budget summary').exists());
    cy.expect(Accordion('Budget information').exists());
    cy.xpath(budgetTitleXpath)
      .should('be.visible')
      .and('have.text', fundCode.concat('-', fiscalYear));
  },

  checkBudgetQuantity: (quantityValue) => {
    // TODO: refactor using interactors (Mutli column list)
    cy.expect(Section({ id: budgetPaneId }).find(HTML(including('Cash balance: $' + quantityValue.toFixed(2)))).exists());
    cy.expect(Section({ id: budgetPaneId }).find(HTML(including('Available balance: $' + quantityValue.toFixed(2)))).exists());
  },

  openTransactions: () => {
    cy.expect(Section({ id: 'information' }).find(KeyValue('Transactions')).exists());
    // TODO: refactor via using interactors. Simple click() doesn't work, need to find a way to work with child
    cy.xpath(viewTransactionsLinkXpath).click();
  },

  checkTransaction: (rowNumber, transaction) => {
    Describer.getProperties(transaction)
      .forEach(function (val) {
        cy.expect(Pane({ id: transactionResultPaneId })
          .find(MultiColumnListRow({ index: rowNumber }))
          .find(MultiColumnListCell({ content: transaction[val] })).exists());
      });
  },

  transferAmount: (amount, fundFrom, fundTo) => {
    cy.do([
      Button(actionsButtonName).click(),
      Button('Transfer').click()
    ]);
    cy.expect(Modal('Transfer').exists());
    cy.do([
      TextField('Amount*').fillIn(amount.toString()),
      Selection('From').open(),
      SelectionList().select((fundFrom.name).concat(' ', '(', fundFrom.code, ')')),
      Selection('To').open(),
      SelectionList().select((fundTo.name).concat(' ', '(', fundTo.code, ')')),
      Button('Confirm').click()
    ]);
  },

  deleteBudgetViaActions() {
    cy.do([
      Button(actionsButtonName).click(),
      Button('Delete').click(),
      Button('Delete', { id:'clickable-budget-remove-confirmation-confirm' }).click()
    ]);
    this.waitForFundDetailsLoading();
  },

  tryToDeleteBudgetWithTransaction() {
    cy.do([
      Button(actionsButtonName).click(),
      Button('Delete').click(),
      Button('Delete', { id:'clickable-budget-remove-confirmation-confirm' }).click()
    ]);
    cy.expect(Section({ id: 'summary' }).exists());
  },

  checkDeletedBudget: (budgetSectionId) => {
    cy.expect(
      Section({ id: budgetSectionId }).find(HTML(including(noItemsMessage))).exists()
    );
  },

  resetFundFilters: () => {
    cy.do([
      Button({ id: 'reset-funds-filters' }).click(),
    ]);
  },

  selectStatusInSearch: (fundStatus) => {
    cy.do(Accordion({ id: 'fundStatus' }).clickHeader());
    switch (fundStatus) {
      case statusFrozen:
        cy.do(Checkbox({ id: 'clickable-filter-fundStatus-frozen' }).click());
        break;
      case statusActive:
        cy.do(Checkbox({ id: 'clickable-filter-fundStatus-active' }).click());
        break;
      case statusInactive:
        cy.do(Checkbox({ id: 'clickable-filter-fundStatus-inactive' }).click());
        break;
      default:
        cy.log('No such status like ' + fundStatus + '. Please use frozen, active or inactive');
    }
  },

  checkFundFilters(ledgerName, fundType, fundStatus, aUnits, tags, groupName, fundName) {
    // TODO: check how it can be achieved with interactors
    cy.xpath('//*[@id="accordion-toggle-button-fundStatus"]').should('be.visible');
    this.selectStatusInSearch(fundStatus);
    // TODO: check how it can be achieved with interactors
    cy.xpath('//*[@id="accordion-toggle-button-ledgerId"]').should('be.visible');
    cy.do([
      Accordion({ id: 'ledgerId' }).clickHeader(),
      Selection({ id: 'ledgerId-selection' }).open(),
      SelectionList({ id: 'sl-container-ledgerId-selection' }).select(ledgerName),

      Accordion({ id: 'fundTypeId' }).clickHeader(),
      Selection({ id: 'fundTypeId-selection' }).open(),
      SelectionList({ id: 'sl-container-fundTypeId-selection' }).select(fundType),

      Accordion({ id: 'groupFundFY.groupId' }).clickHeader(),
      Selection({ id: 'groupFundFY.groupId-selection' }).open(),
      SelectionList({ id: 'sl-container-groupFundFY.groupId-selection' }).select(groupName),

      Accordion({ id: 'acqUnitIds' }).clickHeader(),
      Selection({ id: 'acqUnitIds-selection' }).open(),
      SelectionList({ id: 'sl-container-acqUnitIds-selection' }).select(aUnits),

      Accordion({ id: 'tags' }).clickHeader(),
      MultiSelect({ id: 'acq-tags-filter' }).select(tags),

      SearchField({ id: 'input-record-search' }).fillIn(fundName),
      Button('Search').click(),
    ]);
  },

  createFundViaUI(fund) {
    const ledger = {
      id: uuid(),
      name: `autotest_ledger_${getRandomPostfix()}`,
      code: `autotest_code_${getRandomPostfix()}`,
      description: `autotest_ledger_ description_${getRandomPostfix()}`,
      ledgerStatus: 'Frozen',
      currency: 'USD',
      restrictEncumbrance: false,
      restrictExpenditures: false,
      acqUnitIds: '',
      fiscalYearOneId: ''
    };
    cy.getToken(Cypress.env('diku_login'), Cypress.env('diku_password'));
    cy.getAcqUnitsApi({ limit: 1 })
      .then(
        ({ body }) => {
          ledger.acqUnitIds = [body.acquisitionsUnits[0].id];
          cy.getFiscalYearsApi({ limit: 1 })
            .then((response) => {
              ledger.fiscalYearOneId = response.body.fiscalYears[0].id;
              cy.createLedgerApi({
                ...ledger
              });
              fund.ledgerName = ledger.name;
              cy.login(Cypress.env('diku_login'), Cypress.env('diku_password'));
              cy.visit(TopMenu.fundPath);
              this.createFund(fund);
              this.checkCreatedFund(fund.name);
              cy.wrap(ledger).as('createdLedger');
              return cy.get('@createdLedger');
            });
        }
      );
    return cy.get('@createdLedger');
  },

  openBudgetDetails: (fundCode, fiscalYear) => {
    cy.do([
      Accordion({ id: 'currentBudget' }).find(MultiColumnListCell({ content: fundCode.concat('-', fiscalYear) })).click()
    ]);
  }
};
