/* tslint:disable no-unused-expression */
import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import EventActivityComponentsPage from './event-activity.page-object';
import { EventActivityDeleteDialog } from './event-activity.page-object';
import EventActivityUpdatePage from './event-activity-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('EventActivity e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let eventActivityUpdatePage: EventActivityUpdatePage;
  let eventActivityComponentsPage: EventActivityComponentsPage;
  let eventActivityDeleteDialog: EventActivityDeleteDialog;

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

  it('should load EventActivities', async () => {
    await navBarPage.getEntityPage('event-activity');
    eventActivityComponentsPage = new EventActivityComponentsPage();
    expect(await eventActivityComponentsPage.getTitle().getText()).to.match(/Event Activities/);
  });

  it('should load create EventActivity page', async () => {
    await eventActivityComponentsPage.clickOnCreateButton();
    eventActivityUpdatePage = new EventActivityUpdatePage();
    expect(await eventActivityUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /clubmanagementApp.eventActivity.home.createOrEditLabel/
    );
    await eventActivityUpdatePage.cancel();
  });

  it('should create and save EventActivities', async () => {
    async function createEventActivity() {
      await eventActivityComponentsPage.clickOnCreateButton();
      await eventActivityUpdatePage.setEventIdInput('5');
      expect(await eventActivityUpdatePage.getEventIdInput()).to.eq('5');
      await eventActivityUpdatePage.setStartDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
      expect(await eventActivityUpdatePage.getStartDateInput()).to.contain('2001-01-01T02:30');
      await eventActivityUpdatePage.setDurationInDayInput('5');
      expect(await eventActivityUpdatePage.getDurationInDayInput()).to.eq('5');
      await eventActivityUpdatePage.setNameInput('name');
      expect(await eventActivityUpdatePage.getNameInput()).to.match(/name/);
      await eventActivityUpdatePage.setDescriptionInput('description');
      expect(await eventActivityUpdatePage.getDescriptionInput()).to.match(/description/);
      await waitUntilDisplayed(eventActivityUpdatePage.getSaveButton());
      await eventActivityUpdatePage.save();
      await waitUntilHidden(eventActivityUpdatePage.getSaveButton());
      expect(await eventActivityUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createEventActivity();
    await eventActivityComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await eventActivityComponentsPage.countDeleteButtons();
    await createEventActivity();

    await eventActivityComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await eventActivityComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last EventActivity', async () => {
    await eventActivityComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await eventActivityComponentsPage.countDeleteButtons();
    await eventActivityComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    eventActivityDeleteDialog = new EventActivityDeleteDialog();
    expect(await eventActivityDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/clubmanagementApp.eventActivity.delete.question/);
    await eventActivityDeleteDialog.clickOnConfirmButton();

    await eventActivityComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await eventActivityComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
