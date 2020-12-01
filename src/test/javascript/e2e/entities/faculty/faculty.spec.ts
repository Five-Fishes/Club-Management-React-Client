/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import FacultyComponentsPage from './faculty.page-object';
import { FacultyDeleteDialog } from './faculty.page-object';
import FacultyUpdatePage from './faculty-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Faculty e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let facultyUpdatePage: FacultyUpdatePage;
  let facultyComponentsPage: FacultyComponentsPage;
  let facultyDeleteDialog: FacultyDeleteDialog;

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

  it('should load Faculties', async () => {
    await navBarPage.getEntityPage('faculty');
    facultyComponentsPage = new FacultyComponentsPage();
    expect(await facultyComponentsPage.getTitle().getText()).to.match(/Faculties/);
  });

  it('should load create Faculty page', async () => {
    await facultyComponentsPage.clickOnCreateButton();
    facultyUpdatePage = new FacultyUpdatePage();
    expect(await facultyUpdatePage.getPageTitle().getAttribute('id')).to.match(/clubmanagementApp.faculty.home.createOrEditLabel/);
    await facultyUpdatePage.cancel();
  });

  it('should create and save Faculties', async () => {
    async function createFaculty() {
      await facultyComponentsPage.clickOnCreateButton();
      await facultyUpdatePage.setNameInput('name');
      expect(await facultyUpdatePage.getNameInput()).to.match(/name/);
      await facultyUpdatePage.setShortNameInput('shortName');
      expect(await facultyUpdatePage.getShortNameInput()).to.match(/shortName/);
      await waitUntilDisplayed(facultyUpdatePage.getSaveButton());
      await facultyUpdatePage.save();
      await waitUntilHidden(facultyUpdatePage.getSaveButton());
      expect(await facultyUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createFaculty();
    await facultyComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await facultyComponentsPage.countDeleteButtons();
    await createFaculty();

    await facultyComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await facultyComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Faculty', async () => {
    await facultyComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await facultyComponentsPage.countDeleteButtons();
    await facultyComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    facultyDeleteDialog = new FacultyDeleteDialog();
    expect(await facultyDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/clubmanagementApp.faculty.delete.question/);
    await facultyDeleteDialog.clickOnConfirmButton();

    await facultyComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await facultyComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
