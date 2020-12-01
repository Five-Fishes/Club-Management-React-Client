/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import UserUniInfoComponentsPage from './user-uni-info.page-object';
import { UserUniInfoDeleteDialog } from './user-uni-info.page-object';
import UserUniInfoUpdatePage from './user-uni-info-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('UserUniInfo e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let userUniInfoUpdatePage: UserUniInfoUpdatePage;
  let userUniInfoComponentsPage: UserUniInfoComponentsPage;
  let userUniInfoDeleteDialog: UserUniInfoDeleteDialog;

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

  it('should load UserUniInfos', async () => {
    await navBarPage.getEntityPage('user-uni-info');
    userUniInfoComponentsPage = new UserUniInfoComponentsPage();
    expect(await userUniInfoComponentsPage.getTitle().getText()).to.match(/User Uni Infos/);
  });

  it('should load create UserUniInfo page', async () => {
    await userUniInfoComponentsPage.clickOnCreateButton();
    userUniInfoUpdatePage = new UserUniInfoUpdatePage();
    expect(await userUniInfoUpdatePage.getPageTitle().getAttribute('id')).to.match(/clubmanagementApp.userUniInfo.home.createOrEditLabel/);
    await userUniInfoUpdatePage.cancel();
  });

  it('should create and save UserUniInfos', async () => {
    async function createUserUniInfo() {
      await userUniInfoComponentsPage.clickOnCreateButton();
      await userUniInfoUpdatePage.setUserIdInput('5');
      expect(await userUniInfoUpdatePage.getUserIdInput()).to.eq('5');
      await userUniInfoUpdatePage.setFacultyInput('faculty');
      expect(await userUniInfoUpdatePage.getFacultyInput()).to.match(/faculty/);
      await userUniInfoUpdatePage.setProgramInput('program');
      expect(await userUniInfoUpdatePage.getProgramInput()).to.match(/program/);
      await userUniInfoUpdatePage.setYearSessionInput('yearSession');
      expect(await userUniInfoUpdatePage.getYearSessionInput()).to.match(/yearSession/);
      await userUniInfoUpdatePage.setIntakeSemesterInput('5');
      expect(await userUniInfoUpdatePage.getIntakeSemesterInput()).to.eq('5');
      await userUniInfoUpdatePage.setYearOfStudyInput('5');
      expect(await userUniInfoUpdatePage.getYearOfStudyInput()).to.eq('5');
      await userUniInfoUpdatePage.setStayInInput('stayIn');
      expect(await userUniInfoUpdatePage.getStayInInput()).to.match(/stayIn/);
      await userUniInfoUpdatePage.statusSelectLastOption();
      await waitUntilDisplayed(userUniInfoUpdatePage.getSaveButton());
      await userUniInfoUpdatePage.save();
      await waitUntilHidden(userUniInfoUpdatePage.getSaveButton());
      expect(await userUniInfoUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createUserUniInfo();
    await userUniInfoComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await userUniInfoComponentsPage.countDeleteButtons();
    await createUserUniInfo();

    await userUniInfoComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await userUniInfoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last UserUniInfo', async () => {
    await userUniInfoComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await userUniInfoComponentsPage.countDeleteButtons();
    await userUniInfoComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    userUniInfoDeleteDialog = new UserUniInfoDeleteDialog();
    expect(await userUniInfoDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/clubmanagementApp.userUniInfo.delete.question/);
    await userUniInfoDeleteDialog.clickOnConfirmButton();

    await userUniInfoComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await userUniInfoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
