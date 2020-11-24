import { element, by, ElementFinder } from 'protractor';

export default class EventActivityUpdatePage {
  pageTitle: ElementFinder = element(by.id('clubmanagementApp.eventActivity.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  eventIdInput: ElementFinder = element(by.css('input#event-activity-eventId'));
  startDateInput: ElementFinder = element(by.css('input#event-activity-startDate'));
  durationInDayInput: ElementFinder = element(by.css('input#event-activity-durationInDay'));
  nameInput: ElementFinder = element(by.css('input#event-activity-name'));
  descriptionInput: ElementFinder = element(by.css('textarea#event-activity-description'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setEventIdInput(eventId) {
    await this.eventIdInput.sendKeys(eventId);
  }

  async getEventIdInput() {
    return this.eventIdInput.getAttribute('value');
  }

  async setStartDateInput(startDate) {
    await this.startDateInput.sendKeys(startDate);
  }

  async getStartDateInput() {
    return this.startDateInput.getAttribute('value');
  }

  async setDurationInDayInput(durationInDay) {
    await this.durationInDayInput.sendKeys(durationInDay);
  }

  async getDurationInDayInput() {
    return this.durationInDayInput.getAttribute('value');
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
