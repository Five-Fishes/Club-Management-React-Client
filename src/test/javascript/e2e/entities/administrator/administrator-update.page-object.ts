import { element, by, ElementFinder } from 'protractor';

export default class AdministratorUpdatePage {
  pageTitle: ElementFinder = element(by.id('clubmanagementApp.administrator.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  userIdInput: ElementFinder = element(by.css('input#administrator-userId'));
  yearSessionInput: ElementFinder = element(by.css('input#administrator-yearSession'));
  roleSelect: ElementFinder = element(by.css('select#administrator-role'));
  statusSelect: ElementFinder = element(by.css('select#administrator-status'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setUserIdInput(userId) {
    await this.userIdInput.sendKeys(userId);
  }

  async getUserIdInput() {
    return this.userIdInput.getAttribute('value');
  }

  async setYearSessionInput(yearSession) {
    await this.yearSessionInput.sendKeys(yearSession);
  }

  async getYearSessionInput() {
    return this.yearSessionInput.getAttribute('value');
  }

  async setRoleSelect(role) {
    await this.roleSelect.sendKeys(role);
  }

  async getRoleSelect() {
    return this.roleSelect.element(by.css('option:checked')).getText();
  }

  async roleSelectLastOption() {
    await this.roleSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async setStatusSelect(status) {
    await this.statusSelect.sendKeys(status);
  }

  async getStatusSelect() {
    return this.statusSelect.element(by.css('option:checked')).getText();
  }

  async statusSelectLastOption() {
    await this.statusSelect
      .all(by.tagName('option'))
      .last()
      .click();
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
