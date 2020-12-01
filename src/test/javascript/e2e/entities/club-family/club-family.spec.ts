/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ClubFamilyComponentsPage from './club-family.page-object';
import { ClubFamilyDeleteDialog } from './club-family.page-object';
import ClubFamilyUpdatePage from './club-family-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('ClubFamily e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let clubFamilyUpdatePage: ClubFamilyUpdatePage;
  let clubFamilyComponentsPage: ClubFamilyComponentsPage;
  let clubFamilyDeleteDialog: ClubFamilyDeleteDialog;

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

  it('should load ClubFamilies', async () => {
    await navBarPage.getEntityPage('club-family');
    clubFamilyComponentsPage = new ClubFamilyComponentsPage();
    expect(await clubFamilyComponentsPage.getTitle().getText()).to.match(/Club Families/);
  });

  it('should load create ClubFamily page', async () => {
    await clubFamilyComponentsPage.clickOnCreateButton();
    clubFamilyUpdatePage = new ClubFamilyUpdatePage();
    expect(await clubFamilyUpdatePage.getPageTitle().getAttribute('id')).to.match(/clubmanagementApp.clubFamily.home.createOrEditLabel/);
    await clubFamilyUpdatePage.cancel();
  });

  it('should create and save ClubFamilies', async () => {
    async function createClubFamily() {
      await clubFamilyComponentsPage.clickOnCreateButton();
      await clubFamilyUpdatePage.setNameInput('name');
      expect(await clubFamilyUpdatePage.getNameInput()).to.match(/name/);
      await clubFamilyUpdatePage.setSloganInput('slogan');
      expect(await clubFamilyUpdatePage.getSloganInput()).to.match(/slogan/);
      await waitUntilDisplayed(clubFamilyUpdatePage.getSaveButton());
      await clubFamilyUpdatePage.save();
      await waitUntilHidden(clubFamilyUpdatePage.getSaveButton());
      expect(await clubFamilyUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createClubFamily();
    await clubFamilyComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await clubFamilyComponentsPage.countDeleteButtons();
    await createClubFamily();

    await clubFamilyComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await clubFamilyComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last ClubFamily', async () => {
    await clubFamilyComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await clubFamilyComponentsPage.countDeleteButtons();
    await clubFamilyComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    clubFamilyDeleteDialog = new ClubFamilyDeleteDialog();
    expect(await clubFamilyDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/clubmanagementApp.clubFamily.delete.question/);
    await clubFamilyDeleteDialog.clickOnConfirmButton();

    await clubFamilyComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await clubFamilyComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
