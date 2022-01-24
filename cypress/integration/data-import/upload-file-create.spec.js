/// <reference types="cypress" />

import FieldMappingProfiles from '../../support/fragments/data_import/mapping_profiles/fieldMappingProfiles';
import NewActionProfile from '../../support/fragments/data_import/action_profiles/newActionProfile';
import NewMappingProfile from '../../support/fragments/data_import/mapping_profiles/newMappingProfile';
import ActionProfiles from '../../support/fragments/data_import/action_profiles/actionProfiles';
import SettingsDataImport from '../../support/fragments/data_import/settingsDataImport';
import NewJobProfile from '../../support/fragments/data_import/job_profiles/newJobProfile';
import getRandomPostfix from '../../support/utils/stringTools';
import dataImport from '../../support/fragments/data_import/dataImport';
import logs from '../../support/fragments/data_import/logs';
import jobProfiles from '../../support/fragments/data_import/job_profiles/jobProfiles';
import testTypes from '../../support/dictionary/testTypes';

describe('ui-data-import: MARC file import with creating of the new instance, holding and item', () => {
  // unique file name to upload
  const fileName = `autotestFile.${getRandomPostfix()}.mrc`;

  before('navigates to Settings', () => {
    cy.login(
      Cypress.env('diku_login'),
      Cypress.env('diku_password')
    );
  });

  it('C343334 MARC file import with creating a new mapping profiles, action profiles and job profile', { tags: [testTypes.smoke] }, () => {
    const collectionOfProfiles = [
      {
        mappingProfile: { typeValue : NewMappingProfile.folioRecordTypeValue.instance },
        actionProfile: { typeValue: NewActionProfile.folioRecordTypeValue.instance }
      },
      {
        mappingProfile: {
          typeValue : NewMappingProfile.folioRecordTypeValue.holdings,
          location: NewMappingProfile.permanentLocation.permanentLocation
        },
        actionProfile: { typeValue: NewActionProfile.folioRecordTypeValue.holdings }
      },
      {
        mappingProfile: {
          typeValue : NewMappingProfile.folioRecordTypeValue.item,
          material: NewMappingProfile.materialType.materialType,
          loan: NewMappingProfile.permanentLoanType.type,
          status: NewMappingProfile.statusField.status
        },
        actionProfile: { typeValue: NewActionProfile.folioRecordTypeValue.item }
      }
    ];

    const specialJobProfile = { ...NewJobProfile.defaultJobProfile };

    collectionOfProfiles.forEach(profile => {
      profile.mappingProfile.name = `autotest${profile.mappingProfile.typeValue}${getRandomPostfix()}`;
      profile.actionProfile.name = `autotest${profile.actionProfile.typeValue}${getRandomPostfix()}`;

      SettingsDataImport.goToMappingProfile();
      FieldMappingProfiles.createMappingProfile(profile.mappingProfile);
      FieldMappingProfiles.checkMappingProfilePresented(profile.mappingProfile.name);
      SettingsDataImport.goToActionProfile();
      ActionProfiles.createActionProfile(profile.actionProfile, profile.mappingProfile);
      ActionProfiles.checkActionProfilePresented(profile.actionProfile.name);
    });

    SettingsDataImport.goToJobProfile();
    jobProfiles.openNewJobProfileForm();
    NewJobProfile.fillJobProfile(specialJobProfile);
    collectionOfProfiles.forEach(({ actionProfile }) => {
      NewJobProfile.linkActionProfile(actionProfile);
    });
    NewJobProfile.clickSaveAndCloseButton();
    jobProfiles.waitLoadingList();
    jobProfiles.checkJobProfilePresented(specialJobProfile.profileName);

    dataImport.goToDataImport();
    dataImport.uploadFile(fileName);
    jobProfiles.searchJobProfileForImport(specialJobProfile.profileName);
    jobProfiles.runImportFile(fileName);
    logs.checkImportFile(specialJobProfile.profileName);
    logs.checkStatusOfJobProfile();
    logs.openJobProfile(fileName);
    logs.checkCreatedItems();

    // delete generated profiles
    jobProfiles.deleteJobProfile(specialJobProfile.profileName);
    collectionOfProfiles.forEach(profile => {
      FieldMappingProfiles.deleteFieldMappingProfile(profile.mappingProfile.profileName);
      ActionProfiles.deleteActionProfile(profile.actionProfile.profileName);
    });
  });
});
