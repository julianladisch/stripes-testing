/// <reference types="cypress" />

import fieldMappingProfiles from '../../support/fragments/data_import/mapping_profiles/fieldMappingProfiles';
import newActionProfile from '../../support/fragments/data_import/action_profiles/newActionProfile';
import newMappingProfile from '../../support/fragments/data_import/mapping_profiles/newMappingProfile';
import actionProfiles from '../../support/fragments/data_import/action_profiles/actionProfiles';
import settingsDataImport from '../../support/fragments/data_import/settingsDataImport';
import newJobProfile from '../../support/fragments/data_import/job_profiles/newJobProfile';
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
        mappingProfile: { typeValue : newMappingProfile.folioRecordTypeValue.instance },
        actionProfile: { typeValue: newActionProfile.folioRecordTypeValue.instance }
      },
      {
        mappingProfile: {
          typeValue : newMappingProfile.folioRecordTypeValue.holdings,
          location: newMappingProfile.permanentLocation.permanentLocation
        },
        actionProfile: { typeValue: newActionProfile.folioRecordTypeValue.holdings }
      },
      {
        mappingProfile: {
          typeValue : newMappingProfile.folioRecordTypeValue.item,
          material: newMappingProfile.materialType.materialType,
          loan: newMappingProfile.permanentLoanType.type,
          status: newMappingProfile.statusField.status
        },
        actionProfile: { typeValue: newActionProfile.folioRecordTypeValue.item }
      }
    ];

    const specialJobProfile = { ...newJobProfile.defaultJobProfile };

    collectionOfProfiles.forEach(profile => {
      profile.mappingProfile.name = `autotest${profile.mappingProfile.typeValue}${getRandomPostfix()}`;
      profile.actionProfile.name = `autotest${profile.actionProfile.typeValue}${getRandomPostfix()}`;

      settingsDataImport.goToMappingProfiles();
      fieldMappingProfiles.createMappingProfile(profile.mappingProfile);
      fieldMappingProfiles.checkMappingProfilePresented(profile.mappingProfile.name);
      settingsDataImport.goToActionProfiles();
      actionProfiles.createActionProfile(profile.actionProfile, profile.mappingProfile);
      actionProfiles.checkActionProfilePresented(profile.actionProfile.name);
    });

    settingsDataImport.goToJobProfiles();
    jobProfiles.openNewJobProfileForm();
    newJobProfile.fillJobProfile(specialJobProfile);
    collectionOfProfiles.forEach(({ actionProfile }) => {
      newJobProfile.linkActionProfile(actionProfile);
    });
    newJobProfile.clickSaveAndCloseButton();
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
      fieldMappingProfiles.deleteFieldMappingProfile(profile.mappingProfile.profileName);
      actionProfiles.deleteActionProfile(profile.actionProfile.profileName);
    });
  });
});
