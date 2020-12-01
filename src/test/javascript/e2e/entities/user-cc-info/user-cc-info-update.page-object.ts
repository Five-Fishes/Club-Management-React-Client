import { element, by, ElementFinder } from 'protractor';

export default class UserCCInfoUpdatePage {
  pageTitle: ElementFinder = element(by.id('clubmanagementApp.userCCInfo.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  userIdInput: ElementFinder = element(by.css('input#user-cc-info-userId'));
  clubFamilyIdInput: ElementFinder = element(by.css('input#user-cc-info-clubFamilyId'));
  familyRoleSelect: ElementFinder = element(by.css('select#user-cc-info-familyRole'));
  yearSessionInput: ElementFinder = element(by.css('input#user-cc-info-yearSession'));
  clubFamilyNameInput: ElementFinder = element(by.css('input#user-cc-info-clubFamilyName'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setUserIdInput(userId) {
    await this.userIdInput.sendKeys(userId);
  }

  async getUserIdInput() {
    return this.userIdInput.getAttribute('value');
  }

  async setClubFamilyIdInput(clubFamilyId) {
    await this.clubFamilyIdInput.sendKeys(clubFamilyId);
  }

  async getClubFamilyIdInput() {
    return this.clubFamilyIdInput.getAttribute('value');
  }

  async setFamilyRoleSelect(familyRole) {
    await this.familyRoleSelect.sendKeys(familyRole);
  }

  async getFamilyRoleSelect() {
    return this.familyRoleSelect.element(by.css('option:checked')).getText();
  }

  async familyRoleSelectLastOption() {
    await this.familyRoleSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async setYearSessionInput(yearSession) {
    await this.yearSessionInput.sendKeys(yearSession);
  }

  async getYearSessionInput() {
    return this.yearSessionInput.getAttribute('value');
  }

  async setClubFamilyNameInput(clubFamilyName) {
    await this.clubFamilyNameInput.sendKeys(clubFamilyName);
  }

  async getClubFamilyNameInput() {
    return this.clubFamilyNameInput.getAttribute('value');
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }
}
