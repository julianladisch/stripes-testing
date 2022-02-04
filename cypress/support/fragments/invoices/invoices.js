import { Button, TextField, Selection, SelectionList, SearchField, KeyValue, Accordion, Pane, PaneHeader, MultiColumnListCell } from '../../../../interactors';
import Helper from '../finance/financeHelper';


const buttonNew = Button('New');
const saveAndClose = Button('Save & close');
const invoiceCreatedMessage = 'Invoice has been saved';
const invoiceLineCreatedMessage = 'Invoice line has been saved';
const InvoiceApprovedMessage = 'Invoice has been approved successfully';
const InvoicePaidMessage = 'Invoice has been paid successfully';
const success = 'success';
const vendorDetailsAccordionId = 'vendorDetails';
const invoiceLinesAccordionId = 'invoiceLines';
const actionsButton = Button('Actions');

export default {
  createDefaultInvoiceViaUi(invoice, vendorPrimaryAddress) {
    cy.do([
      buttonNew.click(),
      Selection('Status*').open(),
      SelectionList().select(invoice.status),
      TextField('Invoice date*').fillIn(invoice.invoiceDate),
      TextField('Vendor invoice number*').fillIn(invoice.invoiceNumber),
    ]);
    this.selectVendorOnUi(invoice.vendorName);
    cy.do([
      Selection('Accounting code*').open(),
      SelectionList().select(`Default (${invoice.accountingCode})`),
      Selection('Batch group*').open(),
      SelectionList().select(invoice.batchGroup),
    ]);
    this.checkVendorPrimaryAddress(vendorPrimaryAddress);
    cy.do(saveAndClose.click());
    Helper.checkCalloutMessage(invoiceCreatedMessage, success);
  },

  selectVendorOnUi: (organizationName) => {
    cy.do([
      Button({ id: 'vendorId-plugin' }).click(),
      SearchField({ id: 'input-record-search' }).fillIn(organizationName),
      Button('Search').click()
    ]);
    Helper.selectFromResultsList();
  },

  checkVendorPrimaryAddress: (vendorPrimaryAddress) => {
    cy.expect(KeyValue({ value: vendorPrimaryAddress.addressLine1 }).exists());
    cy.expect(KeyValue({ value: vendorPrimaryAddress.addressLine2 }).exists());
    cy.expect(KeyValue({ value: vendorPrimaryAddress.city }).exists());
    cy.expect(KeyValue({ value: vendorPrimaryAddress.zipCode }).exists());
    if (vendorPrimaryAddress.country === 'USA') {
      cy.expect(KeyValue({ value: 'United States' }).exists());
    } else {
      cy.expect(KeyValue({ value: vendorPrimaryAddress.country }).exists());
    }
    cy.expect(KeyValue({ value: vendorPrimaryAddress.language }).exists());
  },

  checkCreatedInvoice(invoice, vendorPrimaryAddress) {
    this.checkVendorPrimaryAddress(vendorPrimaryAddress);
    cy.expect(Pane({ id: 'pane-invoiceDetails' }).exists());
    cy.expect(Accordion({ id: vendorDetailsAccordionId }).find(KeyValue({ value: invoice.invoiceNumber })).exists());
    cy.expect(Accordion({ id: vendorDetailsAccordionId }).find(KeyValue({ value: invoice.vendorName })).exists());
    cy.expect(Accordion({ id: vendorDetailsAccordionId }).find(KeyValue({ value: invoice.accountingCode })).exists());
  },

  deleteInvoiceViaActions() {
    cy.do([
      PaneHeader({ id: 'paneHeaderpane-invoiceDetails' })
        .find(actionsButton).click(),
      Button('Delete').click(),
      Button('Delete', { id:'clickable-delete-invoice-confirmation-confirm' }).click()
    ]);
  },

  createInvoiceLine: (invoiceLine, isFromPol) => {
    cy.do(Accordion({ id: invoiceLinesAccordionId }).find(actionsButton).click());
    if (isFromPol) {
      cy.do(Button('Add line from POL').click());
    } else {
      cy.do(Button('New blank line').click());
    }
    // TODO: update using interactors once we will be able to pass negative value into text field
    cy.xpath('//*[@id="subTotal"]').type(invoiceLine.subTotal);
    cy.do([
      TextField('Description*').fillIn(invoiceLine.description),
      TextField('Quantity*').fillIn(invoiceLine.quantity.toString()),
      saveAndClose.click()
    ]);
    Helper.checkCalloutMessage(invoiceLineCreatedMessage, success);
  },

  checkInvoiceLine: (invoiceLine) => {
    cy.expect(Accordion({ id: invoiceLinesAccordionId }).exists());
    cy.expect(Accordion({ id: invoiceLinesAccordionId }).find(MultiColumnListCell({ content: invoiceLine.description })).exists());
    cy.expect(Accordion({ id: invoiceLinesAccordionId }).find(MultiColumnListCell({ content: invoiceLine.quantity.toString() })).exists());
    cy.expect(Accordion({ id: invoiceLinesAccordionId }).find(MultiColumnListCell({ content: `$${invoiceLine.subTotal.toFixed(2)}` })).exists());
  },

  addFundDistributionToLine: (invoiceLine, fund) => {
    cy.do([
      Accordion({ id: invoiceLinesAccordionId }).find(MultiColumnListCell({ content: invoiceLine.description })).click(),
      actionsButton.click(),
      Button('Edit').click(),
      Button({ id: 'fundDistributions-add-button' }).click(),
      Selection('Fund ID*').open(),
      SelectionList().select((fund.name).concat(' ', '(', fund.code, ')')),
      saveAndClose.click()
    ]);
    Helper.checkCalloutMessage(invoiceLineCreatedMessage, success);
  },

  approveInvoice: () => {
    cy.do([
      PaneHeader({ id: 'paneHeaderpane-invoiceDetails' })
        .find(actionsButton).click(),
      Button('Approve').click(),
      Button('Submit').click()
    ]);
    Helper.checkCalloutMessage(InvoiceApprovedMessage, success);
  },

  searchByNumber: (invoiceNumber) => {
    cy.do([
      SearchField({ id: 'input-record-search' }).selectIndex('Vendor invoice number'),
      SearchField({ id: 'input-record-search' }).fillIn(invoiceNumber),
      Button('Search').click(),
    ]);
  },

  payInvoice: () => {
    cy.do([
      PaneHeader({ id: 'paneHeaderpane-invoiceDetails' })
        .find(actionsButton).click(),
      Button('Pay').click(),
      Button('Submit').click()
    ]);
    Helper.checkCalloutMessage(InvoicePaidMessage, success);
  }
};
