import { element, by, ElementFinder } from 'protractor';

export default class TransactionUpdatePage {
  pageTitle: ElementFinder = element(by.id('clubmanagementApp.transaction.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  eventIdInput: ElementFinder = element(by.css('input#transaction-eventId'));
  receiptIdInput: ElementFinder = element(by.css('input#transaction-receiptId'));
  typeSelect: ElementFinder = element(by.css('select#transaction-type'));
  amountInput: ElementFinder = element(by.css('input#transaction-amount'));
  detailsInput: ElementFinder = element(by.css('input#transaction-details'));
  receiptUrlInput: ElementFinder = element(by.css('input#transaction-receiptUrl'));
  fileNameInput: ElementFinder = element(by.css('input#transaction-fileName'));
  fileTypeInput: ElementFinder = element(by.css('input#transaction-fileType'));
  createdByInput: ElementFinder = element(by.css('input#transaction-createdBy'));
  createdDateInput: ElementFinder = element(by.css('input#transaction-createdDate'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setEventIdInput(eventId) {
    await this.eventIdInput.sendKeys(eventId);
  }

  async getEventIdInput() {
    return this.eventIdInput.getAttribute('value');
  }

  async setReceiptIdInput(receiptId) {
    await this.receiptIdInput.sendKeys(receiptId);
  }

  async getReceiptIdInput() {
    return this.receiptIdInput.getAttribute('value');
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
  async setAmountInput(amount) {
    await this.amountInput.sendKeys(amount);
  }

  async getAmountInput() {
    return this.amountInput.getAttribute('value');
  }

  async setDetailsInput(details) {
    await this.detailsInput.sendKeys(details);
  }

  async getDetailsInput() {
    return this.detailsInput.getAttribute('value');
  }

  async setReceiptUrlInput(receiptUrl) {
    await this.receiptUrlInput.sendKeys(receiptUrl);
  }

  async getReceiptUrlInput() {
    return this.receiptUrlInput.getAttribute('value');
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

  async setCreatedByInput(createdBy) {
    await this.createdByInput.sendKeys(createdBy);
  }

  async getCreatedByInput() {
    return this.createdByInput.getAttribute('value');
  }

  async setCreatedDateInput(createdDate) {
    await this.createdDateInput.sendKeys(createdDate);
  }

  async getCreatedDateInput() {
    return this.createdDateInput.getAttribute('value');
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
