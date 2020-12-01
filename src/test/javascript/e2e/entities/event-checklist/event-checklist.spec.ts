/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import EventChecklistComponentsPage from './event-checklist.page-object';
import { EventChecklistDeleteDialog } from './event-checklist.page-object';
import EventChecklistUpdatePage from './event-checklist-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('EventChecklist e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let eventChecklistUpdatePage: EventChecklistUpdatePage;
  let eventChecklistComponentsPage: EventChecklistComponentsPage;
  let eventChecklistDeleteDialog: EventChecklistDeleteDialog;

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

  it('should load EventChecklists', async () => {
    await navBarPage.getEntityPage('event-checklist');
    eventChecklistComponentsPage = new EventChecklistComponentsPage();
    expect(await eventChecklistComponentsPage.getTitle().getText()).to.match(/Event Checklists/);
  });

  it('should load create EventChecklist page', async () => {
    await eventChecklistComponentsPage.clickOnCreateButton();
    eventChecklistUpdatePage = new EventChecklistUpdatePage();
    expect(await eventChecklistUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /clubmanagementApp.eventChecklist.home.createOrEditLabel/
    );
    await eventChecklistUpdatePage.cancel();
  });

  it('should create and save EventChecklists', async () => {
    async function createEventChecklist() {
      await eventChecklistComponentsPage.clickOnCreateButton();
      await eventChecklistUpdatePage.setEventIdInput('5');
      expect(await eventChecklistUpdatePage.getEventIdInput()).to.eq('5');
      await eventChecklistUpdatePage.setNameInput('name');
      expect(await eventChecklistUpdatePage.getNameInput()).to.match(/name/);
      await eventChecklistUpdatePage.setDescriptionInput('description');
      expect(await eventChecklistUpdatePage.getDescriptionInput()).to.match(/description/);
      await eventChecklistUpdatePage.statusSelectLastOption();
      await eventChecklistUpdatePage.typeSelectLastOption();
      await waitUntilDisplayed(eventChecklistUpdatePage.getSaveButton());
      await eventChecklistUpdatePage.save();
      await waitUntilHidden(eventChecklistUpdatePage.getSaveButton());
      expect(await eventChecklistUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createEventChecklist();
    await eventChecklistComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await eventChecklistComponentsPage.countDeleteButtons();
    await createEventChecklist();

    await eventChecklistComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await eventChecklistComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last EventChecklist', async () => {
    await eventChecklistComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await eventChecklistComponentsPage.countDeleteButtons();
    await eventChecklistComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    eventChecklistDeleteDialog = new EventChecklistDeleteDialog();
    expect(await eventChecklistDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /clubmanagementApp.eventChecklist.delete.question/
    );
    await eventChecklistDeleteDialog.clickOnConfirmButton();

    await eventChecklistComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await eventChecklistComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
