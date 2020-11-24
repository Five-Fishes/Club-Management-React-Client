import { element, by, ElementFinder } from 'protractor';

export default class ClubFamilyUpdatePage {
  pageTitle: ElementFinder = element(by.id('clubmanagementApp.clubFamily.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#club-family-name'));
  sloganInput: ElementFinder = element(by.css('textarea#club-family-slogan'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  async setSloganInput(slogan) {
    await this.sloganInput.sendKeys(slogan);
  }

  async getSloganInput() {
    return this.sloganInput.getAttribute('value');
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
