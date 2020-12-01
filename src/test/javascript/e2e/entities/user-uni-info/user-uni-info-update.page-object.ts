import { element, by, ElementFinder } from 'protractor';

export default class UserUniInfoUpdatePage {
  pageTitle: ElementFinder = element(by.id('clubmanagementApp.userUniInfo.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  userIdInput: ElementFinder = element(by.css('input#user-uni-info-userId'));
  facultyInput: ElementFinder = element(by.css('input#user-uni-info-faculty'));
  programInput: ElementFinder = element(by.css('input#user-uni-info-program'));
  yearSessionInput: ElementFinder = element(by.css('input#user-uni-info-yearSession'));
  intakeSemesterInput: ElementFinder = element(by.css('input#user-uni-info-intakeSemester'));
  yearOfStudyInput: ElementFinder = element(by.css('input#user-uni-info-yearOfStudy'));
  stayInInput: ElementFinder = element(by.css('input#user-uni-info-stayIn'));
  statusSelect: ElementFinder = element(by.css('select#user-uni-info-status'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setUserIdInput(userId) {
    await this.userIdInput.sendKeys(userId);
  }

  async getUserIdInput() {
    return this.userIdInput.getAttribute('value');
  }

  async setFacultyInput(faculty) {
    await this.facultyInput.sendKeys(faculty);
  }

  async getFacultyInput() {
    return this.facultyInput.getAttribute('value');
  }

  async setProgramInput(program) {
    await this.programInput.sendKeys(program);
  }

  async getProgramInput() {
    return this.programInput.getAttribute('value');
  }

  async setYearSessionInput(yearSession) {
    await this.yearSessionInput.sendKeys(yearSession);
  }

  async getYearSessionInput() {
    return this.yearSessionInput.getAttribute('value');
  }

  async setIntakeSemesterInput(intakeSemester) {
    await this.intakeSemesterInput.sendKeys(intakeSemester);
  }

  async getIntakeSemesterInput() {
    return this.intakeSemesterInput.getAttribute('value');
  }

  async setYearOfStudyInput(yearOfStudy) {
    await this.yearOfStudyInput.sendKeys(yearOfStudy);
  }

  async getYearOfStudyInput() {
    return this.yearOfStudyInput.getAttribute('value');
  }

  async setStayInInput(stayIn) {
    await this.stayInInput.sendKeys(stayIn);
  }

  async getStayInInput() {
    return this.stayInInput.getAttribute('value');
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
