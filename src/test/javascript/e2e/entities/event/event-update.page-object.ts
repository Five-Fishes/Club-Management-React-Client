import { element, by, ElementFinder } from 'protractor';

export default class EventUpdatePage {
  pageTitle: ElementFinder = element(by.id('clubmanagementApp.event.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#event-name'));
  descriptionInput: ElementFinder = element(by.css('textarea#event-description'));
  remarksInput: ElementFinder = element(by.css('input#event-remarks'));
  venueInput: ElementFinder = element(by.css('input#event-venue'));
  startDateInput: ElementFinder = element(by.css('input#event-startDate'));
  endDateInput: ElementFinder = element(by.css('input#event-endDate'));
  feeInput: ElementFinder = element(by.css('input#event-fee'));
  requiredTransportInput: ElementFinder = element(by.css('input#event-requiredTransport'));
  statusSelect: ElementFinder = element(by.css('select#event-status'));
  imageUrlInput: ElementFinder = element(by.css('input#event-imageUrl'));
  fileNameInput: ElementFinder = element(by.css('input#event-fileName'));
  fileTypeInput: ElementFinder = element(by.css('input#event-fileType'));

  getPageTitle() {
    return this.pageTitle;
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

  async setRemarksInput(remarks) {
    await this.remarksInput.sendKeys(remarks);
  }

  async getRemarksInput() {
    return this.remarksInput.getAttribute('value');
  }

  async setVenueInput(venue) {
    await this.venueInput.sendKeys(venue);
  }

  async getVenueInput() {
    return this.venueInput.getAttribute('value');
  }

  async setStartDateInput(startDate) {
    await this.startDateInput.sendKeys(startDate);
  }

  async getStartDateInput() {
    return this.startDateInput.getAttribute('value');
  }

  async setEndDateInput(endDate) {
    await this.endDateInput.sendKeys(endDate);
  }

  async getEndDateInput() {
    return this.endDateInput.getAttribute('value');
  }

  async setFeeInput(fee) {
    await this.feeInput.sendKeys(fee);
  }

  async getFeeInput() {
    return this.feeInput.getAttribute('value');
  }

  getRequiredTransportInput() {
    return this.requiredTransportInput;
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
  async setImageUrlInput(imageUrl) {
    await this.imageUrlInput.sendKeys(imageUrl);
  }

  async getImageUrlInput() {
    return this.imageUrlInput.getAttribute('value');
  }

  async setFileNameInput(fileName) {
    await this.fileNameInput.sendKeys(fileName);
  }

  async getFileNameInput() {
    return this.fileNameInput.getAttribute('value');
  }

  async setFileTypeInput(fileType) {
    await this.fileTypeInput.sendKeys(fileType);
  }

  async getFileTypeInput() {
    return this.fileTypeInput.getAttribute('value');
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
