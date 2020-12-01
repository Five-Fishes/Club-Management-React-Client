/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import EventCrewComponentsPage from './event-crew.page-object';
import { EventCrewDeleteDialog } from './event-crew.page-object';
import EventCrewUpdatePage from './event-crew-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('EventCrew e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let eventCrewUpdatePage: EventCrewUpdatePage;
  let eventCrewComponentsPage: EventCrewComponentsPage;
  let eventCrewDeleteDialog: EventCrewDeleteDialog;

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

  it('should load EventCrews', async () => {
    await navBarPage.getEntityPage('event-crew');
    eventCrewComponentsPage = new EventCrewComponentsPage();
    expect(await eventCrewComponentsPage.getTitle().getText()).to.match(/Event Crews/);
  });

  it('should load create EventCrew page', async () => {
    await eventCrewComponentsPage.clickOnCreateButton();
    eventCrewUpdatePage = new EventCrewUpdatePage();
    expect(await eventCrewUpdatePage.getPageTitle().getAttribute('id')).to.match(/clubmanagementApp.eventCrew.home.createOrEditLabel/);
    await eventCrewUpdatePage.cancel();
  });

  it('should create and save EventCrews', async () => {
    async function createEventCrew() {
      await eventCrewComponentsPage.clickOnCreateButton();
      await eventCrewUpdatePage.setUserIdInput('5');
      expect(await eventCrewUpdatePage.getUserIdInput()).to.eq('5');
      await eventCrewUpdatePage.setEventIdInput('5');
      expect(await eventCrewUpdatePage.getEventIdInput()).to.eq('5');
      await eventCrewUpdatePage.roleSelectLastOption();
      await waitUntilDisplayed(eventCrewUpdatePage.getSaveButton());
      await eventCrewUpdatePage.save();
      await waitUntilHidden(eventCrewUpdatePage.getSaveButton());
      expect(await eventCrewUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createEventCrew();
    await eventCrewComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await eventCrewComponentsPage.countDeleteButtons();
    await createEventCrew();

    await eventCrewComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await eventCrewComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last EventCrew', async () => {
    await eventCrewComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await eventCrewComponentsPage.countDeleteButtons();
    await eventCrewComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    eventCrewDeleteDialog = new EventCrewDeleteDialog();
    expect(await eventCrewDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/clubmanagementApp.eventCrew.delete.question/);
    await eventCrewDeleteDialog.clickOnConfirmButton();

    await eventCrewComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await eventCrewComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
