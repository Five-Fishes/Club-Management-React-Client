/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ClaimComponentsPage from './claim.page-object';
import { ClaimDeleteDialog } from './claim.page-object';
import ClaimUpdatePage from './claim-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Claim e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let claimUpdatePage: ClaimUpdatePage;
  let claimComponentsPage: ClaimComponentsPage;
  let claimDeleteDialog: ClaimDeleteDialog;

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

  it('should load Claims', async () => {
    await navBarPage.getEntityPage('claim');
    claimComponentsPage = new ClaimComponentsPage();
    expect(await claimComponentsPage.getTitle().getText()).to.match(/Claims/);
  });

  it('should load create Claim page', async () => {
    await claimComponentsPage.clickOnCreateButton();
    claimUpdatePage = new ClaimUpdatePage();
    expect(await claimUpdatePage.getPageTitle().getAttribute('id')).to.match(/clubmanagementApp.claim.home.createOrEditLabel/);
    await claimUpdatePage.cancel();
  });

  it('should create and save Claims', async () => {
    async function createClaim() {
      await claimComponentsPage.clickOnCreateButton();
      await claimUpdatePage.setReceiptIdInput('5');
      expect(await claimUpdatePage.getReceiptIdInput()).to.eq('5');
      await claimUpdatePage.setTransactionIdInput('5');
      expect(await claimUpdatePage.getTransactionIdInput()).to.eq('5');
      await claimUpdatePage.setAmountInput('5');
      expect(await claimUpdatePage.getAmountInput()).to.eq('5');
      await claimUpdatePage.statusSelectLastOption();
      await claimUpdatePage.setReceiptUrlInput('receiptUrl');
      expect(await claimUpdatePage.getReceiptUrlInput()).to.match(/receiptUrl/);
      await claimUpdatePage.setFileNameInput('fileName');
      expect(await claimUpdatePage.getFileNameInput()).to.match(/fileName/);
      await claimUpdatePage.setFileTypeInput('fileType');
      expect(await claimUpdatePage.getFileTypeInput()).to.match(/fileType/);
      await waitUntilDisplayed(claimUpdatePage.getSaveButton());
      await claimUpdatePage.save();
      await waitUntilHidden(claimUpdatePage.getSaveButton());
      expect(await claimUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createClaim();
    await claimComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await claimComponentsPage.countDeleteButtons();
    await createClaim();

    await claimComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await claimComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Claim', async () => {
    await claimComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await claimComponentsPage.countDeleteButtons();
    await claimComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    claimDeleteDialog = new ClaimDeleteDialog();
    expect(await claimDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/clubmanagementApp.claim.delete.question/);
    await claimDeleteDialog.clickOnConfirmButton();

    await claimComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await claimComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
