import { Button, Select, TextField } from '../../../../interactors';


// const importButtonInActions = Button({ id: 'dropdown-clickable-import-record' });
// const importButtonInModal = Button('Import');
// const OCLWorldCatIdentifierTextField = TextField('Enter OCLC WorldCat identifier');
// const importTypeSelect = Select({ name :'externalIdentifierType' });

export default {
//  
  open: () => { return Button('Enter').click(); },
  options: {
    loanDetails: Button('Loan details'),
    patronDetails: Button('Patron Details'),
    itemDetails: Button('Item Details'),
    newFee: Button('New Fee / Fine'),
  },  
}
// static openLoanDetails() {
//     cy.do([
//       Button('Actions').click(),
//       Button('Loan Details').click()
//     ]);
// }