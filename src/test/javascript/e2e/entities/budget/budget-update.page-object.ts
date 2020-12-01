import { element, by, ElementFinder } from 'protractor';

export default class BudgetUpdatePage {
  pageTitle: ElementFinder = element(by.id('clubmanagementApp.budget.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  eventIdInput: ElementFinder = element(by.css('input#budget-eventId'));
  amountInput: ElementFinder = element(by.css('input#budget-amount'));
  typeSelect: ElementFinder = element(by.css('select#budget-type'));
  nameInput: ElementFinder = element(by.css('input#budget-name'));
  detailsInput: ElementFinder = element(by.css('textarea#budget-details'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setEventIdInput(eventId) {
    await this.eventIdInput.sendKeys(eventId);
  }

  async getEventIdInput() {
    return this.eventIdInput.getAttribute('value');
  }

  async setAmountInput(amount) {
    await this.amountInput.sendKeys(amount);
  }

  async getAmountInput() {
    return this.amountInput.getAttribute('value');
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
  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  async setDetailsInput(details) {
    await this.detailsInput.sendKeys(details);
  }

  async getDetailsInput() {
    return this.detailsInput.getAttribute('value');
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
