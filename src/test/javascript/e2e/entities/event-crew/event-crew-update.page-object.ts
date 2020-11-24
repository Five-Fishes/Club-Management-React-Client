import { element, by, ElementFinder } from 'protractor';

export default class EventCrewUpdatePage {
  pageTitle: ElementFinder = element(by.id('clubmanagementApp.eventCrew.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  userIdInput: ElementFinder = element(by.css('input#event-crew-userId'));
  eventIdInput: ElementFinder = element(by.css('input#event-crew-eventId'));
  roleSelect: ElementFinder = element(by.css('select#event-crew-role'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setUserIdInput(userId) {
    await this.userIdInput.sendKeys(userId);
  }

  async getUserIdInput() {
    return this.userIdInput.getAttribute('value');
  }

  async setEventIdInput(eventId) {
    await this.eventIdInput.sendKeys(eventId);
  }

  async getEventIdInput() {
    return this.eventIdInput.getAttribute('value');
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
