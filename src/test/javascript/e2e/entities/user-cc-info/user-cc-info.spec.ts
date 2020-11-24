/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import UserCCInfoComponentsPage from './user-cc-info.page-object';
import { UserCCInfoDeleteDialog } from './user-cc-info.page-object';
import UserCCInfoUpdatePage from './user-cc-info-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('UserCCInfo e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let userCCInfoUpdatePage: UserCCInfoUpdatePage;
  let userCCInfoComponentsPage: UserCCInfoComponentsPage;
  let userCCInfoDeleteDialog: UserCCInfoDeleteDialog;

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

  it('should load UserCCInfos', async () => {
    await navBarPage.getEntityPage('user-cc-info');
    userCCInfoComponentsPage = new UserCCInfoComponentsPage();
    expect(await userCCInfoComponentsPage.getTitle().getText()).to.match(/User CC Infos/);
  });

  it('should load create UserCCInfo page', async () => {
    await userCCInfoComponentsPage.clickOnCreateButton();
    userCCInfoUpdatePage = new UserCCInfoUpdatePage();
    expect(await userCCInfoUpdatePage.getPageTitle().getAttribute('id')).to.match(/clubmanagementApp.userCCInfo.home.createOrEditLabel/);
    await userCCInfoUpdatePage.cancel();
  });

  it('should create and save UserCCInfos', async () => {
    async function createUserCCInfo() {
      await userCCInfoComponentsPage.clickOnCreateButton();
      await userCCInfoUpdatePage.setUserIdInput('5');
      expect(await userCCInfoUpdatePage.getUserIdInput()).to.eq('5');
      await userCCInfoUpdatePage.setClubFamilyIdInput('5');
      expect(await userCCInfoUpdatePage.getClubFamilyIdInput()).to.eq('5');
      await userCCInfoUpdatePage.familyRoleSelectLastOption();
      await userCCInfoUpdatePage.setYearSessionInput('yearSession');
      expect(await userCCInfoUpdatePage.getYearSessionInput()).to.match(/yearSession/);
      await userCCInfoUpdatePage.setClubFamilyNameInput('clubFamilyName');
      expect(await userCCInfoUpdatePage.getClubFamilyNameInput()).to.match(/clubFamilyName/);
      await waitUntilDisplayed(userCCInfoUpdatePage.getSaveButton());
      await userCCInfoUpdatePage.save();
      await waitUntilHidden(userCCInfoUpdatePage.getSaveButton());
      expect(await userCCInfoUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createUserCCInfo();
    await userCCInfoComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await userCCInfoComponentsPage.countDeleteButtons();
    await createUserCCInfo();

    await userCCInfoComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await userCCInfoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last UserCCInfo', async () => {
    await userCCInfoComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await userCCInfoComponentsPage.countDeleteButtons();
    await userCCInfoComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    userCCInfoDeleteDialog = new UserCCInfoDeleteDialog();
    expect(await userCCInfoDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/clubmanagementApp.userCCInfo.delete.question/);
    await userCCInfoDeleteDialog.clickOnConfirmButton();

    await userCCInfoComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await userCCInfoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
