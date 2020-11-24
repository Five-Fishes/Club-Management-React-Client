import { element, by, ElementFinder } from 'protractor';

export default class EventChecklistUpdatePage {
  pageTitle: ElementFinder = element(by.id('clubmanagementApp.eventChecklist.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  eventIdInput: ElementFinder = element(by.css('input#event-checklist-eventId'));
  nameInput: ElementFinder = element(by.css('input#event-checklist-name'));
  descriptionInput: ElementFinder = element(by.css('textarea#event-checklist-description'));
  statusSelect: ElementFinder = element(by.css('select#event-checklist-status'));
  typeSelect: ElementFinder = element(by.css('select#event-checklist-type'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setEventIdInput(eventId) {
    await this.eventIdInput.sendKeys(eventId);
  }

  async getEventIdInput() {
    return this.eventIdInput.getAttribute('value');
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
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
  async setTypeSelect(type) {
    await this.typeSelect.sendKeys(type);
  }

  async getTypeSelect() {
    return this.typeSelect.element(by.css('option:checked')).getText();
  }

  async typeSelectLastOption() {
    await this.typeSelect
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
