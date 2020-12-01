/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import DebtComponentsPage from './debt.page-object';
import { DebtDeleteDialog } from './debt.page-object';
import DebtUpdatePage from './debt-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Debt e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let debtUpdatePage: DebtUpdatePage;
  let debtComponentsPage: DebtComponentsPage;
  let debtDeleteDialog: DebtDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
  });

  it('should load Debts', async () => {
    await navBarPage.getEntityPage('debt');
    debtComponentsPage = new DebtComponentsPage();
    expect(await debtComponentsPage.getTitle().getText()).to.match(/Debts/);
  });

  it('should load create Debt page', async () => {
    await debtComponentsPage.clickOnCreateButton();
    debtUpdatePage = new DebtUpdatePage();
    expect(await debtUpdatePage.getPageTitle().getAttribute('id')).to.match(/clubmanagementApp.debt.home.createOrEditLabel/);
    await debtUpdatePage.cancel();
  });

  it('should create and save Debts', async () => {
    async function createDebt() {
      await debtComponentsPage.clickOnCreateButton();
      await debtUpdatePage.setReceiptIdInput('5');
      expect(await debtUpdatePage.getReceiptIdInput()).to.eq('5');
      await debtUpdatePage.setEventAttendeeIdInput('5');
      expect(await debtUpdatePage.getEventAttendeeIdInput()).to.eq('5');
      await debtUpdatePage.setAmountInput('5');
      expect(await debtUpdatePage.getAmountInput()).to.eq('5');
      await debtUpdatePage.statusSelectLastOption();
      await debtUpdatePage.setReceiptUrlInput('receiptUrl');
      expect(await debtUpdatePage.getReceiptUrlInput()).to.match(/receiptUrl/);
      await debtUpdatePage.setFileNameInput('fileName');
      expect(await debtUpdatePage.getFileNameInput()).to.match(/fileName/);
      await debtUpdatePage.setFileTypeInput('fileType');
      expect(await debtUpdatePage.getFileTypeInput()).to.match(/fileType/);
      await waitUntilDisplayed(debtUpdatePage.getSaveButton());
      await debtUpdatePage.save();
      await waitUntilHidden(debtUpdatePage.getSaveButton());
      expect(await debtUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createDebt();
    await debtComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await debtComponentsPage.countDeleteButtons();
    await createDebt();

    await debtComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await debtComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Debt', async () => {
    await debtComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await debtComponentsPage.countDeleteButtons();
    await debtComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    debtDeleteDialog = new DebtDeleteDialog();
    expect(await debtDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/clubmanagementApp.debt.delete.question/);
    await debtDeleteDialog.clickOnConfirmButton();

    await debtComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await debtComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
