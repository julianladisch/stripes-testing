import { Accordion, Button, RadioButton, Select, TextField } from '../../../../interactors';
import eHoldingsTitles from './eHoldingsTitles';

const publicationTypeAccordion = Accordion({ id:'filter-titles-type' });
const selectionStatusAccordion = Accordion({ id: 'filter-titles-selected' });

const mainSearchOptions = {
  bySubject:'Subject',
  byTitle:'Title',
  byISSNISBN: 'ISSN/ISBN',
  byPublisher: 'Publisher'
};

const mainSearchBy = (searchParameter, searchValue) => {
  cy.do(Select('Select a field to search').choose(searchParameter));
  cy.expect(Select({ value:  searchParameter.toLowerCase() }).exists());
  cy.do(TextField('Enter your search').fillIn(searchValue));
  cy.do(Button('Search').click());
  eHoldingsTitles.waitLoading();
};

export default {
  bySubject: (subjectValue) => {
    mainSearchBy(mainSearchOptions.bySubject, subjectValue);
  },
  byTitle: (titleValue) => {
    mainSearchBy(mainSearchOptions.byTitle, titleValue);
  },
  byPublicationType:(type) => {
    cy.do(publicationTypeAccordion.clickHeader());
    cy.do(publicationTypeAccordion
      .find(RadioButton(type)).click());
    eHoldingsTitles.waitLoading();
  },
  bySelectionStatus:(selectionStatus) => {
    cy.do(selectionStatusAccordion.clickHeader());
    cy.do(selectionStatusAccordion
      .find(RadioButton(selectionStatus)).click());
    eHoldingsTitles.waitLoading();
  }
};
