import { Button } from '../../../../interactors';

export default class CreateMappingProfile{
    
    static #actionsButton = Button('Actions');

    static clickActionButton() {
        //cy.get('[class="paneHeaderButtonsArea---kidF+ last---Va9aW"]').do(this.#actionsButton.click());
        cy.get('[class="paneHeaderButtonsArea---kidF+ last---Va9aW"]')
        .contains('Actions')
        .click();
    }

    static createNewMappingProfile(){
        cy.get('[class="DropdownMenu---x9lIp"]').contains('New field mapping profile').click();
    }
}
