import { element, by, ElementFinder } from 'protractor';

export default class EventAttendeeUpdatePage {
  pageTitle: ElementFinder = element(by.id('clubmanagementApp.eventAttendee.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  userIdInput: ElementFinder = element(by.css('input#event-attendee-userId'));
  eventIdInput: ElementFinder = element(by.css('input#event-attendee-eventId'));
  provideTransportInput: ElementFinder = element(by.css('input#event-attendee-provideTransport'));

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

  getProvideTransportInput() {
    return this.provideTransportInput;
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
