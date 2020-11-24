/* tslint:disable no-unused-expression */
import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import TransactionComponentsPage from './transaction.page-object';
import { TransactionDeleteDialog } from './transaction.page-object';
import TransactionUpdatePage from './transaction-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Transaction e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let transactionUpdatePage: TransactionUpdatePage;
  let transactionComponentsPage: TransactionComponentsPage;
  let transactionDeleteDialog: TransactionDeleteDialog;

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

  it('should load Transactions', async () => {
    await navBarPage.getEntityPage('transaction');
    transactionComponentsPage = new TransactionComponentsPage();
    expect(await transactionComponentsPage.getTitle().getText()).to.match(/Transactions/);
  });

  it('should load create Transaction page', async () => {
    await transactionComponentsPage.clickOnCreateButton();
    transactionUpdatePage = new TransactionUpdatePage();
    expect(await transactionUpdatePage.getPageTitle().getAttribute('id')).to.match(/clubmanagementApp.transaction.home.createOrEditLabel/);
    await transactionUpdatePage.cancel();
  });

  it('should create and save Transactions', async () => {
    async function createTransaction() {
      await transactionComponentsPage.clickOnCreateButton();
      await transactionUpdatePage.setEventIdInput('5');
      expect(await transactionUpdatePage.getEventIdInput()).to.eq('5');
      await transactionUpdatePage.setReceiptIdInput('5');
      expect(await transactionUpdatePage.getReceiptIdInput()).to.eq('5');
      await transactionUpdatePage.typeSelectLastOption();
      await transactionUpdatePage.setAmountInput('5');
      expect(await transactionUpdatePage.getAmountInput()).to.eq('5');
      await transactionUpdatePage.setDetailsInput('details');
      expect(await transactionUpdatePage.getDetailsInput()).to.match(/details/);
      await transactionUpdatePage.setReceiptUrlInput('receiptUrl');
      expect(await transactionUpdatePage.getReceiptUrlInput()).to.match(/receiptUrl/);
      await transactionUpdatePage.setFileNameInput('fileName');
      expect(await transactionUpdatePage.getFileNameInput()).to.match(/fileName/);
      await transactionUpdatePage.setFileTypeInput('fileType');
      expect(await transactionUpdatePage.getFileTypeInput()).to.match(/fileType/);
      await transactionUpdatePage.setCreatedByInput('createdBy');
      expect(await transactionUpdatePage.getCreatedByInput()).to.match(/createdBy/);
      await transactionUpdatePage.setCreatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
      expect(await transactionUpdatePage.getCreatedDateInput()).to.contain('2001-01-01T02:30');
      await waitUntilDisplayed(transactionUpdatePage.getSaveButton());
      await transactionUpdatePage.save();
      await waitUntilHidden(transactionUpdatePage.getSaveButton());
      expect(await transactionUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createTransaction();
    await transactionComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await transactionComponentsPage.countDeleteButtons();
    await createTransaction();

    await transactionComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await transactionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Transaction', async () => {
    await transactionComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await transactionComponentsPage.countDeleteButtons();
    await transactionComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    transactionDeleteDialog = new TransactionDeleteDialog();
    expect(await transactionDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/clubmanagementApp.transaction.delete.question/);
    await transactionDeleteDialog.clickOnConfirmButton();

    await transactionComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await transactionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
