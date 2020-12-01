import { element, by, ElementFinder } from 'protractor';

export default class ClaimUpdatePage {
  pageTitle: ElementFinder = element(by.id('clubmanagementApp.claim.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  receiptIdInput: ElementFinder = element(by.css('input#claim-receiptId'));
  transactionIdInput: ElementFinder = element(by.css('input#claim-transactionId'));
  amountInput: ElementFinder = element(by.css('input#claim-amount'));
  statusSelect: ElementFinder = element(by.css('select#claim-status'));
  receiptUrlInput: ElementFinder = element(by.css('input#claim-receiptUrl'));
  fileNameInput: ElementFinder = element(by.css('input#claim-fileName'));
  fileTypeInput: ElementFinder = element(by.css('input#claim-fileType'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setReceiptIdInput(receiptId) {
    await this.receiptIdInput.sendKeys(receiptId);
  }

  async getReceiptIdInput() {
    return this.receiptIdInput.getAttribute('value');
  }

  async setTransactionIdInput(transactionId) {
    await this.transactionIdInput.sendKeys(transactionId);
  }

  async getTransactionIdInput() {
    return this.transactionIdInput.getAttribute('value');
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
