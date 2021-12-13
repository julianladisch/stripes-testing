import TopMenu from '../../support/fragments/topMenu';
import InventorySearch from '../../support/fragments/inventory/inventorySearch';
import InventoryActions from '../../support/fragments/inventory/inventoryActions';
import FileManager from '../../support/utils/fileManager';


describe('inventory: exports', () => {
  beforeEach('navigates to Inventory', () => {
    cy.login(Cypress.env('diku_login'), Cypress.env('diku_password'));
    cy.visit(TopMenu.inventoryPath);
  });

  it('C9284 verifies export UUIDs instances', () => {
    InventorySearch.byEffectiveLocation();
    InventorySearch.saveUUIDs();

    // TODO: think about move it to separate func
    cy.intercept('/search/instances/ids**')
      .as('getIds');
    cy.wait('@getIds')
      .then((obj) => {
        const expectedUUIDs = InventorySearch.getUUIDsFromRequest(obj);

        // Need time for download file TODO: think about how it can be fixed
        cy.wait(Cypress.env('downloadTimeout'));

        FileManager.findDownloadedFilesByMask('SearchInstanceUUIDs*')
          .then((downloadedFilenames) => {
            const lastDownloadedFilename = FileManager.getLastDownloadedFileName(downloadedFilenames);
            InventoryActions.verifySaveUUIDsFileName(lastDownloadedFilename);

            FileManager.readFile(lastDownloadedFilename)
              .then((actualUUIDs) => {
                InventoryActions.verifySavedUUIDs(actualUUIDs, expectedUUIDs);
              });
          });
      });
  });

  it('C196755 verifies search result counts and selected counts', () => {
    InventorySearch.byEffectiveLocation();
    InventorySearch.selectResultCheckboxes(2);
    InventorySearch.verifySelectedRecords(2);
  });

  it('C9287 verifies export CQL instances', () => {
    InventorySearch.byLanguage();
    InventorySearch.byKeywords();
    InventorySearch.byEffectiveLocation();

    cy.do([
      InventoryActions.open(),
      InventoryActions.options.saveCQLQuery.click()
    ]);

    // Need time for download file TODO: think about how it can be fixed
    cy.wait(Cypress.env('downloadTimeout'));

    FileManager.findDownloadedFilesByMask('SearchInstanceCQLQuery*')
      .then((downloadedFilenames) => {
        const lastDownloadedFilename = FileManager.getLastDownloadedFileName(downloadedFilenames);
        InventoryActions.verifySaveSQLQueryFileName(lastDownloadedFilename);

        FileManager.readFile(lastDownloadedFilename)
          .then((actualCQLQuery) => {
            InventoryActions.verifySaveSQLQuery(actualCQLQuery, '*', 'eng');
          });
      });
  });
});
