/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import AdministratorComponentsPage from './administrator.page-object';
import { AdministratorDeleteDialog } from './administrator.page-object';
import AdministratorUpdatePage from './administrator-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Administrator e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let administratorUpdatePage: AdministratorUpdatePage;
  let administratorComponentsPage: AdministratorComponentsPage;
  let administratorDeleteDialog: AdministratorDeleteDialog;

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

  it('should load Administrators', async () => {
    await navBarPage.getEntityPage('administrator');
    administratorComponentsPage = new AdministratorComponentsPage();
    expect(await administratorComponentsPage.getTitle().getText()).to.match(/Administrators/);
  });

  it('should load create Administrator page', async () => {
    await administratorComponentsPage.clickOnCreateButton();
    administratorUpdatePage = new AdministratorUpdatePage();
    expect(await administratorUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /clubmanagementApp.administrator.home.createOrEditLabel/
    );
    await administratorUpdatePage.cancel();
  });

  it('should create and save Administrators', async () => {
    async function createAdministrator() {
      await administratorComponentsPage.clickOnCreateButton();
      await administratorUpdatePage.setUserIdInput('5');
      expect(await administratorUpdatePage.getUserIdInput()).to.eq('5');
      await administratorUpdatePage.setYearSessionInput('yearSession');
      expect(await administratorUpdatePage.getYearSessionInput()).to.match(/yearSession/);
      await administratorUpdatePage.roleSelectLastOption();
      await administratorUpdatePage.statusSelectLastOption();
      await waitUntilDisplayed(administratorUpdatePage.getSaveButton());
      await administratorUpdatePage.save();
      await waitUntilHidden(administratorUpdatePage.getSaveButton());
      expect(await administratorUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createAdministrator();
    await administratorComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await administratorComponentsPage.countDeleteButtons();
    await createAdministrator();

    await administratorComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await administratorComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Administrator', async () => {
    await administratorComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await administratorComponentsPage.countDeleteButtons();
    await administratorComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    administratorDeleteDialog = new AdministratorDeleteDialog();
    expect(await administratorDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/clubmanagementApp.administrator.delete.question/);
    await administratorDeleteDialog.clickOnConfirmButton();

    await administratorComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await administratorComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
