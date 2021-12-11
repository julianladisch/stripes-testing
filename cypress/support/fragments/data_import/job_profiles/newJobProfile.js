import { TextField, Select, Button, Accordion, HTML, including } from '../../../../../interactors';
import getRandomPostfix from '../../../utils/stringTools';
import ModalSelectActionProfile from './modalSelectActionProfile';

export default class NewJobProfile {
    static acceptedDataType = {
      dataType: 'MARC',
    }

    static #defaultJobProfile = {
      profileName:  `autotestJobProfile${getRandomPostfix()}`,
      acceptedDataType: this.acceptedDataType.dataType,
    }

    static get defaultJobProfile() {
      return this.#defaultJobProfile;
    }

    static fillJobProfile(specialJobProfile = this.#defaultJobProfile) {
      cy.do([
        TextField({ name:'profile.name' }).fillIn(specialJobProfile.profileName),
        Select({ name:'profile.dataType' }).choose(specialJobProfile.acceptedDataType),
      ]);
    }

    static selectActionProfile(specialActionProfile) {
      cy.get('[id="type-selector-dropdown-linker-root"]').click();
      cy.do([
        Button('Action').click(),
      ]);
      ModalSelectActionProfile.searchActionProfileByName(specialActionProfile.name);
      ModalSelectActionProfile.selectActionProfile(specialActionProfile.name);
      cy.expect(Accordion('Overview').find(HTML(including(specialActionProfile.name))).exists());
    }

    static clickSaveAndCloseButton() {
      cy.do(Button('Save as profile & Close').click());
    }
}
