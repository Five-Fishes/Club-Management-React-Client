import { element, by, ElementFinder } from 'protractor';

export default class DebtUpdatePage {
  pageTitle: ElementFinder = element(by.id('clubmanagementApp.debt.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  receiptIdInput: ElementFinder = element(by.css('input#debt-receiptId'));
  eventAttendeeIdInput: ElementFinder = element(by.css('input#debt-eventAttendeeId'));
  amountInput: ElementFinder = element(by.css('input#debt-amount'));
  statusSelect: ElementFinder = element(by.css('select#debt-status'));
  receiptUrlInput: ElementFinder = element(by.css('input#debt-receiptUrl'));
  fileNameInput: ElementFinder = element(by.css('input#debt-fileName'));
  fileTypeInput: ElementFinder = element(by.css('input#debt-fileType'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setReceiptIdInput(receiptId) {
    await this.receiptIdInput.sendKeys(receiptId);
  }

  async getReceiptIdInput() {
    return this.receiptIdInput.getAttribute('value');
  }

  async setEventAttendeeIdInput(eventAttendeeId) {
    await this.eventAttendeeIdInput.sendKeys(eventAttendeeId);
  }

  async getEventAttendeeIdInput() {
    return this.eventAttendeeIdInput.getAttribute('value');
  }

  async setAmountInput(amount) {
    await this.amountInput.sendKeys(amount);
  }

  async getAmountInput() {
    return this.amountInput.getAttribute('value');
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
